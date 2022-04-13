---
title: "用 JS 理解函数柯里化"
date: 2019-11-14T00:00:00+08:00
---

一句话解释函数柯里化：让所有函数只接受一个参数。

## 单一参数

例如，未来的 JS 可能会支持的 pipe 操作：

```javascript
function doubleSay (str) {
  return str + ", " + str
}
function capitalize (str) {
  return str[0].toUpperCase() + str.substring(1)
}
function exclaim (str) {
  return str + '!'
}
let result = "hello"
    |> doubleSay
    |> capitalize
    |> exclaim
result  // "Hello, hello!"
```

或者使用 Ramda.js：

```javascript
const say = Ramda.compose(doubleSay, capitalize, exclaim)
say('hello')  // 'Hello, hello!'
```


## 如何让单参数函数支持两个参数

可以用对象：

```javascript
const add = ({a, b}) => a + b
add({ a: 1, b: 2 })
```

或者用箭头函数和闭包来实现：

```javascript
const add = a => b => a + b
add(1)(2)
```


## 柯里化一个函数

### 面试题

如何把一个三参数的函数 add(1, 2, 3) 变成 curriedAdd(1)(2)(3) 的形式？

答：

```javascript
const curriedAdd = a => b => c => a+b+c
```

### 面试题升级

写一个 currify 函数，能将任意接受固定个数的参数的函数，变成单一参数的函数？

假设有函数：

```javascript
const addTwo = (a, b) => a+b
const addThree = (a, b, c) => a+b+c
const addFour = (a, b, c, d) => a+b+c+d
```

请实现：

```javascript
const newAddTwo = currify(addTwo)
const newAddThree = currify(addThree)
const newAddFour = currify(addFour)
newAddTwo(1)(2)  // 3
newAddThree(1)(2)(3)  // 6
newAddFour(1)(2)(3)(4)  // 10
```

答：

```javascript
const currify = (fn, params = []) => {
  return (arg) => {
    params.push(arg)
    if(fn.length === params.length) {
      return fn(...params)
    } else {
      return currify(fn, params)
    }
  }
}

const newAddTwo = currify(addTwo)
const newAddThree = currify(addThree)
console.log(newAddTwo(1)(2))  // 3
console.log(newAddThree(1)(2)(3))  // 6
```

### 解决一个 BUG

执行以下代码，就会出现一个报错：

```javascript
const newAddTwo = currify(addTwo)
console.log(newAddTwo(1))  // 返回一个函数
console.log(newAddTwo(1)(2))

// error TypeError: newAddTwo(...) is not a function
```

因为重复使用了同一个 params 数组来储存传入的参数，可以在递归的时候都生成一个新的 newParams 来解决：

```javascript
const currify = (fn, params = []) => {
  return (arg) => {
    const newParams = params.concat(arg)
    if(fn.length === newParams.length) {
      return fn(...newParams)
    } else {
      return currify(fn, newParams)
    }
  }
}

const newAddTwo = currify(addTwo)
const newAddThree = currify(addThree)
console.log(newAddTwo(1))  // 返回一个函数
console.log(newAddTwo(1)(2))  // 3
console.log(newAddThree(1)(2)(3))  // 6
```

### 面试题再升级

修改 currify 函数，使得能够支持以下写法：

```javascript
const newAddFour = currify(addFour)
newAddFour(1)(2, 3)(4)  // 10
```

答：

```javascript
const currify = (fn, params = []) => {
  return (...args) => {
    const newParams = params.concat(args)
    if(fn.length === newParams.length) {
      return fn(...newParams)
    } else {
      return currify(fn, newParams)
    }
  }
}

const newAddFour = currify(addFour)
console.log(newAddFour(1)(2, 3)(4))  // 10
```

### 最终代码优化

```javascript
const currify = (fn, params = []) =>
  (...args) =>
    fn.length === params.concat(args).length
      ? fn(...params.concat(args))
      : currify(fn, params.concat(args))
```