---
title: "CORS 跨域资源共享"
date: 2018-07-04T18:46:17+08:00
---

## 同源策略

因为安全问题，浏览器规定：只有在 **协议、域名、端口号** 一模一样的情况下，才可以通过 **AJAX** 发送请求。

**那为什么 `form` 没有跨域问题？**

因为用 `form` 发请求会刷新或离开当前页面，且用 `form` 提交到另一个域名之后，原页面的脚本无法获取新页面中的内容。

所以浏览器认为这是安全的。

实际上用 `<a>`、`<img>`、`<link>`、`<script>` 这些标签都可以发起请求，且都没有同源策略的限制。

而 AJAX 是可以直接读取响应内容的，因此浏览器不允许这样做。


## CORS

全称 Cross-Origin Resource Sharing

虽然浏览器制定了同源策源，但是我们可以通过 CORS 来突破它，即跨域。

在服务器的响应中添加：

```javascript
response.setHeader('Access-Control-Allow-Origin', 'http://xxx')
// 或者
response.setHeader('Access-Control-Allow-Origin', '*')
```