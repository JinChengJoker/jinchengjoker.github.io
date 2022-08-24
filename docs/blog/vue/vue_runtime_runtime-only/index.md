# Vue 运行时+编译器 vs. 仅运行时

在`vue npm`包的 [dist/](https://cdn.jsdelivr.net/npm/vue@3.0.2/dist/) 目录有很多不同的`Vue.js`构建版本。

- `vue.global.js` - 包含编译器和运行时的完整版（约 520KB）
- `vue.global.prod.js` - 包含编译器和运行时的压缩后完整版（约 105KB）
- `vue.runtime.global.js` - 只包含运行时（约 356KB）
- `vue.runtime.global.prod.js` - 只包含运行时的压缩版（约 68KB）

如果要在客户端上编译模板（即：将字符串传递给`template`选项，或者使用元素的`DOM`内`HTML`作为模板挂载到元素），则需要编译器，因此需要完整的构建版本：

```html
<!-- index.html -->

<div id="app">
  <h1>{{hi}}</h1>
</div>
```

```javascript
// main.js
// 以 vue3 写法为例

// 需要编译器
// 会直接替换 app 元素的内容
Vue.createApp({
  template: '<div>{{ hi }}</div>',
  data() {
    return {
      hi: "hi"
    };
  }
}).mount('#app')

// 需要编译器
// 相当于使用 app 元素的 DOM 内 HTML 作为模板
Vue.createApp({
  data() {
    return {
      hi: "hi"
    };
  }
}).mount('#app')
```

如果使用上面两种写法，且使用了`vue`的非完整版（即`runtime`版本），那么`vue`会提示错误需要使用完整版：

> `[Vue warn]: Component provided template option but runtime compilation is not supported in this build of Vue. Use "vue.global.js" instead.`

```javascript
// 不需要编译器
Vue.createApp({
  render() {
    return Vue.h('div', {}, this.hi)
  },
  data() {
    return {
      hi: "hi"
    };
  }
}).mount('#app')
```

如果使用上面这种写法，则不需要包含编译器即可运行。

所以实际上编译器`Compiler`的作用就是将`HTML`字符串内容编译成`vue`能够解析的虚拟`DOM`结构，即`Vue.h`方法：

```javascript
Vue.h('div', {}, this.hi)
```

包含编译器版本的体积比`runtime`版本大了约`40%`，所以一般我们在工程化的项目中使用的都是`runtime`版本，来减少项目体积。而编译的工作则交给`vue-loader`，在项目`build`阶段进行预编译。