---
title: "Vue 数据响应式原理"
date: 2022-03-06T14:39:28+08:00
draft: false
---

*断断续续已经用了很长时间的`vue`了，从之前的`vue2`到现在的`vue3`。说起它的数据响应式原理，一直都是比较模糊的，只是大概知道是通过`Object.defineProperty()`和代理来实现的，具体也没有去深入的了解。*

*最近看了一些文章和视频，所以在这里进行一些总结。*

## 先了解一下 ES6 的 getter/setter

一个简单的例子了解`getter/setter`的基本用法：

```javascript
const obj = {
  lastName: "高",
  firstName: "圆圆",
  get name() {
    return this.lastName + this.firstName
  },
  set name(value){
    this.lastName = value[0]
    this.firstName = value.substring(1)
  },
}

console.log(obj.name)  // 高圆圆

obj.name = '刘诗诗'
console.log(`姓：${obj.lastName}`)  // 姓：刘
console.log(`名：${obj.firstName}`)  // 名：诗诗
```

## 需求一

上面的例子在声明`obj`的时候就已经定义了`name`的`getter/setter`，那如何在一个已有的对象上添加一个新的`getter/setter`？

## 再了解一下 ES6 的 Object.defineProperty

用`ES6`的新语法`Object.defineProperty`可以实现上述需求。

例如给`obj`对象添加一个`age`的`getter/setter`：

```javascript
let _age = 0

Object.defineProperty(obj, 'age', {
  get() {
    return _age
  },
  set(value) {
    _age = value
  }
})
```

这里需要一个`_age`变量作为临时存储，为了方便可以把这个临时的`_age`放到`obj`里：

```javascript
obj._age = 0

Object.defineProperty(obj, 'age', {
  get() {
    return this._age
  },
  set(value) {
    this._age = value
  }
})

console.log(obj.age)  // 0
obj.age = 18
console.log(obj.age)  // 18
```

*有点脱裤子放屁的味道？*

## 需求二

要求给`age`赋值的时候，不能小于`0`。

基于上面的代码，简单修改一下就可以很容易的实现：

```javascript
obj._age = 0

Object.defineProperty(obj, 'age', {
  get() {
    return this._age
  },
  set(value) {
    if (value < 0) return  // 如果小于 0 就什么都不做
    this._age = value
  }
})

obj.age = -1
console.log(age)  // 0

obj.age = 18
console.log(age)  // 18
```

## 需求三

上面的代码，是可以直接`obj._age = -1`的，相当于可以绕过`getter/setter`，有什么办法可以让别人无法直接修改`obj._age`？

## 数据代理

可以使用一个数据代理函数来实现：

```javascript
function proxy({ data }) {
  const _obj = {}

  // 便于理解写死了'age'，实际上应该遍历 data 的所有 key
  Object.defineProperty(_obj, 'age', {
    get() {
      return data.age
    },
    set(value) {
      if (value < 0) return
      data.age = value
    }
  })
  return _obj
}

const obj = proxy({ data: {age: 0} })

console.log(obj.age)  // 0
obj.age = 18
console.log(obj.age)  // 18
```

这里的`_obj`就是代理对象，后续对`obj.age`的读写都会通过这个代理对象进行操作。这样，也就无法绕过`getter/setter`从外部直接修改`age`了。

## 需求四

实际上，上面的代码还是*有空可钻的*：

```javascript
const data = {age: 0}  // 先将数据赋值给一个变量
const obj = proxy({ data })
```

那这样不还是可以直接`data.age = -1`吗？

```javascript
data.age = -1
console.log(obj.age)  // -1
```

## 数据监听/劫持

那就在`proxy`函数的基础上，再添加一层数据监听来完全掌控数据源：

```javascript
function proxy({ data }) {
  // 便于理解写死了'age'，实际上应该遍历 data 的所有 key
  let _age = data.age  // 先记录 age 的值
  delete data.age  // 然后删掉源数据上的 age 属性
  // 其实也可以不删掉 age
  // 因为 Object.defineProperty 会覆盖掉之前的 age
  Object.defineProperty(data, 'age', {
    get() {
      return _age
    },
    set(value) {
      if (value < 0) return
      _age = value
    }
  })

  // 以上是数据监听/劫持，下面没变

  const _obj = {}
  // 便于理解写死了'age'，实际上应该遍历 data 的所有 key
  Object.defineProperty(_obj, 'age', {
    get() {
      return data.age
    },
    set(value) {
      if (value < 0) return
      data.age = value
    }
  })
  return _obj
}
```

这样，不论是直接修改源数据，还是通过代理修改数据，都不可能绕过`getter/setter`的限制了：

```javascript
const data = {age: 0}
const obj = proxy({ data })

data.age = -1
console.log(obj.age)  // 0

data.age = 18
console.log(obj.age)  // 18

obj.age = 20
console.log(obj.age)  // 20
console.log(data.age)  // 20
```

## Vue2 的数据响应式

上面的代码是不是有点熟悉了？

```javascript
// 自己封装的数据代理和监听函数
const obj = proxy({
  data: {
    age: 0
  }
})

// vue 的 data 选项
const vm = new Vue({
  data: {
    age: 0
  }
})
```

实际上这就是`vue`的数据响应式原理，`vue`内部也对传入的`data`进行了这么一层代理和监听。这意味着后续对`data`的所有操作，`vue`都可以知道并做出响应（调用`render(data)`刷新视图），即数据响应式。