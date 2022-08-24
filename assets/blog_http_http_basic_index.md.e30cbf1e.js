import{_ as s,c as a,o as l,a as n}from"./app.d5b54cdf.js";const C=JSON.parse('{"title":"HTTP \u57FA\u7840\u77E5\u8BC6","description":"","frontmatter":{},"headers":[{"level":2,"title":"HTTP","slug":"http"},{"level":2,"title":"URL","slug":"url"},{"level":2,"title":"DNS","slug":"dns"},{"level":2,"title":"Hosts","slug":"hosts"},{"level":2,"title":"\u5BA2\u6237\u7AEF\u4E0E\u670D\u52A1\u5668\u7684\u57FA\u672C\u4EA4\u4E92","slug":"\u5BA2\u6237\u7AEF\u4E0E\u670D\u52A1\u5668\u7684\u57FA\u672C\u4EA4\u4E92"},{"level":2,"title":"\u53D1\u8D77\u8BF7\u6C42","slug":"\u53D1\u8D77\u8BF7\u6C42"},{"level":3,"title":"\u57FA\u672C\u683C\u5F0F","slug":"\u57FA\u672C\u683C\u5F0F"},{"level":3,"title":"curl","slug":"curl"},{"level":2,"title":"\u54CD\u5E94\u8BF7\u6C42","slug":"\u54CD\u5E94\u8BF7\u6C42"},{"level":3,"title":"\u57FA\u672C\u683C\u5F0F","slug":"\u57FA\u672C\u683C\u5F0F-1"},{"level":3,"title":"\u5E38\u89C1\u72B6\u6001\u7801","slug":"\u5E38\u89C1\u72B6\u6001\u7801"}],"relativePath":"blog/http/http_basic/index.md"}'),e={name:"blog/http/http_basic/index.md"},p=n(`<h1 id="http-\u57FA\u7840\u77E5\u8BC6" tabindex="-1">HTTP \u57FA\u7840\u77E5\u8BC6 <a class="header-anchor" href="#http-\u57FA\u7840\u77E5\u8BC6" aria-hidden="true">#</a></h1><h2 id="http" tabindex="-1">HTTP <a class="header-anchor" href="#http" aria-hidden="true">#</a></h2><p>HyperText Transfer Protocol \u8D85\u6587\u672C\u4F20\u8F93\u534F\u8BAE\uFF0C\u7528\u4E8E\u63A7\u5236\u5BA2\u6237\u7AEF\u4E0E\u670D\u52A1\u5668\u4E4B\u95F4\u5982\u4F55\u8FDB\u884C\u6C9F\u901A\u4F20\u8F93\u3002</p><h2 id="url" tabindex="-1">URL <a class="header-anchor" href="#url" aria-hidden="true">#</a></h2><p>Uniform Resource Locator \u7EDF\u4E00\u8D44\u6E90\u5B9A\u4F4D\u7B26\uFF0C\u4E5F\u88AB\u4FD7\u79F0\u4E3A\u7F51\u5740\u3002</p><p>\u4F8B\u5982\uFF1A<a href="https://www.baidu.com/s?wd=hello&amp;rsv_spt=1#5" target="_blank" rel="noreferrer">https://www.baidu.com/s?wd=hello&amp;rsv_spt=1#5</a> \u5C31\u662F\u4E00\u4E2A URL\u3002</p><p>\u5176\u4E2D\u5305\u62EC\uFF1A\u534F\u8BAE\u3001\u57DF\u540D\u3001\u8DEF\u5F84\u3001\u67E5\u8BE2\u53C2\u6570\u3001\u951A\u70B9\u548C\u7AEF\u53E3\u53F7\u3002</p><ul><li>\u57DF\u540D</li></ul><p><code>.com</code> \u4E3A\u9876\u7EA7\u57DF\u540D\uFF0C<code>baidu</code> \u4E3A\u4E8C\u7EA7\u57DF\u540D\uFF0C<code>www</code> \u4E3A\u4E09\u7EA7\u57DF\u540D\u3002</p><ul><li>\u8DEF\u5F84</li></ul><p>\u5E76\u4E0D\u5BF9\u5E94\u4EFB\u4F55\u6587\u4EF6\u3002</p><ul><li>\u7AEF\u53E3\u53F7</li></ul><p>\u4F8B\u5982\uFF1A21 \u7AEF\u53E3\u7528\u4E8E FTP \u670D\u52A1\uFF0C443 \u7AEF\u53E3\u7528\u4E8E HTTPS \u670D\u52A1\uFF0C1080 \u7AEF\u53E3\u7528\u4E8E\u4EE3\u7406\u670D\u52A1\uFF0C3306 \u7AEF\u53E3\u7528\u4E8E MySQL \u670D\u52A1\uFF0C80 \u7AEF\u53E3\u7528\u4E8E HTTP \u670D\u52A1\u3002</p><h2 id="dns" tabindex="-1">DNS <a class="header-anchor" href="#dns" aria-hidden="true">#</a></h2><p>Domain Name System \u57DF\u540D\u7CFB\u7EDF\uFF0C\u7528\u4E8E\u5C06\u57DF\u540D\u89E3\u6790\u4E3A\u5BF9\u5E94\u7684 IP\u3002</p><p>\u53EF\u4EE5\u4F7F\u7528 <code>nslookup</code> \u5DE5\u5177\u67E5\u8BE2\u5BF9\u5E94\u7684 IP\u3002</p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">nslookup www.baidu.com</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h2 id="hosts" tabindex="-1">Hosts <a class="header-anchor" href="#hosts" aria-hidden="true">#</a></h2><p>\u66F4\u6539 hosts \u6587\u4EF6\u53EF\u4EE5\u6307\u5B9A\u4EFB\u610F\u57DF\u540D\u7684 IP\u3002</p><h2 id="\u5BA2\u6237\u7AEF\u4E0E\u670D\u52A1\u5668\u7684\u57FA\u672C\u4EA4\u4E92" tabindex="-1">\u5BA2\u6237\u7AEF\u4E0E\u670D\u52A1\u5668\u7684\u57FA\u672C\u4EA4\u4E92 <a class="header-anchor" href="#\u5BA2\u6237\u7AEF\u4E0E\u670D\u52A1\u5668\u7684\u57FA\u672C\u4EA4\u4E92" aria-hidden="true">#</a></h2><p>\u5BA2\u6237\u7AEF\u4E0E\u670D\u52A1\u5668\u4E4B\u95F4\u4F7F\u7528 HTTP\u3002</p><ol><li>\u5BA2\u6237\u7AEF\u6D4F\u89C8\u5668\u8F93\u5165 URL</li><li>\u901A\u8FC7 DNS \u89E3\u6790\uFF0C\u83B7\u53D6 IP \u5730\u5740</li><li>\u8BF7\u6C42\u8BE5 IP \u5730\u5740 80 \u7AEF\u53E3</li><li>\u8FDB\u884C TCP \u7684\u4E09\u6B21\u63E1\u624B</li><li>\u670D\u52A1\u5668\u54CD\u5E94</li><li>\u6D4F\u89C8\u5668\u63A5\u53D7\u4E0B\u8F7D\u6570\u636E</li></ol><h2 id="\u53D1\u8D77\u8BF7\u6C42" tabindex="-1">\u53D1\u8D77\u8BF7\u6C42 <a class="header-anchor" href="#\u53D1\u8D77\u8BF7\u6C42" aria-hidden="true">#</a></h2><h3 id="\u57FA\u672C\u683C\u5F0F" tabindex="-1">\u57FA\u672C\u683C\u5F0F <a class="header-anchor" href="#\u57FA\u672C\u683C\u5F0F" aria-hidden="true">#</a></h3><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">\u7B2C1\u90E8\u5206\uFF1A\u52A8\u8BCD \u8DEF\u5F84 \u534F\u8BAE/\u7248\u672C\u53F7</span></span>
<span class="line"><span style="color:#A6ACCD;">\u7B2C2\u90E8\u5206\uFF1AKey: value</span></span>
<span class="line"><span style="color:#A6ACCD;">...</span></span>
<span class="line"><span style="color:#A6ACCD;">\u7B2C2\u90E8\u5206\uFF1AKey: value</span></span>
<span class="line"><span style="color:#A6ACCD;">\u7B2C3\u90E8\u5206\uFF1A</span></span>
<span class="line"><span style="color:#A6ACCD;">\u7B2C4\u90E8\u5206\uFF1A\u8981\u4E0A\u4F20\u7684\u6570\u636E</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><ul><li>\u8BF7\u6C42\u6700\u591A\u5305\u542B\u56DB\u90E8\u5206\uFF0C\u6700\u5C11\u5305\u542B\u4E09\u90E8\u5206\uFF08\u7B2C\u56DB\u90E8\u5206\u53EF\u4EE5\u4E3A\u7A7A\uFF09\u3002</li><li>\u5E38\u7528\u52A8\u8BCD\u6709 GET\u3001POST\u3001PUT\uFF08\u6574\u4F53\u66F4\u65B0\uFF09\u3001PATCH\uFF08\u5C40\u90E8\u66F4\u65B0\uFF09\u548C DELETE\u3002</li><li>\u5982\u679C\u6CA1\u6709\u8DEF\u5F84\uFF0C\u90A3\u4E48\u8DEF\u5F84\u9ED8\u8BA4\u4E3A <code>/</code>\u3002</li><li>\u8DEF\u5F84\u5305\u62EC\u67E5\u8BE2\u53C2\u6570\uFF0C\u4F46\u4E0D\u5305\u62EC\u951A\u70B9\u3002</li><li>\u7B2C 2 \u90E8\u5206\u4E2D\u7684 <code>Content-Type</code> \u6807\u6CE8\u4E86\u7B2C 4 \u90E8\u5206\u7684\u683C\u5F0F\u3002</li><li>\u7B2C 3 \u90E8\u5206\u6C38\u8FDC\u90FD\u662F\u4E00\u4E2A\u56DE\u8F66\uFF08\\n\uFF09\u3002</li></ul><h3 id="curl" tabindex="-1">curl <a class="header-anchor" href="#curl" aria-hidden="true">#</a></h3><p>\u4F7F\u7528 <code>curl</code> \u5DE5\u5177\u53EF\u4EE5\u53D1\u8D77\u8BF7\u6C42\u3002</p><p>\u53C2\u6570 <code>-s</code> \u8868\u793A\u4E0D\u663E\u793A\u8FDB\u5EA6\u6761\uFF0C\u53C2\u6570 <code>-v</code> \u8868\u793A\u540C\u65F6\u663E\u793A\u8BF7\u6C42\u548C\u54CD\u5E94\uFF0C\u53C2\u6570 <code>-H</code> \u8868\u793A\u6DFB\u52A0\u8BF7\u6C42\u5934\uFF0C\u53C2\u6570 <code>-X</code> \u8868\u793A\u6307\u5B9A\u8BF7\u6C42\u52A8\u8BCD\uFF0C\u53C2\u6570 <code>-d</code> \u8868\u793A\u4F20\u8F93\u7684\u6570\u636E\u3002</p><ul><li>\u53D1\u8D77 GET \u8BF7\u6C42\uFF1A</li></ul><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">// \u9ED8\u8BA4\u4E3A GET \u8BF7\u6C42</span></span>
<span class="line"><span style="color:#A6ACCD;">curl -s -v -H &quot;Hello: xxx&quot; -- &quot;https://www.baidu.com&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// \u8BF7\u6C42\u7684\u5185\u5BB9</span></span>
<span class="line"><span style="color:#A6ACCD;">GET / HTTP/1.1</span></span>
<span class="line"><span style="color:#A6ACCD;">Host: www.baidu.com</span></span>
<span class="line"><span style="color:#A6ACCD;">User-Agent: curl/7.54.0</span></span>
<span class="line"><span style="color:#A6ACCD;">Accept: */*</span></span>
<span class="line"><span style="color:#A6ACCD;">Hello: xxx</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><ul><li>\u53D1\u8D77 POST \u8BF7\u6C42\uFF1A</li></ul><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">curl -X POST -d &quot;1234567890&quot; -s -v -H &quot;Hello: xxx&quot; -- &quot;https://www.baidu.com&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// \u8BF7\u6C42\u7684\u5185\u5BB9</span></span>
<span class="line"><span style="color:#A6ACCD;">POST / HTTP/1.1</span></span>
<span class="line"><span style="color:#A6ACCD;">Host: www.baidu.com</span></span>
<span class="line"><span style="color:#A6ACCD;">User-Agent: curl/7.54.0</span></span>
<span class="line"><span style="color:#A6ACCD;">Accept: */*</span></span>
<span class="line"><span style="color:#A6ACCD;">Hello: xxx</span></span>
<span class="line"><span style="color:#A6ACCD;">Content-Length: 10</span></span>
<span class="line"><span style="color:#A6ACCD;">Content-Type: application/x-www-form-urlencoded</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">1234567890</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h2 id="\u54CD\u5E94\u8BF7\u6C42" tabindex="-1">\u54CD\u5E94\u8BF7\u6C42 <a class="header-anchor" href="#\u54CD\u5E94\u8BF7\u6C42" aria-hidden="true">#</a></h2><h3 id="\u57FA\u672C\u683C\u5F0F-1" tabindex="-1">\u57FA\u672C\u683C\u5F0F <a class="header-anchor" href="#\u57FA\u672C\u683C\u5F0F-1" aria-hidden="true">#</a></h3><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">\u7B2C1\u90E8\u5206\uFF1A\u534F\u8BAE/\u7248\u672C\u53F7 \u72B6\u6001\u7801 \u72B6\u6001\u89E3\u91CA</span></span>
<span class="line"><span style="color:#A6ACCD;">\u7B2C2\u90E8\u5206\uFF1AKey: value</span></span>
<span class="line"><span style="color:#A6ACCD;">...</span></span>
<span class="line"><span style="color:#A6ACCD;">\u7B2C2\u90E8\u5206\uFF1AKey: value</span></span>
<span class="line"><span style="color:#A6ACCD;">\u7B2C3\u90E8\u5206\uFF1A</span></span>
<span class="line"><span style="color:#A6ACCD;">\u7B2C4\u90E8\u5206\uFF1A\u8981\u4F20\u8F93\u7684\u6570\u636E</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><ul><li>\u7B2C 2 \u90E8\u5206\u4E2D\u7684 <code>Content-Type</code> \u6807\u6CE8\u4E86\u7B2C 4 \u90E8\u5206\u7684\u683C\u5F0F\u3002</li><li>\u7B2C 3 \u90E8\u5206\u6C38\u8FDC\u90FD\u662F\u4E00\u4E2A\u56DE\u8F66\uFF08\\n\uFF09\u3002</li></ul><h3 id="\u5E38\u89C1\u72B6\u6001\u7801" tabindex="-1">\u5E38\u89C1\u72B6\u6001\u7801 <a class="header-anchor" href="#\u5E38\u89C1\u72B6\u6001\u7801" aria-hidden="true">#</a></h3><p>2xx \u6210\u529F\u30013xx \u91CD\u5B9A\u5411\u30014xx \u5BA2\u6237\u7AEF\u9519\u8BEF\u30015xx \u670D\u52A1\u5668\u9519\u8BEF</p><ul><li>200 \u8BF7\u6C42\u5DF2\u6210\u529F\uFF0C\u8BF7\u6C42\u6240\u5E0C\u671B\u7684\u54CD\u5E94\u5934\u6216\u6570\u636E\u4F53\u5C06\u968F\u6B64\u54CD\u5E94\u8FD4\u56DE\u3002</li><li>201 \u8BF7\u6C42\u5DF2\u7ECF\u88AB\u5B9E\u73B0\uFF0C\u800C\u4E14\u6709\u4E00\u4E2A\u65B0\u7684\u8D44\u6E90\u5DF2\u7ECF\u4F9D\u636E\u8BF7\u6C42\u7684\u9700\u8981\u800C\u521B\u5EFA\u3002</li><li>301 \u88AB\u8BF7\u6C42\u7684\u8D44\u6E90\u5DF2\u6C38\u4E45\u79FB\u52A8\u5230\u65B0\u4F4D\u7F6E\uFF0C\u53EF\u4EE5\u5728\u54CD\u5E94\u7684\u7B2C 2 \u90E8\u5206\u7684 Location \u4E2D\u8FD4\u56DE\u65B0\u7684\u6C38\u4E45\u6027\u7684 URI \u3002</li><li>302 \u88AB\u8BF7\u6C42\u7684\u8D44\u6E90\u6682\u65F6\u4E0D\u5B58\u5728\uFF0C\u53EF\u4EE5\u5728\u54CD\u5E94\u7684\u7B2C 2 \u90E8\u5206\u7684 Location \u4E2D\u8FD4\u56DE\u4E34\u65F6\u7684 URI\u3002</li><li>304 \u8D44\u6E90\u672A\u88AB\u4FEE\u6539\uFF0C\u7531\u4E8E\u5BA2\u6237\u7AEF\u4ECD\u7136\u5177\u6709\u4EE5\u524D\u4E0B\u8F7D\u7684\u526F\u672C\uFF0C\u56E0\u6B64\u4E0D\u9700\u8981\u91CD\u65B0\u4F20\u8F93\u8D44\u6E90\u3002</li><li>404 \u8BF7\u6C42\u5931\u8D25\uFF0C\u8BF7\u6C42\u6240\u5E0C\u671B\u5F97\u5230\u7684\u8D44\u6E90\u672A\u88AB\u5728\u670D\u52A1\u5668\u4E0A\u53D1\u73B0\u3002</li><li>500 \u670D\u52A1\u5668\u901A\u7528\u9519\u8BEF\u6D88\u606F\uFF0C\u6CA1\u6709\u7ED9\u51FA\u5177\u4F53\u9519\u8BEF\u4FE1\u606F\u3002</li><li>502 \u65E0\u6CD5\u4ECE\u670D\u52A1\u5668\u63A5\u6536\u5230\u54CD\u5E94\u3002</li></ul>`,40),o=[p];function c(t,i,r,d,h,u){return l(),a("div",null,o)}const y=s(e,[["render",c]]);export{C as __pageData,y as default};
