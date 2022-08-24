import{_ as s,c as a,o as n,a as l}from"./app.d5b54cdf.js";const C=JSON.parse('{"title":"\u5728 NPM \u4E0A\u53D1\u5E03\u4E00\u4E2A\u547D\u4EE4\u884C\u5DE5\u5177\u5305","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u4FEE\u6539 package.json","slug":"\u4FEE\u6539-package-json"},{"level":2,"title":"shebang","slug":"shebang"},{"level":2,"title":"\u53EF\u884C\u6027\u6743\u9650","slug":"\u53EF\u884C\u6027\u6743\u9650"},{"level":2,"title":"NPM \u53D1\u5E03","slug":"npm-\u53D1\u5E03"}],"relativePath":"blog/misc/make_npm_package/index.md"}'),p={name:"blog/misc/make_npm_package/index.md"},o=l(`<h1 id="\u5728-npm-\u4E0A\u53D1\u5E03\u4E00\u4E2A\u547D\u4EE4\u884C\u5DE5\u5177\u5305" tabindex="-1">\u5728 NPM \u4E0A\u53D1\u5E03\u4E00\u4E2A\u547D\u4EE4\u884C\u5DE5\u5177\u5305 <a class="header-anchor" href="#\u5728-npm-\u4E0A\u53D1\u5E03\u4E00\u4E2A\u547D\u4EE4\u884C\u5DE5\u5177\u5305" aria-hidden="true">#</a></h1><p>\u4EE5\u81EA\u5DF1\u5199\u7684\u4E00\u4E2A<a href="https://github.com/JinChengJoker/zy-todo" target="_blank" rel="noreferrer">\u547D\u4EE4\u884C\u5DE5\u5177 demo</a>\u4E3A\u4F8B\u3002</p><h2 id="\u4FEE\u6539-package-json" tabindex="-1">\u4FEE\u6539 package.json <a class="header-anchor" href="#\u4FEE\u6539-package-json" aria-hidden="true">#</a></h2><div class="language-json"><button class="copy"></button><span class="lang">json</span><pre><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">name</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">zy-todo</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">version</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">0.0.1</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">main</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">index.js</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">bin</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">zydo</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">cli.js</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">files</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">*.js</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">],</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">license</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">MIT</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">dependencies</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">commander</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">^5.1.0</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">inquirer</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">^7.1.0</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><ul><li>name\uFF1A\u5FC5\u987B\u662F\u552F\u4E00\u7684\uFF0C\u4E0D\u80FD\u548C\u5176\u4ED6\u5DF2\u53D1\u5E03\u7684\u5305\u91CD\u540D\u3002</li><li>version\uFF1A\u53D1\u5E03\u7684\u5305\u7684\u7248\u672C\u53F7\u3002</li><li>main\uFF1A\u6574\u4E2A\u5305\u7684\u4E3B\u8981\u903B\u8F91\u6587\u4EF6\uFF0C\u4E00\u822C\u662F index.js\u3002</li><li>bin\uFF1A\u5982\u679C\u8FD9\u4E2A\u5305\u662F\u4E00\u4E2A\u547D\u4EE4\u884C\u5DE5\u5177\uFF0C\u90A3\u4E48\u6700\u7EC8\u751F\u6210\u7684\u547D\u4EE4\u662F\u4EC0\u4E48\uFF0C\u4EE5\u53CA\u547D\u4EE4\u5BF9\u5E94\u6267\u884C\u7684\u6587\u4EF6\u662F\u4EC0\u4E48\u3002</li><li>files\uFF1A\u544A\u8BC9 NPM \u54EA\u4E9B\u6587\u4EF6\u662F\u6709\u7528\u7684\u3002</li></ul><h2 id="shebang" tabindex="-1">shebang <a class="header-anchor" href="#shebang" aria-hidden="true">#</a></h2><p>shebang \u5199\u5728\u67D0\u4E2A\u6587\u4EF6\u7684\u5934\u90E8\uFF0C\u7528\u6765\u544A\u8BC9\u547D\u4EE4\u884C\u7528\u4EC0\u4E48\u7A0B\u5E8F\u6765\u6267\u884C\u8FD9\u4E2A\u6587\u4EF6\u3002</p><p>\u4F8B\u5982\u6211\u8FD9\u4E2A\u5305\u662F\u7528 node \u6267\u884C cli.js \u6587\u4EF6\uFF0C\u90A3\u4E48\u5C31\u5728 cli.js \u6587\u4EF6\u5934\u90E8\u5199\u5165\uFF1A</p><div class="language-bash"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#676E95;">#!/usr/bin/env node</span></span>
<span class="line"></span></code></pre></div><h2 id="\u53EF\u884C\u6027\u6743\u9650" tabindex="-1">\u53EF\u884C\u6027\u6743\u9650 <a class="header-anchor" href="#\u53EF\u884C\u6027\u6743\u9650" aria-hidden="true">#</a></h2><p>\u5728 Linux \u548C Mac OS \u4E0B\u8FD8\u9700\u8981\u7ED9\u6587\u4EF6\u52A0\u4E0A\u53EF\u6267\u884C\u6743\u9650\uFF1A</p><div class="language-bash"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">chmod +x cli.js</span></span>
<span class="line"></span></code></pre></div><h2 id="npm-\u53D1\u5E03" tabindex="-1">NPM \u53D1\u5E03 <a class="header-anchor" href="#npm-\u53D1\u5E03" aria-hidden="true">#</a></h2><p>\u53D1\u5E03\u5305\u9700\u8981\u4E00\u4E2A NPM \u8D26\u53F7\u3002</p><p>\u5FC5\u987B\u4F7F\u7528 npm \u7684\u5B98\u65B9\u6E90\u8FDB\u884C\u53D1\u5E03\uFF0C\u6DD8\u5B9D\u6E90\u4E0D\u652F\u6301\u53D1\u5E03\u3002</p><p>\u53EF\u4EE5\u4F7F\u7528 nrm \u6765\u4F5C\u4E3A npm \u7684\u6E90\u7BA1\u7406\u5DE5\u5177\uFF1A</p><div class="language-bash"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">yarn global add nrm</span></span>
<span class="line"></span></code></pre></div><p>\u767B\u5F55 NPM\uFF1A</p><div class="language-bash"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">npm adduser</span></span>
<span class="line"></span></code></pre></div><p>\u53D1\u5E03\uFF1A</p><div class="language-bash"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">npm publish</span></span>
<span class="line"></span></code></pre></div>`,21),e=[o];function t(c,r,D,F,y,i){return n(),a("div",null,e)}const u=s(p,[["render",t]]);export{C as __pageData,u as default};
