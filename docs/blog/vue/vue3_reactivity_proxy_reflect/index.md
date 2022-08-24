# Vue3 响应性原理之 Proxy & Reflect

之前已经实现了`vue3`响应性系统中如何记录代码，并在需要的时候可以再次执行它们：[Vue3 响应性原理之 track & trigger](https://jinchengjoker.github.io/posts/vue/vue3_reactivity_track_trigger/)。

然而问题是现在只能手动的调用`track`和`trigger`，现在就来解决这个问题。


## 为什么 Vue3 要重写数据响应实现

在`vue`的早期版本，使用`data`选项是会存在一些响应性问题的（[看这里](https://jinchengjoker.github.io/posts/vue/vue2_data_problem/)）。

这主要是因为受限于当时`ES6`语法还并未在众多浏览器中普及，`vue`使用了兼容性更好的`Object.definePropety`和`getter/setter`来实现数据响应性。

进入`vue3`时代，随着`ES6`语法的普及，`vue`也使用`Proxy`和`Reflect`重新改写了数据响应的实现。


## Proxy 的基本用法

`Proxy`顾名思义，它可以对一个对象进行代理，允许你拦截对该对象的任何操作。

```javascript
const product = { price: 5, quantity: 2 }

const proxiedProduct = new Proxy(product, {
  get(target, key) {  // target === product
    return target[key]
  },
  set(target, key, value) {  // target === product
    target[key] = value
  }
})

console.log(proxiedProduct.quantity)  // 2

proxiedProduct.price = 10

console.log(product.price)  // 10
```

这里`get`和`set`中的`target`参数就是被代理的对象`product`。

使用`Proxy`相比于`Object.definePropety`好的其中一点在于，不需要提前声明好所有的`key`，就可以拦截对目标对象的任何操作，这样就避免了`vue`之前版本中出现的问题。


## Proxy 中 this 指向的问题

把上面的例子升级一下：

```javascript
const product = {
  price: 5,
  quantity: 2,
  get total() {
    return this.price * this.quantity
  }
}

const proxiedProduct = new Proxy(product, {
  get(target, key) {  // target === product
    return target[key]
  },
  set(target, key, value) {  // target === product
    target[key] = value
  }
})

const productA = {
  price: 10,
  quantity: 4,
  __proto__: proxiedProduct
}

console.log(productA.total)  // 10
```

实际上这里预期打印结果的应该是`productA.price * productA.quantity = 40`，但由于`get`和`set`中的`target`永远都是指向`product`，导致`total`中的`this`也总是都指向了`product`，所以结果变成了`product.price * product.quantity = 10`。

其实`get`和`set`中还提供了一个额外的参数`receiver`，它总是指向实际的调用者，在这个例子中指向的就是`productA`：

```javascript
const proxiedProduct = new Proxy(product, {
  get(target, key, receiver) {  // receiver === productA
    return target[key]
  },
  set(target, key, value, receiver) {  // receiver === productA
    target[key] = value
  }
})
```

那把这个`receiver`传递给`total`的`this`就可以了。

对于一般的函数，我们可以使用`call/bind/apply`来指定`this`绑定，但是这里的`target[key]`是一个`getter`函数，无法指定`this`。

为了更好的解决上述`this`指向的问题，需要用到`ES6`提供的`Reflect`语法。


## Reflect 的基本用法

`Reflect`对象上挂载了很多静态方法，所谓静态方法，就是和`Math.round()`这样。

其中比较常用的两个方法就是`get()`和`set()`：

```javascript
Reflect.get(product, 'quantity')  // 2
Reflect.set(product, 'price', 10)
```

它们几乎等同于：

```javascript
product['quantity']  // 2
product['price'] = 10
```

所以上面的例子可以改写为：

```javascript
const proxiedProduct = new Proxy(product, {
  get(target, key, receiver) {
    return Reflect.get(target, key)
  },
  set(target, key, value, receiver) {
    Reflect.set(target, key, value)
  }
})
```

同时`Reflect.get`和`Reflect.set`还可以接收一个额外参数，用于可能存在的`setter`和`getter`中`this`的绑定。这样就能很好的解决上述例子中，打印结果不符合预期的问题：

```javascript
const product = {
  price: 5,
  quantity: 2,
  get total() {
    return this.price * this.quantity
  }
}

const proxiedProduct = new Proxy(product, {
  get(target, key, receiver) {
    return Reflect.get(target, key, receiver)
    // or
    // return Reflect.get(...args)
  },
  set(target, key, value, receiver) {
    Reflect.set(target, key, value, receiver)
    // or
    // Reflect.set(..args)
  }
})

const productA = {
  price: 10,
  quantity: 4,
  __proto__: proxiedProduct
}

console.log(productA.total)  // 40
```

## 使用 Reflect 的原因/好处

除了上面说的使用`Reflect`可以很好的解决`this`的指向问题之外，还有另外两个好处：

1. `Reflect`提供的方法与`Proxy`提供的拦截器方法一一对应，只要是`Proxy`上的方法，就能在`Reflect`上找到对应的方法。这就让`Proxy`对象可以方便地调用对应的`Reflect`方法，完成默认行为，作为修改行为的基础，同时代码也更容易阅读和美观。

```javascript
const proxiedObj = new Proxy(obj, {
  get(target, key) {
    console.log('get', target, key)
    return Reflect.get(target, key)
  },
  set(target, key, value) {
    console.log('set', target, key, value)
    return Reflect.set(target, key, value)
  },
  deleteProperty(target, key) {
    console.log('delete' + key)
    return Reflect.deleteProperty(target, key)
  },
  has(target, key) {
    console.log('has' + key)
    return Reflect.has(target, key)
  }
})
```

2. 使用`Reflect`有些返回值更加合理。比如`Reflect.set(target, key, value, receiver)`失败时会返回`false`，不会因为报错而中断正常的代码逻辑执行。


## 结合 track & trigger

综上所述，可以封装出成一个`reactive`函数。

```javascript
function reactive(target) {
  const handler = {
    get(target, key, receiver) {
      return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
      return Reflect.set(target, key, value, receiver)
    }
  }
  return new Proxy(target, handler)
}

const product = reactive({ price: 5, quantity: 2 })
product.quantity = 4
console.log(product.quantity)  // 4
```

显而易见，我们已经完全代理/监控了对`target`的读和写，只需要在`handler.get`和`handler.set`中分别调用`track`和`trigger`即可实现目标：

```javascript
function reactive(target) {
  const handler = {
    get(target, key, receiver) {
      let result = Reflect.get(target, key, receiver)
      // call track
      return result
    },
    set(target, key, value, receiver) {
      let oldValue = target[key]
      let result = Reflect.set(target, key, value, receiver)
      if (result && oldValue != value) {
        // call trigger
      } 
      return result
    }
  }
  return new Proxy(target, handler)
}
```

## 完整的代码

以下即是`vue3`中`reactive`的实现：

```javascript
const targetMap = new WeakMap()

function track(target, key) {
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }

  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key, (dep = new Set()))
  }

  dep.add(effect)
}

function trigger(target, key) {
  const depsMap = targetMap.get(target)
  if (!depsMap) {
    return
  }

  let dep = depsMap.get(key)
  if (dep) {
    dep.forEach(effect => {
      effect()
    })
  }
}

function reactive(target) {
  const handler = {
    get(target, key, receiver) {
      let result = Reflect.get(target, key, receiver)
      track(target, key)
      return result
    },
    set(target, key, value, receiver) {
      let oldValue = target[key]
      let result = Reflect.set(target, key, value, receiver)
      if (result && oldValue !== value) {
        trigger(target, key)
      }
      return result
    }
  }
  return new Proxy(target, handler)
}

let product = reactive({ price: 5, quantity: 2 })
let total = 0

let effect = () => {
  total = product.price * product.quantity
}
effect()

console.log(total)  // 10
product.quantity = 3
console.log(total)  // 15
```

*以上例子和思路均来源于官方教程 [Vue Mastery](https://www.vuemastery.com/courses/vue-3-reactivity/proxy-and-reflect)*。