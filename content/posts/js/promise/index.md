---
title: "Promise、微任务、宏任务"
date: 2020-02-24T00:00:00+08:00
---

## 基本用法

```javascript
const roll = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(Math.floor(Math.random() * 6) + 1)
    }, 1000)
  })
}

roll()
  .then(
    (result) => {
      console.log(result)
    },
    (reason) => {
      console.log('reason: ' + reason)
    }
  )
```


## 多次处理一个结果

上一个 then 的返回值会传递给下一个 then，可以继续处理。

```javascript
roll()
  .then((r1) => r1)
  .then((r2) => console.log(r2 * 10))
```


## 错误处理

如果上一个 then 抛出了错误，那么下一个 then 就需要继续处理错误。如果没有抛出错误，就不需要继续处理错误。

```javascript
roll()
  .then(null, (err1) => {
    throw new Error(err1)
  })
  .then(null, (err2) => {
    console.log(err2)
  })
```


## 微任务和宏任务

在 ES6 之前，JS 里只有两种任务：一种是正在执行中的代码任务，另一种就是异步队列任务。

1. 当使用了例如 setTimeout 这种异步代码，就会把需要执行的任务先放入异步队列中。
2. 等正在执行中的代码任务完成后，再去执行异步队列中的任务。

```javascript
setTimeout(() => {
  console.log(1)
}, 0)
console.log(2)

// 先打印出 2
// 再打印出 1
```

在 ES6 之后，为了解决回调的问题，出现了 Promise，又为了让 Promise 的回调更早执行，这时就有了微任务和宏任务的概念。

1. 当调用 promise 中的回调时，就会把需要执行的任务放入微任务队列。
2. 而当使用了 setTimeout 等异步方法时，就会把需要执行的任务放入宏任务队列。
3. 等正在执行中的代码任务完成后，先去执行微任务队列中的任务，最后再去执行宏任务队列中的任务。

```javascript
const fn = () => {
  return new Promise((resolve, reject) => {
    resolve(3)
  })
}

setTimeout(() => {
  console.log(1)
}, 0)
fn().then((v) => console.log(v))
console.log(2)

// 先打印出 2
// 再打印出 3
// 最后打印出 1
```


## Promise 的其它用法

- Promise.resolve()

用于制造一个成功的 promise。

```javascript
function fn() {
  return Promise.resolve(123)
}

fn().then((result) => {
  console.log(result)
})

// 123
```

- Promise.reject()

用于制造一个失败的 promise。

```javascript
function fn() {
  return Promise.reject(123)
}

fn().then(null, (reason) => {
  console.log(reason)
})

// 123
```

- Promise.all()

它接受一个由 promise 元素组成的数组，用于等待所有的 promise 成功，或者其中一个 promise 失败。

所有的 promise 成功：

```javascript
Promise.all([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)])
  .then(
    (result) => {
      console.log(result)
    }
  )

// [1, 2, 3]
```

其中一个 promise 失败：

```javascript
Promise.all([Promise.resolve(1), Promise.reject(2), Promise.resolve(3)])
  .then(
    null,
    (reason) => {
      console.log(reason)
    }
  )

// 2
```

- Promise.allSettled()

它接受一个由 promise 元素组成的数组，用于等待所有的 promise，无论成功或失败。

```javascript
Promise.allSettled([Promise.resolve(1), Promise.reject(2), Promise.resolve(3)])
  .then(
    (result) => {
      console.log(result)
    }
  )

// [
//   {status: "fulfilled", value: 1},
//   {status: "rejected", reason: 2},
//   {status: "fulfilled", value: 3}
// ]
```

但是这个方法兼容性不好，需要自己封装 Promise.all() 来实现。


## 实现 Promise.allSettled()

由于 Promise.all() 只要有一个 promise 失败就会返回，那么只需要让它永远不要失败就能实现。

```javascript
const task1 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1)
    }, 1000)
  })
}
const task2 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(2)
    }, 2000)
  })
}
const task3 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(3)
    }, 3000)
  })
}

Promise.all([
  task1().then((value)=>({status: 'fulfilled', value}), (reason)=>({status: 'rejected', reason})),
  task2().then((value)=>({status: 'fulfilled', value}), (reason)=>({status: 'rejected', reason})),
  task3().then((value)=>({status: 'fulfilled', value}), (reason)=>({status: 'rejected', reason}))
]).then(
  (result) => {
    console.log(result)
  }
)

// [
//   {status: "fulfilled", value: 1},
//   {status: "rejected", reason: 2},
//   {status: "fulfilled", value: 3}
// ]
```

封装一个函数将 Promise.all() 的参数进行转换：

```javascript
const promiseChange = (promiseList) => {
  return promiseList.map((promise) => {
    return promise.then(
      (value)=>({status: 'fulfilled', value}),
      (reason)=>({status: 'rejected', reason})
    )
  })
}

Promise.all(promiseChange([task1(), task2(), task3()]))
  .then(
    (result) => {
      console.log(result)
    }
  )
```

最终封装为 Promise.allSettled2：

```javascript
Promise.allSettled2 = (promiseList) => {
  return Promise.all(
    promiseList.map((promise) => {
      return promise.then(
        (value)=>({status: 'fulfilled', value}),
        (reason)=>({status: 'rejected', reason})
      )
    })
  )
}

Promise.allSettled2([task1(), task2(), task3()])
  .then(
    (result) => {
      console.log(result)
    }
  )

// [
//   {status: "fulfilled", value: 1},
//   {status: "rejected", reason: 2},
//   {status: "fulfilled", value: 3}
// ]
```