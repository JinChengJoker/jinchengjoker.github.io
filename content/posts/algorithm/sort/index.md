---
title: "排序算法"
date: 2018-05-22T23:30:28+08:00
---

## 冒泡排序

### 基本思路

1. 依次两两对比，大小互换，越大的数越往后排，每一轮可以确定一个数。
2. 把剩下的数重复该操作。

### 算法实现

```javascript
function bubbleSort(arr) {
  // 所需轮数 arr.length - 1
  for(let l = 0; l < arr.length - 1; l++) {
    // 每一轮找出一个最大值
    for(let i = 0; i < arr.length - 1 - l; i++) {
      if(arr[i] > arr[i+1]) {
        let temp = arr[i]
        arr[i] = arr[i+1]
        arr[i+1] = temp
      }
    }
  }
  return arr
}
```


## 选择排序

### 基本思路

1. 每一轮找出其中的一个最大数，排在其最后一位，每一轮可以确定一个数。
2. 把剩下的数重复该操作。

### 算法实现

```javascript
function selectSort(arr) {
  let length = arr.length
  // 所需轮数 arr.length - 1
  for(let l = 0; l < length - 1; l++) {
    // 首先假设最大值的 index 为 0
    let max = 0
    // 然后依次对比找出实际最大值
    for(let i = 1; i < length - l; i++) {
      if(arr[i] > arr[max]) {
        max = i
      }
    }
    let temp = arr[max]
    arr[max] = arr[length-1-l]
    arr[length-1-l] = temp
  }
  return arr
}
```


## 计数排序

### 基本思路

类似整理扑克牌，需要一个额外的临时数组来计数。

1. 先将所有值依次进行计数，放入临时数组对应的下标位置中。
2. 然后将临时数组中的值依次取出即可。

### 算法实现

```javascript
function countSort(arr) {
  let temp = []
  let newArr = []
  // 入
  for(let i = 0; i < arr.length; i++) {
    if(temp[arr[i]] === undefined) {
      temp[arr[i]] = 1
    } else {
      temp[arr[i]] = temp[arr[i]] + 1
    }
  }
  // 出
  for(let j = 0; j < temp.length; j++) {
    if(temp[j] !== undefined) {
      let count = temp[j]
      for(let c = 1; c <= count; c++) {
        newArr.push(j)
      }
    }
  }
  return newArr
}
```


## 快速排序

### 基本思路

1. 首先确定一个支点值，所有小于支点的值放在其左侧，大于支点的值放在其右侧。
2. 然后分别对左侧和右侧重复进行该操作。

### 算法实现

参考：[阮一峰 - 快速排序](https://javascript.ruanyifeng.com/library/sorting.html#toc12)

```javascript
function partition(arr, l, r) {
  let pivot = arr[Math.floor((l+r)/2)]
  // 必须 l <= r 例如：[3, 2, 5, 4, 5]
  while(l <= r) {
    // 必须 arr[l] < pivot 同上
    while(arr[l] < pivot) {
      l++
    }
    while(arr[r] > pivot) {
      r--
    }
    if(l <= r) {
      let temp = arr[l]
      arr[l] = arr[r]
      arr[r] = temp
      l++
      r--
    }
  }
  return l
}

function quickSort(arr, l, r) {
  if(arr.length < 2) {
    return arr
  }
  l = (l === undefined ? 0 : l)
  r = (r === undefined ? arr.length - 1 : r)
  let i = partition(arr, l, r)
  if(l < i - 1) {
    quickSort(arr, l, i-1)
  }
  if(i < r) {
    quickSort(arr, i, r)
  }
  return arr
}
```