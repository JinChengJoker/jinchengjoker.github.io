# 用 TS 实现 EventHub（发布/订阅模式）

## 确定 API

- EventHub#on
- EventHub#emit
- EventHub#off


## 测试环境搭建

*TDD：测试驱动开发*

安装 ts-node：

```
yarn global add ts-node
```

初始化一个 EventHub 类：

```javascript
// index.ts

class EventHub {}

export default EventHub
```

编写测试用例：

```javascript
// test/index.ts

import EventHub from '../index'

// 测试 eventhub 是否正确生成
const testEventHub = (message) => {
  const eventhub = new EventHub()
  console.assert(eventhub instanceof Object === true, 'eventhub 应该是一个 object')
  console.log(message)
}

testEventHub('测试 eventhub 是否正确生成')
```

用 ts-node 运行测试：

```
ts-node test/index.ts
```


## 初步实现 on 和 emit

添加测试用例：

```javascript
// test/index.ts

// 测试 on 和 emit
const testOnAndEmit = (message) => {
  const eventhub = new EventHub()
  let called = false
  eventhub.on('test-on-emit', () => {
    called = true
  })
  eventhub.emit('test-on-emit')
  console.assert(called, 'called 应该为 true')
  console.log(message)
}

testOnAndEmit('测试 on 和 emit')
```

代码实现：

```javascript
// index.ts

class EventHub {
  callstack = {}
  on(eventname, fn) {
    if(this.callstack[eventname] === undefined) {
      this.callstack[eventname] = []
    }
    this.callstack[eventname].push(fn)
  }
  emit(eventname) {
    if(this.callstack[eventname] === undefined) return
    this.callstack[eventname].forEach((fn) => {
      fn()
    })
  }
}

export default EventHub
```


## 优化代码

```javascript
// index.ts

class EventHub {
  callstack = {}
  on(eventname, fn) {
    this.callstack[eventname] = this.callstack[eventname] || []
    this.callstack[eventname].push(fn)
  }
  emit(eventname) {
    if(this.callstack[eventname] === undefined) return
    this.callstack[eventname].forEach(fn => fn())
  }
}

export default EventHub
```


## 支持数据传递

添加测试用例：

```javascript
// test/index.ts

// 测试数据传递
const testDataTransmission = (message) => {
  const eventhub = new EventHub()
  let testdata = 0
  eventhub.on('test-data', (data) => {
    testdata = data
  })
  eventhub.emit('test-data', 100)
  console.assert(testdata === 100, 'testdata 应该等于 100')
  console.log(message)
}

testDataTransmission('测试数据传递')
```

修改 EventHub，给 emit 添加第二个参数：

```javascript
// index.ts

class EventHub {
  callstack = {}
  on(eventname, fn) {
    this.callstack[eventname] = this.callstack[eventname] || []
    this.callstack[eventname].push(fn)
  }
  emit(eventname, data) {
    if(this.callstack[eventname] === undefined) return
    this.callstack[eventname].forEach(fn => fn(data))
  }
}

export default EventHub
```

### TypeScript 的可选参数

因为给 EventHub 的 emit 添加了第二个参数，但是有时候不需要传递数据，用不到这个参数，在 TypeScript 中，调用时会报错，提示需要传入两个参数。

可以给参数添加后缀 ? 来表示这是一个可选参数：

```javascript
emit(eventname, data?) {
  if(this.callstack[eventname] === undefined) return
  this.callstack[eventname].forEach(fn => fn(data))
}
```


## 实现取消订阅 off

添加测试用例：

```javascript
// test/index.ts

// 测试 off
const testOff = (message) => {
  const eventhub = new EventHub()
  let called = false
  let fn1 = () => {
    called = true
  }
  eventhub.on('test-off', fn1)
  eventhub.off('test-off', fn1)
  eventhub.emit('test-off')
  console.assert(called === false, 'called 应该为 false')
  console.log(message)
}

testOff('测试 off')
```

给 EventHub 添加 off 方法：

```javascript
// index.ts

class EventHub {
  callstack = {}
  on(eventname, fn) {
    this.callstack[eventname] = this.callstack[eventname] || []
    this.callstack[eventname].push(fn)
  }
  emit(eventname, data?) {
    if(this.callstack[eventname] === undefined) return
    this.callstack[eventname].forEach(fn => fn(data))
  }
  off(eventname, fn) {
    if(this.callstack[eventname] === undefined || this.callstack[eventname].length === 0) return
    const i = this.callstack[eventname].indexOf(fn)
    if(i === -1) return
    this.callstack[eventname].splice(i, 1)
  }
}

export default EventHub
```


## 使用 TypeScript 完善代码

```javascript
// index.ts

class EventHub {
  private callstack: {[key: string]: Array<(data: any) => void>} = {}
  on(eventname: string, fn: (data: any) => void) {
    this.callstack[eventname] = this.callstack[eventname] || []
    this.callstack[eventname].push(fn)
  }
  emit(eventname: string, data?: any) {
    if(this.callstack[eventname] === undefined) return
    this.callstack[eventname].forEach(fn => fn(data))
  }
  off(eventname: string, fn: (data: any) => void) {
    if(this.callstack[eventname] === undefined || this.callstack[eventname].length === 0) return
    const i = this.callstack[eventname].indexOf(fn)
    if(i === -1) return
    this.callstack[eventname].splice(i, 1)
  }
}

export default EventHub
```

[查看完整的代码](https://github.com/JinChengJoker/EventHub)