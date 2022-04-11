---
title: "Vue2 data 选项存在的问题"
date: 2022-03-30T10:29:15+08:00
draft: false
---

## 来自 Vue 的警告

```javascript
new Vue({
  data: {},
  template: `
    <div>{{n}}</div>
  `
}).$mount("#app");
```

上面的例子中，在`template`选项里使用了`n`，但在`data`选项中并没有初始化`n`，这时`vue`会在控制台发出警告：

> `[Vue warn]: Property or method "n" is not defined on the instance but referenced during render. Make sure that this property is reactive, either in the data option, or for class-based components, by initializing the property.`

这是因为`vue2`是使用的`Object.defineProperty`来实现数据响应式：

```javascript
Object.defineProperty(data, 'xxx', {
  ...
})
```

`vue`会遍历`data`选项内所有的属性并进行代理，前提是要有明确的`key`，即需要事先声明好`key`才能进行遍历。在模板中使用了没有事先声明的属性，`vue`无法对其进行代理并做出响应。

所以改为以下写法可以消除警告：

```javascript
new Vue({
  data: {
    n: null
  },
  template: `
    <div>{{n}}</div>
  `
}).$mount("#app");
```

## Vue2 只会检查 data 内的第一层属性

但是实际开发过程中，遇到更多的是以下这种情况：

```javascript
new Vue({
  data: {
    user: {
      name: 'xxx'  // user.name 会被 Vue 监听 & 代理
    }
  },
  template: `
    <div>
      {{user.name}}
      {{user.age}}
      <button @click="setAge">set age</button>
    </div>
  `,
  methods: {
    setAge() {
      this.user.age = 18
    }
  }
}).$mount("#app");
```

上面的实例在`template`中使用了未声明的属性`user.age`，但是此时`vue`并不会发出警告，因为`vue`只会去检查`data`中的第一层属性。

并且点击按钮调用`setAge`方法，页面中依然不会显示`user.age`，因为事先并没有在`user`中声明`age`，`vue`就不会代理`user.age`，所以即使改变了`user.age`的值`vue`也不知道，自然也不会触发`render`更新视图。

## Vue.set

解决上述问题有两种办法：

- 第一种就是提前声明好所有需要的或可能产生的`key`，但问题是很多时候我们并不能保证后续不再继续添加属性。
- 第二种就是使用`vue`提供的`Vue.set`/`this.$set`方法。

```javascript
new Vue({
  ...
  methods: {
    setAge() {
      this.$set(this.user, 'age', 18)
    }
  }
}).$mount("#app");
```

`Vue.set`至少会做三件事情：

1. 在目标对象里添加一个新的`key`和`value`；
2. 对新的`key`进行代理和监听使其同样具有响应性；
3. 触发一次`render`来更新视图。

后面再需要修改这个`key`的值，就不需要使用`Vue.set`了，正常修改即可触发响应。

## Vue.set 作用于数组的问题

因为数组其实也是一种对象，数组的索引`index`相当于`key`，数组的每一项相当于`value`。也就是说，数组也无法通过直接新增索引（新增`key`）来让`vue`做出响应。

同样的，数组也无法在一开始就确定长度且不会改变，更无法提前声明好所有的索引。所以按理来说，数组也可以使用`Vue.set`来定义新的元素。

但是当`Vue.set`作用于数组时会有一个坑，那就是`vue`**并不会对新增的元素进行代理和监听**，它只会做两件事情：

1. 在目标数组里添加一个新的元素（索引`index`和`value`）；
2. 触发一次`render`来更新视图。

```javascript
new Vue({
  data: {
    arr: ["a", "b", "c"]
  },
  template: `
    <div>
      {{arr}}
      <button @click="setD">set d</button>
      <button @click="changeD">change d</button>
    </div>
  `,
  methods: {
    setD() {
      this.$set(this.arr, '3', 'd')
    },
    changeD() {
      this.arr[3] = 'ddd'
    }
  }
}).$mount("#app");
```

先点击第一个按钮调用`setD`，可以正常显示出`[ "a", "b", "c", "d" ]`。

然后点击第二个按钮调用`changeD`，这次就会发现没有任何反应，**因为它根本就不具有响应性**。

## Vue 对数组方法的篡改

实际上，大多数情况下我们不会直接操作数组的索引，更好的办法是调用数组的方法来操作数组。

所以`vue`基于这一点，对数组的七个常用方法进行了篡改（[变更方法](https://cn.vuejs.org/v2/guide/list.html#%E5%8F%98%E6%9B%B4%E6%96%B9%E6%B3%95)）：

- push()
- pop()
- shift()
- unshift()
- splice()
- sort()
- reverse()

在`vue`中调用数组的以上方法时，同样也会触发视图更新，**并对新增的的元素进行代理和监听**。`vue`大概做了三件事情：

1. 调用`JS`对应的原生方法操作数组；
2. 对新的元素进行代理和监听使其同样具有响应性；
3. 触发一次`render`来更新视图。