---
title: "JS 栈内存和堆内存"
date: 2018-04-17T14:34:42+08:00
---

简单来说，JS 引擎将内存分为代码区和数据区，而数据区分为 Stack（栈内存）和 Heap（堆内存）。

基本类型的数据直接存入 Stack 里，复杂类型的数据是把 Heap 地址存入 Stack 里，这个地址就是对数据的引用。

记录一下几个关于内存的问题：

1. 

```javascript
var a = 1
var b = a
b = 2
// a = ?
```

不废话。。。a 的值肯定为 1。

2. 

```javascript
var a = { name: 'a' }
var b = a
b = { name: 'b' }
// a.name = ?
```

因为 a 的值为一个对象（复杂类型），所以 a 其实是把这个对象的 Heap 地址存在 Stack 里。

`var b = a` 是复制了这个 Heap 地址给 b。

`b = { name: 'b' }` 是把一个新对象的 Heap 地址赋值给 b，覆盖掉原来的 Heap 地址。

所以 a 没有变化，`a.name` 的值为 `'a'`。

3. 

```javascript
var a = { name: 'a' }
var b = a
b.name = 'b'
// a.name = ?
```

前两句同上。

此时 `b.name = 'b'` 其实是把 Heap 地址引用的对象中的 name 变成了 `'b'`。

因为 a 和 b 的 Heap 地址引用的是同一个内存区域（即同一个对象），所以 `a.name` 的值也变成了 `'b'`。

4. 

```javascript
var a = { name: 'a' }
var b = a
b = null
// a.name = ?
```

其实与第二题同理，`b = null` 是把 `null` 赋值给 b，覆盖掉原来的 Heap 地址。

所以 a 没有变化，`a.name` 的值还是为 `'a'`。

5. 

```javascript
var a = { self: a }
// a === a.self ?
```

首先变量提升会声明一个 `a`，此时 a 并没有被赋值，a 为 `undefined`。

然后在 Heap 中存 `{ self: a }` 数据，此时 a 依然为 `undefined`。

最后再把该数据的 Heap 地址赋值给 a 存入 Stack 里。

所以实际上 `a` 的值为 `{ self: undefined }`，`a.self` 为 `undefined`。结果为 `false`。

如果要实现 `a === a.self` ，要先存一个空对象，再给空对象添加属性。

```
var a = {}
a.self = a
a === a.self  // true
```

6. 

```javascript
var a = { name: 'a' }
var b = a
a.x = a = { name: 'b' }
// a.x = ?
// b.x = ?
```

首先写出 `a.x = a = { name: 'b' }` 这样的代码很智障。。。

然后运行到这一行的时候，a 和 b 在 Stack 中存入的 Heap 地址已经确定了，简单的假设这个地址为 `ADDR200`，写成伪代码 `ADDR200.x = ADDR200 = { name: 'b' }`。

先计算 `a = { name: 'b' }` 就是覆盖之前的 Heap 地址，再简单的假设这个地址为 `ADDR300`，写成伪代码 `ADDR200.x = ADDR300`。

再计算 `a.x = a` 就是给 Heap 地址为 `ADDR200` 引用的对象添加属性 `x`，值为 Heap 地址 `ADDR300`。

所以最后 a 在 Stack 中存的 Heap 地址为 `ADDR300`，b 在 Stack 中存的 Heap 地址为 `ADDR200`。

```javascript
a  // { name: 'b' }
b  // { name: 'a', x: { name: 'b' } }
a.x  // undefined
b.x  // { name: 'b' }
```