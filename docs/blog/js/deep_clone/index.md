# JS 实现深拷贝

## JSON 序列化和反序列化

对于一般（狭义）的对象，最简单快速的方法就是使用 JSON 的序列化和反序列化：

```javascript
const o1 = {
  name: 'xxx',
  age: 18,
  child: {
    name: 'zzz'
  }
}
const o2 = JSON.parse(JSON.stringify(o1))

o1 === o2  // false
o1.name === o2.name  // true
o1.child === o2.child  // false
o1.child.name === o2.child.name  // true
```

缺点：仅支持 JSON 所支持的数据类型和结构。

例如：

1. 不支持函数，会被直接忽略
2. 不支持 undefined，会被直接忽略
3. 不支持循环引用，例如 xxx.self = xxx，会报错

**对于更复杂的对象，就无法使用上面的办法，需要使用递归来进行深拷贝。**


## 搭建测试环境

安装 mocha、chai 和 sinon-chai：

```
yarn init -y
yarn add mocha chai sinon-chai --dev
```

package.json 添加运行测试命令：

```json
"scripts": {
  "test": "mocha test/**/*.js"
}
```

导出 deepClone：

```javascript
//  src/index.js

function deepClone() {}

module.exports = deepClone
```

编写测试用例：

```javascript
//  test/index.js

const chai = require('chai')
const sinonChai = require('sinon-chai')
const deepClone = require('../src/index')

chai.use(sinonChai)
const assert = chai.assert

describe('测试深拷贝', () => {
  it('成功引入深拷贝', () => {
    assert.isFunction(deepClone)
  })
})
```

运行测试：

```
yarn test
```


## 递归深拷贝

### 拷贝基本类型

添加测试用例：

```javascript
it('拷贝基本类型', () => {
  const s1 = 'xxx'
  const n1 = 123
  const u1 = undefined
  const b1 = true
  const empty1 = null
  const s2 = deepClone(s1)
  const n2 = deepClone(n1)
  const u2 = deepClone(u1)
  const b2 = deepClone(b1)
  const empty2 = deepClone(empty1)
  assert(s2 === s1)
  assert(n2 === n1)
  assert(u2 === u1)
  assert(b2 === b1)
  assert(empty2 === empty1)
})
```

因为基本类型不会存在深浅拷贝的问题，所以直接返回它的值就可以了。

```javascript
function deepClone(resource) {
  return resource
}
```

### 拷贝一般（狭义）对象

添加测试用例：

```javascript
it('拷贝一般（狭义）对象', () => {
  const o1 = { name: 'xxx', child: { name: 'zzz' } }
  const o2 = deepClone(o1)
  assert(o1 !== o2)
  assert(o1.name === o2.name)
  assert(o1.child !== o2.child)
  assert(o1.child.name === o2.child.name)
})
```

使用递归来进行深拷贝：

```javascript
function deepClone(resource) {
  if (resource instanceof Object) {
    const result = new Object()
    for(let key in resource) {
      result[key] = deepClone(resource[key])
    }
    return result
  }
  return resource
}
```

### 拷贝数组

添加测试用例：

```javascript
it('拷贝数组', () => {
  const a1 = [[12, 23], [34, 45], [56, 67]]
  const a2 = deepClone(a1)
  assert(a1 !== a2)
  assert(a1[0] !== a2[0])
  assert(a1[1] !== a2[1])
  assert(a1[2] !== a2[2])
  assert.deepEqual(a1, a2)
})
```

还是使用递归来进行深拷贝，不过在最初生成的时候需要 new Array()，而不是 new Object()。

```javascript
function deepClone(resource) {
  if (resource instanceof Object) {
    if (resource instanceof Array) {
      const result = new Array()
      for (let key in resource) {
        result[key] = deepClone(resource[key])
      }
      return result
    } else {
      const result = new Object()
      for (let key in resource) {
        result[key] = deepClone(resource[key])
      }
      return result
    }
  }
  return resource
}
```

### 拷贝函数

添加测试用例：

```javascript
it('拷贝函数', () => {
  const f1 = (a, b) => {
    return a + b
  }
  f1.xxx = { yyy: { zzz: 'aaa' } }
  const f2 = deepClone(f1)
  assert(f1 !== f2)
  assert(f1(1, 2) === f2(1, 2))
  assert(f1.xxx !== f2.xxx)
  assert(f1.xxx.yyy !== f2.xxx.yyy)
  assert(f1.xxx.yyy.zzz === f2.xxx.yyy.zzz)
})
```

通过直接调用源函数的方法，来达到类似深拷贝的目的。

```javascript
...

else if (resource instanceof Function) {
  const result = function () {
    return resource.apply(this, arguments)
  }
  for (let key in resource) {
    result[key] = deepClone(resource[key])
  }
  return result
}

...
```

### 拷贝正则表达式

添加测试用例：

```javascript
it('拷贝正则表达式', () => {
  const reg1 = /hi\d+/gi
  reg1.xxx = { yyy: { zzz: 'aaa' } }
  const reg2 = deepClone(reg1)
  assert(reg1 !== reg2)
  assert(reg1.source === reg2.source)
  assert(reg1.flags === reg2.flags)
  assert(reg1.xxx !== reg2.xxx)
  assert(reg1.xxx.yyy !== reg2.xxx.yyy)
  assert(reg1.xxx.yyy.zzz === reg2.xxx.yyy.zzz)
})
```

正则表达式有两个非常重要的属性：

- source 返回主体内容
- flags 返回标记

可以根据这两个属性，new RegExp() 一个新的正则表达式。

```javascript
...

else if (resource instanceof RegExp) {
  const result = new RegExp(resource.source, resource.flags)
  for (let key in resource) {
    result[key] = deepClone(resource[key])
  }
  return result
}

...
```

### 拷贝日期

添加测试用例：

```javascript
it('拷贝日期', () => {
  const d1 = new Date()
  d1.xxx = { yyy: { zzz: 'aaa' } }
  const d2 = deepClone(d1)
  assert(d1 !== d2)
  assert(d1.getTime() === d2.getTime())
  assert(d1.xxx !== d2.xxx)
  assert(d1.xxx.yyy !== d2.xxx.yyy)
  assert(d1.xxx.yyy.zzz === d2.xxx.yyy.zzz)
})
```

可以使用 new Date() 和源日期对象来初始化一个新的日期对象。

```javascript
...

else if (resource instanceof Date) {
  const result = new Date(resource)
  for (let key in resource) {
    result[key] = deepClone(resource[key])
  }
  return result
}

...
```


## 跳过原型属性

使用 for ... in 来遍历对象的 key 的时候，会默认遍历原型上的属性：

```javascript
const obj = Object.create({ name: 'xxx' })  // name 会在 obj 的 __proto__ 中
obj.age = 18
for(let key in obj) {
  console.log(key)
}

// 'age'
// 'name'
```

一般来说，不拷贝原型上的属性。

添加测试用例：

```javascript
it('跳过原型属性', () => {
  const o1 = Object.create({ name: 'xxx' })
  o1.xxx = { yyy: { zzz: 'aaa' } }
  const o2 = deepClone(o1)
  assert(o1 !== o2)
  assert.isTrue('name' in o1)
  assert.isFalse('name' in o2)
  assert(o1.xxx !== o2.xxx)
  assert(o1.xxx.yyy !== o2.xxx.yyy)
  assert(o1.xxx.yyy.zzz === o2.xxx.yyy.zzz)
})
```

所以在递归的时候，需要判断 key 是不是它自身的属性。

```
for (let key in resource) {
  if(resource.hasOwnProperty(key)) {
    result[key] = deepClone(resource[key])
  }
}
```


## 代码优化

整合上面的代码，进行优化：

```javascript
//  src/index.js

function deepClone(resource) {
  if (resource instanceof Object) {
    let result
    if (resource instanceof Array) {
      result = new Array()
    } else if (resource instanceof Function) {
      result = function () {
        return resource.apply(this, arguments)
      }
    } else if (resource instanceof RegExp) {
      result = new RegExp(resource.source, resource.flags)
    } else if (resource instanceof Date) {
      result = new Date(resource)
    } else {
      result = new Object()
    }
    for (let key in resource) {
      if(resource.hasOwnProperty(key)) {
        result[key] = deepClone(resource[key])
      }
    }
    return result
  }
  return resource
}

module.exports = deepClone
```

可以直观的看出，对于不同的复杂对象，只需要对其进行不同的特殊处理即可。


## 环处理

递归拷贝还有一个问题，就是对于环的处理。

例如 window.self 就是一个环，它指向 window 自己。当递归拷贝遇到环，就会陷入无限的循环。

编写测试用例：

```javascript
it('环拷贝', () => {
  const o1 = { name: 'xxx', child: { name: 'zzz' } }
  o1.self = o1
  const o2 = deepClone(o1)
  assert(o1 !== o2)
  assert(o1.name === o2.name)
  assert(o1.child !== o2.child)
  assert(o1.child.name === o2.child.name)
  assert(o1.self !== o2.self)
})
```

处理的思路：对已处理过的对象进行缓存，在递归的同时，检查是否有缓存，如果发现有缓存，则代表有环，就直接返回该对象，达到环拷贝的目的。

```javascript
//  src/index.js

const cacheStack = []

function deepClone(resource) {
  if (resource instanceof Object) {
    const cache = findCache(resource)
    if (cache) {
      return cache
    } else {
      let result
      if (resource instanceof Array) {
        result = new Array()
      } else if (resource instanceof Function) {
        result = function () {
          return resource.apply(this, arguments)
        }
      } else if (resource instanceof RegExp) {
        result = new RegExp(resource.source, resource.flags)
      } else if (resource instanceof Date) {
        result = new Date(resource)
      } else {
        result = new Object()
      }
      cacheStack.push([resource, result])
      for (let key in resource) {
        if (resource.hasOwnProperty(key)) {
          result[key] = deepClone(resource[key])
        }
      }
      return result
    }
  }
  return resource
}

function findCache(resource) {
  for (let i = 0; i < cacheStack.length; i++) {
    if (cacheStack[i][0] === resource) {
      return cacheStack[i][1]
    }
  }
  return null
}

module.exports = deepClone
```

[查看完整的代码](https://github.com/JinChengJoker/deep-clone)