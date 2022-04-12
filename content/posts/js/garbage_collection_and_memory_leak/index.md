---
title: "JS 垃圾回收和内存泄漏"
date: 2018-04-18T21:23:47+08:00
---

## 垃圾回收

简单来说，如果一个对象没有被引用，那么它就是垃圾，内存将会被回收。

```javascript
var a = { name: 'a' }
var b = { name: 'b' }
b = a
```

因为 b 在 Stack 中存的 Heap 地址被 a 覆盖了，所以导致 `{ name: 'b' }` 没有被引用，那么它就是垃圾，内存将会被回收。

```javascript
var fn = function() { console.log('hello') }
document.body.onclick = fn
fn = null
// 对象 function() { console.log('hello') } 会不会被垃圾回收？
```

前两句表示 `fn` 和 `document.body.onclick` 在 Stack 中存的是同一个 Heap 地址。

`fn = null` 表示 `fn` 在 Stack 中存的 Heap 地址被 `null` 覆盖了。

但是对象 `function() { console.log('hello') }` 的 Heap 地址依然被 `document.body.onclick` 所引用，所以它不是垃圾。


## 内存泄漏

不再用到的内存，没有及时回收释放，就叫做内存泄漏。

上面的例子，如果关掉当前页面，那么 `document` 就不存在了，对象 `function() { console.log('hello') }` 就没有被引用，将会被当作垃圾回收，所占内存会被释放。

但是在 IE（尤其是 IE6） 中会有 BUG，因为在页面关闭后它无法正常的把 `onclick` 等事件监听绑定的函数标记为垃圾，所以它会认为对象 `function() { console.log('hello') }` 不是垃圾，那么内存将不会被回收，除非关闭整个浏览器。这样垃圾越来越多，内存无法重新被利用，造成内存泄漏。

解决办法是在页面关闭之前，把所有的事件监听赋值为 `null`。