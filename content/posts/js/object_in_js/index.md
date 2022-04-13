---
title: "JS 中的对象"
date: 2018-04-19T21:34:49+08:00
---

ECMAScript 规定全局对象叫做 global，但是浏览器把 window 作为全局对象（浏览器先存在的）。

window 有很多属性，这些属性就是全局变量，可供调用。大致分为两种：

- ECMAScript 规定的 `Number`、`String`、`Boolean`、`Object` ...
- 浏览器自己添加的 `alert`、`prompt`、`comfirm`、`console` ...

## Number 对象

`Number` 对象是数值对应的包装对象。

`Number()` 可以作为工具函数使用，也可以作为构造函数使用（即可以使用new命令）：

- `Number('1')` 尝试把任意值变为数值
- `var n = new Number(1)` 把数值 1 包装成一个对象

那么为什么要把 1 包装成一个对象？

```javascript
var n1 = 1
var n2 = new Number(1)
// 这两个变量有什么区别？
```

区别就是内存不同。

打印出 `n1` 和 `n2` 可以发现，`n1` 的值是一个基本类型，直接存在 Stack 中；而 `n2` 的值则是一个对象，把这个对象的 Heap 地址存在 Stack 中，对象里提供了一些例如 `valueOf()`、`toString()` 等可以被调用的属性和方法。

```javascript
n2.valueOf()  // 得到初始值 1
n2.toString()  // 转换为字符串 '1'
```

但奇怪的是，`n1` 是基本类型，它也可以调用这些方法：

```javascript
n1.valueOf()  // 1
n1.toString()  // '1'
```

> JS 黑历史：Brendan Eich 最初设计 JS 的时候，被要求语法要像 JAVA，于是就有了 `var n2 = new Number(1)`。但他认为这种方式太麻烦，于是就有了 `var n1 = 1`。但这样有一个缺点，因为 `n1` 是基本类型，所以就无法调用 `Number` 对象提供的方法。

**解决办法就是，当对 `n1` 想要进行操作或调用对应的方法时，就把 `n1` 做一个转换，临时包装成一个对象，之后就马上删除这个对象。这样就实现了基本类型也可以直接调用相应的属性和方法。**

一个简单的验证：

```javascript
var n = 1
n.a = 2  // 会不会报错？
```

当执行 `n.a = 2` 时，JS 会临时的把 `n` 包装成对象，然后给这个对象添加属性 `a`，值为 2。

所以不会报错。

如果想要调用 `n.a`：

```javascript
n.a  // 返回的值？
```

因为在执行完 `n.a = 2` 后，`n` 临时包装的对象就马上被删除了，所以再执行 `n.a` 的时候，就会另外重新把 `n` 临时包装成对象，但这个对象并没有添加属性 `a`。

所以返回的值是 `undefined`。

更多详细参考：[阮一峰《JavaScript 标准参考教程》- Number 对象](http://javascript.ruanyifeng.com/stdlib/number.html)


## String 对象

与 `Number` 对象类似，`String` 对象是字符串对应的包装对象。

`String()` 可以作为工具函数使用，也可以作为构造函数使用。

更多详细参考：[阮一峰《JavaScript 标准参考教程》- String 对象](http://javascript.ruanyifeng.com/stdlib/string.html)


## Boolean 对象

与 `Number` 对象类似，`Boolean` 对象是布尔值对应的包装对象。

`Boolean()` 可以作为工具函数使用，也可以作为构造函数使用。

讲一个笑话：

```javascript
var bool = new Boolean(false)
if(bool) {
    console.log("js is amazing :)")
}
```

更多详细参考：[阮一峰《JavaScript 标准参考教程》- Boolean 对象](http://javascript.ruanyifeng.com/stdlib/wrapper.html#toc6)


## Object 对象

`Object()` 当作工具函数使用，将任意值转为对象：

- 如果参数是空、undefined 或 null，返回一个空对象
- 如果参数是 number、string 或 boolean 值，返回对应的包装对象
- 如果参数是一个对象，它总是返回该对象

`Object()` 也可以作为构造函数使用，用法与工具函数用法几乎一模一样。

例如直接通过它来生成新对象：

```javascript
var o1 = {}
var o2 = new Object()
o1 === o2  // false
```

`o1` 和 `o2` 基本没有区别，都是空对象，只是在 Stack 中存的 Heap 地址不同。

更多详细参考：[阮一峰《JavaScript 标准参考教程》- Object 对象](http://javascript.ruanyifeng.com/stdlib/object.html)


## Array 对象

`Array()` 当作工具函数和构造函数的用法几乎一摸一样，可以用它生成新的 Array 对象。

**但是 `Array()` 有一个巨大的缺陷，就是不同的参数，会导致它的行为不一致。**

例如：

```javascript
var a = new Array(3)  // 声明一个长度为 3 的数组，但没有任何元素，只有 length 属性
a  // []
a.length  // 3
'0' in a  // false

var b = new Array(3, 3)  // 声明一个长度为 2 的数组 [3, 3]
b  // [3, 3]
```

**因此，不建议使用它生成新数组，直接使用数组字面量是更好的做法。**

```javascript
var a = [1, 2, 3]
```

更多详细参考：[阮一峰《JavaScript 标准参考教程》- Array 对象](http://javascript.ruanyifeng.com/stdlib/array.html)


## 简单总结

- `Number()`、`String()`、`Boolean()`

不加 `new` 就是当做数据类型转换工具函数使用，返回的是基本类型的值。  
加 `new` 就是当做构造函数使用，返回的是对应类型的包装对象。

- `Object()`、`Array()`  

加不加 `new` 都一样，返回的都是对象。