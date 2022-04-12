---
title: "HTTP 基础知识"
date: 2018-05-13T17:09:20+08:00
---

## HTTP

HyperText Transfer Protocol 超文本传输协议，用于控制客户端与服务器之间如何进行沟通传输。

## URL

Uniform Resource Locator 统一资源定位符，也被俗称为网址。

例如：https://www.baidu.com/s?wd=hello&rsv_spt=1#5 就是一个 URL。

其中包括：协议、域名、路径、查询参数、锚点和端口号。

- 域名  
    `.com` 为顶级域名，`baidu` 为二级域名，`www` 为三级域名。
- 路径  
    并不对应任何文件。
- 端口号  
    例如：21 端口用于 FTP 服务，443 端口用于 HTTPS 服务，1080 端口用于代理服务，3306 端口用于 MySQL 服务，80 端口用于 HTTP 服务。

## DNS

Domain Name System 域名系统，用于将域名解析为对应的 IP。

可以使用 `nslookup` 工具查询对应的 IP。

```
nslookup www.baidu.com
```

## Hosts

更改 hosts 文件可以指定任意域名的 IP。

## 客户端与服务器的基本交互

客户端与服务器之间使用 HTTP。

1. 客户端浏览器输入 URL
2. 通过 DNS 解析，获取 IP 地址
3. 请求该 IP 地址 80 端口
4. 进行 TCP 的三次握手
5. 服务器响应
6. 浏览器接受下载数据

## 发起请求

### 基本格式

```
第1部分：动词 路径 协议/版本号
第2部分：Key: value
第2部分：Key: value
第2部分：Key: value
    ...
第3部分：
第4部分：要上传的数据
```

- 请求最多包含四部分，最少包含三部分（第四部分可以为空）。
- 常用动词有 GET、POST、PUT（整体更新）、PATCH（局部更新）和 DELETE。
- 如果没有路径，那么路径默认为 `/`。
- 路径包括查询参数，但不包括锚点。
- 第 2 部分中的 `Content-Type` 标注了第 4 部分的格式。
- 第 3 部分永远都是一个回车（\n）。


### curl

使用 `curl` 工具可以发起请求。

参数 `-s` 表示不显示进度条，参数 `-v` 表示同时显示请求和响应，参数 `-H` 表示添加请求头，参数 `-X` 表示指定请求动词，参数 `-d` 表示传输的数据。

- 发起 GET 请求：  
    ```
    // 默认为 GET 请求
    curl -s -v -H "Hello: xxx" -- "https://www.baidu.com"
    
    // 请求的内容
    GET / HTTP/1.1
    Host: www.baidu.com
    User-Agent: curl/7.54.0
    Accept: */*
    Hello: xxx
    
    ```
- 发起 POST 请求：  
    ```
    curl -X POST -d "1234567890" -s -v -H "Hello: xxx" -- "https://www.baidu.com"
    
    // 请求的内容
    POST / HTTP/1.1
    Host: www.baidu.com
    User-Agent: curl/7.54.0
    Accept: */*
    Hello: xxx
    Content-Length: 10
    Content-Type: application/x-www-form-urlencoded
    
    1234567890
    ```

## 响应请求

### 基本格式

```
第1部分：协议/版本号 状态码 状态解释
第2部分：Key: value
第2部分：Key: value
第2部分：Key: value
    ...
第3部分：
第4部分：要传输的数据
```

- 第 2 部分中的 `Content-Type` 标注了第 4 部分的格式。
- 第 3 部分永远都是一个回车（\n）。

### 常见状态码

2xx 成功、3xx 重定向、4xx 客户端错误、5xx 服务器错误

- 200 请求已成功，请求所希望的响应头或数据体将随此响应返回。
- 201 请求已经被实现，而且有一个新的资源已经依据请求的需要而创建。
- 301 被请求的资源已永久移动到新位置，可以在响应的第 2 部分的 Location 中返回新的永久性的 URI 。
- 302 被请求的资源暂时不存在，可以在响应的第 2 部分的 Location 中返回临时的 URI。
- 304 资源未被修改，由于客户端仍然具有以前下载的副本，因此不需要重新传输资源。
- 404 请求失败，请求所希望得到的资源未被在服务器上发现。
- 500 服务器通用错误消息，没有给出具体错误信息。
- 502 无法从服务器接收到响应。


## 同源策略

因为安全问题，浏览器规定：只有在 **协议、域名、端口号** 一模一样的情况下，才可以通过 **AJAX** 发送请求。

**那为什么 `form` 没有跨域问题？**

因为用 `form` 发请求会刷新或离开当前页面，且用 `form` 提交到另一个域名之后，原页面的脚本无法获取新页面中的内容。

所以浏览器认为这是安全的。

实际上用 `<a>`、`<img>`、`<link>`、`<script>` 这些标签都可以发起请求，且都没有同源策略的限制。

而 AJAX 是可以直接读取响应内容的，因此浏览器不允许这样做。


## CORS（跨域资源共享）

全称 Cross-Origin Resource Sharing

虽然浏览器制定了同源策源，但是我们可以通过 CORS 来突破它，即跨域。

在服务器的响应中添加：

```javascript
response.setHeader('Access-Control-Allow-Origin', 'http://xxx')
// 或者四海皆兄弟
response.setHeader('Access-Control-Allow-Origin', '*')
```