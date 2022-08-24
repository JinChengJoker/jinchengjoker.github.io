# AJAX

全称 Async Javascript and XML。

## 使用 XMLHttpRequest

浏览器提供了一个 `XMLHttpRequest` 方法，可以通过 `new XMLHttpRequest()` 创建一个可以发起 HTTP 请求的对象。

```javascript
let request = new XMLHttpRequest()  // 创建 HTTP 请求对象

request.open('POST', '/xxx')  // 初始化请求，默认为异步
request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
request.send('这是要发送的数据')  // 发送请求
request.onreadystatechange = () => {
  if(request.readyState === 4) {  // 请求和响应已完毕
    if(request.status >= 200 && request.status < 300) {
      console.log('请求成功')
      console.log(request.getResponseHeader('Content-Type'))
      console.log(JSON.parse(request.responseText))
    } else if(request.status >= 400) {
      console.log('请求失败')
    }
  }
}
```

在 `request` 实例中：

1. `setRequestHeader()` 可以设置 HTTP 请求头（即第二部分），但必须在 `open()` 和 `send()` 之间调用。
2. `send()` 可以设置 HTTP 请求的 body（即第四部分）。
3. `onreadystatechange` 可以监听 `readyState` 值的变化。
4. `readyState` 表示请求的 5 种状态。
  - `0` 未打开。`open()` 方法还未被调用
  - `1` 未发送。`open()` 方法已经被调用
  - `2` 已获取响应头。`send()` 方法已经被调用，响应头和响应状态已经返回
  - `3` 正在下载响应体。响应体下载中，`responseText` 中已经获取了部分数据
  - `4` 请求完成。整个请求过程已经完毕
5. `getResponseHeader()` 可以获取 HTTP 响应头。