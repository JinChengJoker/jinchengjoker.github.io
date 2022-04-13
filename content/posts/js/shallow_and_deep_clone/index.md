---
title: "JS 深浅拷贝"
date: 2017-12-12T14:43:06+08:00
---

最近在项目中遇到了一个关于数组拷贝的问题。

在 JavaScript 中，一般的简单值（Number/String/Boolean）是通过直接复制来进行赋值的：

```javascript
var a = 1
var b = a
b = 2
console.log(a)  // 1
console.log(b)  // 2
```

但是数组和对象如果用以上的方法简单赋值，某些情况下就会出现问题：

```javascript
var arr1 = [1, 2, 3]
var arr2 = arr1
arr1.shift()
console.log(arr1)  // [2, 3]
console.log(arr2)  // [2, 3]
```

上面的示例中，我只删除了 `arr1` 的第一个元素，但是打印出来会发现 `arr1` 和 `arr2` 的值都被改变了。
因为这只是数组的浅拷贝，`var arr2 = arr1` 只是将 `arr1` 的内存地址复制给 `arr2`，两个数组其实指向同一个内存区域。

对象同理：

```javascript
var obj1 = {
  name: 'luwei',
  age: 23
}
var obj2 = obj1
obj2.age = 24
console.log(obj1.age)  // 24
console.log(obj2.age)  // 24
```

所以有些时候需要进行深拷贝，深拷贝有很多种方法。


## 数组的深拷贝

### map 方法实现

```javascript
var arr1 = [1, 2, 3]
var arr2 = arr1.map((i) => {
  return i
})
arr1.shift()
console.log(arr1)  // [2, 3]
console.log(arr2)  // [1, 2, 3]
```

### slice 方法实现

``` javascript
var arr1 = [1, 2, 3]
// slice 方法用于提取原数组的一部分，没有参数实际上等于返回一个原数组的拷贝
var arr2 = arr1.slice()
arr1.shift()
console.log(arr1)  // [2, 3]
console.log(arr2)  // [1, 2, 3]
```

## 对象的深拷贝

### for 循环实现

```javascript
var obj1 = {
  name: 'luwei',
  age: 23
}
var obj2 = copyObj(obj1)
function copyObj(obj) {
  let res = {}
  for(let key in obj) {
    // 'typeof key' 为 string 类型，所以需要 'obj[key]'
    res[key] = obj[key]
  }
  return res
}
obj2.age = 24
console.log(obj1.age)  // 23
console.log(obj2.age)  // 24
```

### 扩展运算符实现

```javascript
var obj1 = {
  name: 'luwei',
  age: 23
}
var obj2 = {
  ...obj1
}
obj2.age = 24
console.log(obj1.age)  // 23
console.log(obj2.age)  // 24
```