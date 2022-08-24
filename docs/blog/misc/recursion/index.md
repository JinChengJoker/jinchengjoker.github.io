# 用 JS 理解递归

## 简单阶乘的例子

```javascript
const j = (n) =>
  n === 1 ? 1
          : n * j(n-1)
```

上面的函数，可以计算出从 1 到任意正整数 n 的阶乘。

这就是最简单的递归，一个函数的内部通过某种条件进行判断，并且调用了自己。


## 斐波那契数列的例子

斐波那契数列：数列的第一项和第二项都为 1，从第三项开始每一项都为前两项之和。

为了编程的习惯，假设第零项为 0，也能满足斐波那契数列的要求。

用递归求斐波那契数列第 n 项的值：

```javascript
const j = (n) =>
  n === 0 ? 0 :
  n === 1 ? 1 :
    j(n-1) + j(n-2)
```


## 调用栈

上面的例子，由于使用了递归，所以会在调用栈中进行压栈，主要用来记忆每次计算之后“回到哪里”。

当调用栈压栈次数过多，计算就会非常的缓慢，甚至爆栈。

比如计算斐波那契数列第 40 项，可能需要一秒；计算第 50 项就需要几十秒。

所以需要优化的就是如何降低压栈/计算次数。


## 用尾递归（迭代）优化

尾递归就是在函数的尾巴进行迭代。

因为不需要“回头”了，所以使用尾递归可以大大减少压栈和重复计算次数。

```javascript
const j = (n) => f(2, n, 1, 0)

const f = (start, end, prev1, prev2) =>
  end === 0 ? 0 :
  end === 1 ? 1 :
  start === end ? prev1 + prev2 :
    f(start+1, end, prev1+prev2, prev1)
```


## 用循环和数组优化

所有的递归都可以写成循环的形式，而且这种优化方式比较容易理解。

```javascript
const f = (n) => {
  const arr = [0, 1]
  for(let i=0; i<n-1; i++) {
    arr.push(arr[i] + arr[i+1])
  }
  return arr[n]
}
```


## 记忆化

记忆化的作用也是可以减少重复的计算，大大降低压栈次数。

原理就是把已经计算过的值给缓存起来，下次需要就不用再次计算，直接可以从缓存中取到。

例如 Lodash 中的 memoize 方法，React 中的 memo 和 useCallback 方法。

实现一个简单的记忆化函数：

```javascript
const memo = (fn) => {
  const f = (key) => {
    if(!(key in f.cache)) {
      f.cache[key] = fn(key)
    }
    return f.cache[key]
  }
  f.cache = {}
  return f
}

const x2 = memo((x) => {
  console.log('执行了一次')
  return x * 2
})

console.log(x2(1))  // 打印出执行了，并且返回2
console.log(x2(1))  // 不打印执行，并且返回上次的结果2
console.log(x2(1))  // 不打印执行，并且返回上次的结果2
```