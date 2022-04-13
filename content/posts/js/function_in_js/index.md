---
title: "JS 中的函数"
date: 2019-12-26T00:00:00+08:00
---

## 函数的返回值由什么确定？

一个函数的返回值，由两个因素决定：

- 定义时的环境 env
- 调用时输入的参数 params

举例：

```javascript
let x = 'x'
let a = '1'
function f1(x){
  return x + a
}
{
  let a = '2'
  f1('y')  // 值为 'y1'
}
```

在函数 f1 中：

- x 是参数，所以 x 的值在调用 f1 的时候确定。
- a 不是参数，所以 a 的值在 f1 定义时，由它所处的环境确定。

```javascript
let x = 'x'
let a = '1'
function f1(x){
  return x + a
}
a = '3'
{
  let a = '2'
  f1('y')  // 值为 'y3'
}
```

另一个例子：

```javascript
let x = 'x'
let a = '1'
function f1(c) {
  c()
}
{
  let a = '2'
  function f2() {
    console.log(x + a)
  }
  f1(f2)  // 打印出 'x2'
}
```


## 闭包

如果一个函数里面访问了外面的变量，那么「这个函数+这些变量」就叫做闭包。

常见的考题：闭包+时间

```javascript
for(var i=0; i<6; i++) {
  setTimeout(
    () => console.log(i)
  )
}
// 结果打印出六个 6
```

使用 let 就可以改成符合预期的结果：

```javascript
for(let i=0; i<6; i++) {
  setTimeout(
    () => console.log(i)
  )
}
// 结果打印出 0 1 2 3 4 5
```

或者使用立即执行函数：

```javascript
for(var i=0; i<6; i++) {
  (function(i) {
    setTimeout(
      () => console.log(i)
    )
  })(i)
}
// 结果打印出 0 1 2 3 4 5
```

闭包的特点：

能让一个函数维持住或者隐藏一个变量，但并不能维持这个变量的值。


## this

非箭头函数中的 this 其实就是 call 的第一个参数，需要在函数调用时才能够确定 this 的值。

举例：

```javascript
function f1(x) {
  console.log(this)
  console.log(x)
}
f1.call({name: 'john'}, 'zzz')
// 结果打印出
// {name: 'john'}
//  'zzz'
```

箭头函数中不支持 this 作为参数传递进来，而是把 this 当做一个外部环境的变量，要根据定义函数时的环境才能确定 this 的值。

举例：

```javascript
const f1 = () => {console.log(this)}
f1()  // 打印出 window 对象
f1.call({name: 'john'})  // 还是打印出 window 对象
```

一道巨坑的面试题

```javascript
let length = 10
function f1() {
  console.log(this.length)
}
let obj = {
  length: 5,
  method(fn) {
    fn()
    arguments[0]()
  }
}
obj.method(f1, 1)
// 最终打印的结果？
```

解析：

1. 调用 obj.method 把函数 f1 和数字 1 传进去，那么在 obj.method 中执行的 fn() 就是调用函数 f1。
2. 把 fn 的调用改写为 call 的形式 fn.call(undefined)，所以函数 f1 中的 this 就是 window。
3. 这里的第一个坑，就是 window.length 的值。
4. 因为在最开始使用 let 声明了 length = 10，但其实使用 let 声明的变量是不会挂到 window 对象中的。
5. 实际上这里有一个很偏的知识点，window.length 的值指的是当前页面中 iframe 的数量，而这个数量一般都是未知的。所以第一次打印出来的值是未知数。
6. 继续执行 obj.method 中的 arguments[0]()，同样改写为 call 的形式调用 arguments[0].call(arguments)。
7. 因为 arguments 的第 0 个参数就是 fn，又可以改写为 fn.call(arguments)，所以这一次函数 f1 中的 this 就是 arguments。
8. 这里的第二个坑，就是 arguments.length 的值，到底是形参的长度还是实参的长度？
9. 正确答案是实参的长度，由于调用 obj.method 时传入了两个参数（函数 f1 和数字 1），所以第二次打印出来的值为 2。