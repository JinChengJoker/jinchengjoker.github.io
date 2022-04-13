---
title: "JS 高阶函数"
date: 2019-09-03T00:00:00+08:00
---

一句话解释高阶函数：把函数作为参数或者返回值的函数。

## JS 中部分内置的高阶函数

- Function.prototype.bind
- Function.prototype.apply
- Function.prototype.call
- Array.prototype.sort
- Array.prototype.map
- Array.prototype.filter
- Array.prototype.reduce


## bind/apply/call.call() 是什么意思

例如，`bind`的一般用法：

```javascript
var f1 = function() {
  console.log(this)
  console.log(arguments)
}
var newF1 = f1.bind({ name: 'john' }, 1, 2)
newF1()
// {name: 'john'}
// [1, 2]
```

推理：

1. 已知`obj.method(a, b, c)`等价于`obj.method.call(obj, a, b, c)`。
2. 假设`obj = f1`，`method = bind`。
3. 那么`f1.bind(a, b, c)`等价于`f1.bind.call(f1, a, b, c)`。
4. 假设`a = { name: 'john' }`，`b = 1`，`c = 2`。
5. 那么`f1.bind({ name: 'john' }, 1, 2)`这就是一般的用法，它等价于`f1.bind.call(f1, { name: 'john' }, 1, 2)`。
6. 因为`f1.bind === Function.prototype.bind`，那么`var bind = Function.prototype.bind`，得出`bind.call(f1, { name: 'john' }, 1, 2)`。

`bind.call()`的用法：接受一个函数、需要绑定的`this`以及其它参数。

`bind.call`会调用这个函数，并传入`this`和其它参数，同时返回一个新的函数。

`apply.call`、`call.call`基本同理。


## sort/map/filter/reduce.call() 是什么意思

例如，`sort`的一般用法：

```javascript
var arr = [2, 3, 1, 5, 4]
arr.sort((a, b) => a -b)
// [1, 2, 3, 4, 5]
```

推理：

1. 已知`obj.method(a)` 等价于`obj.method.call(obj, a)`。
2. 假设`obj = arr`，`method = sort`。
3. 那么`arr.sort(a)`等价于`arr.sort.call(arr, a)`。
4. 假设`a = (a, b) => a - b`。
5. 那么`arr.sort((a, b) => a - b)`这就是一般的用法，它等价于`arr.sort.call(arr, (a, b) => a - b)`。
6. 因为`arr.sort === Array.prototype.sort`，那么`var sort = Array.prototype.sort`，得出`sort.call(arr, (a, b) => a - b)`。

`sort.call()`的用法：接受一个数组和一个函数。对这个数组进行排序，排序的依据放在第二个参数。

`map.call`、`filter.call`、`reduce.call`基本同理。