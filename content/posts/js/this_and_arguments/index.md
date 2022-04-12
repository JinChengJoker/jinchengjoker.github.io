---
title: "JS 中的 this 和 arguments"
date: 2018-04-26T22:38:38+08:00
---

## this 到底指的是什么

首先我们知道函数的两种调用方式：

```javascript
function sum(a, b) {
    return a + b
}

// 第一种方式
sum(1, 2)  // 3

// 第二种方式
sum.call(undefined, 1, 2)  // 3
```

如果函数以 `.call()` 的方式调用，那么其实 `this` 通常指的就是第一个参数。暂时不讨论以 `()` 的方式调用。

但是需要注意的是：

1. 当第一个参数为 `undefined`、`null` 或空时，在非严格模式下，`this` 会自动指向全局 `window` 对象。

    ```javascript
    // 非严格模式
    function fn() {
        console.log(this)
    }
    fn.call()  // 全局 window 对象
    fn.call(undefined)  // 全局 window 对象
    fn.call(null)  // 全局 window 对象
    
    // 使用严格模式
    function fn() {
        'use strict'
        console.log(this)
    }
    fn.call()  // undefined
    fn.call(undefined)  // undefined
    fn.call(null)  // null
    ```

2. 当第一个参数为 `Number`、`String`、`Boolean` 类型时，在非严格模式下，`this` 会指向对应类型的包装对象。

    ```javascript
    // 非严格模式
    function fn() {
        console.log(typeof this)
    }
    fn.call(1)  // "object"
    fn.call('hello')  // "object"
    fn.call(true)  // "object"
    
    // 使用严格模式
    function fn() {
        'use strict'
        console.log(this)
    }
    fn.call(1)  // 1
    fn.call('hello')  // "hello"
    fn.call(true)  // true
    ```

## arguments

还是最上面的例子。

如果函数以 `()` 的方式调用，那么 `arguments` 就是由所有参数组成的伪数组。

如果函数以 `.call()` 的方式调用，那么 `arguments` 指的就是第二个及之后的参数组成的伪数组。

需要注意的是，在非严格模式下，`arguments` 可以被修改。

```javascript
// 非严格模式
function sum(a, b) {
    arguments[0] = 4
    arguments[1] = 6
    return a + b
}
sum(1, 2)  // 10
sum.call(undefined, 1, 2)  // 10

// 严格模式
function sum(a, b) {
    'use strict'
    arguments[0] = 4
    arguments[1] = 6
    return a + b
}
sum(1, 2)  // 3
sum.call(undefined, 1, 2)  // 3
```