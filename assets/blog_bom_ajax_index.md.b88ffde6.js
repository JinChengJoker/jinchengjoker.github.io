import{_ as s,c as a,o as n,a as o}from"./app.26ce242b.js";const d=JSON.parse('{"title":"AJAX","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u4F7F\u7528 XMLHttpRequest","slug":"\u4F7F\u7528-xmlhttprequest"}],"relativePath":"blog/bom/ajax/index.md"}'),l={name:"blog/bom/ajax/index.md"},p=o(`<h1 id="ajax" tabindex="-1">AJAX <a class="header-anchor" href="#ajax" aria-hidden="true">#</a></h1><p>\u5168\u79F0 Async Javascript and XML\u3002</p><h2 id="\u4F7F\u7528-xmlhttprequest" tabindex="-1">\u4F7F\u7528 XMLHttpRequest <a class="header-anchor" href="#\u4F7F\u7528-xmlhttprequest" aria-hidden="true">#</a></h2><p>\u6D4F\u89C8\u5668\u63D0\u4F9B\u4E86\u4E00\u4E2A <code>XMLHttpRequest</code> \u65B9\u6CD5\uFF0C\u53EF\u4EE5\u901A\u8FC7 <code>new XMLHttpRequest()</code> \u521B\u5EFA\u4E00\u4E2A\u53EF\u4EE5\u53D1\u8D77 HTTP \u8BF7\u6C42\u7684\u5BF9\u8C61\u3002</p><div class="language-javascript"><button class="copy"></button><span class="lang">javascript</span><pre><code><span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> request </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">XMLHttpRequest</span><span style="color:#A6ACCD;">()  </span><span style="color:#676E95;">// \u521B\u5EFA HTTP \u8BF7\u6C42\u5BF9\u8C61</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">request</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">open</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">POST</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">/xxx</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)  </span><span style="color:#676E95;">// \u521D\u59CB\u5316\u8BF7\u6C42\uFF0C\u9ED8\u8BA4\u4E3A\u5F02\u6B65</span></span>
<span class="line"><span style="color:#A6ACCD;">request</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">setRequestHeader</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Content-Type</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">application/x-www-form-urlencoded</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">request</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">send</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">\u8FD9\u662F\u8981\u53D1\u9001\u7684\u6570\u636E</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)  </span><span style="color:#676E95;">// \u53D1\u9001\u8BF7\u6C42</span></span>
<span class="line"><span style="color:#A6ACCD;">request</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">onreadystatechange</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">if</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">request</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">readyState</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">===</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">4</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;">  </span><span style="color:#676E95;">// \u8BF7\u6C42\u548C\u54CD\u5E94\u5DF2\u5B8C\u6BD5</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">if</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">request</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">status</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&gt;=</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">200</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">request</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">status</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">300</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">\u8BF7\u6C42\u6210\u529F</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">request</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getResponseHeader</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Content-Type</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">))</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">JSON</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">parse</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">request</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">responseText</span><span style="color:#F07178;">))</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">else</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">if</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">request</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">status</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&gt;=</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">400</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">\u8BF7\u6C42\u5931\u8D25</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>\u5728 <code>request</code> \u5B9E\u4F8B\u4E2D\uFF1A</p><ol><li><code>setRequestHeader()</code> \u53EF\u4EE5\u8BBE\u7F6E HTTP \u8BF7\u6C42\u5934\uFF08\u5373\u7B2C\u4E8C\u90E8\u5206\uFF09\uFF0C\u4F46\u5FC5\u987B\u5728 <code>open()</code> \u548C <code>send()</code> \u4E4B\u95F4\u8C03\u7528\u3002</li><li><code>send()</code> \u53EF\u4EE5\u8BBE\u7F6E HTTP \u8BF7\u6C42\u7684 body\uFF08\u5373\u7B2C\u56DB\u90E8\u5206\uFF09\u3002</li><li><code>onreadystatechange</code> \u53EF\u4EE5\u76D1\u542C <code>readyState</code> \u503C\u7684\u53D8\u5316\u3002</li><li><code>readyState</code> \u8868\u793A\u8BF7\u6C42\u7684 5 \u79CD\u72B6\u6001\u3002</li></ol><ul><li><code>0</code> \u672A\u6253\u5F00\u3002<code>open()</code> \u65B9\u6CD5\u8FD8\u672A\u88AB\u8C03\u7528</li><li><code>1</code> \u672A\u53D1\u9001\u3002<code>open()</code> \u65B9\u6CD5\u5DF2\u7ECF\u88AB\u8C03\u7528</li><li><code>2</code> \u5DF2\u83B7\u53D6\u54CD\u5E94\u5934\u3002<code>send()</code> \u65B9\u6CD5\u5DF2\u7ECF\u88AB\u8C03\u7528\uFF0C\u54CD\u5E94\u5934\u548C\u54CD\u5E94\u72B6\u6001\u5DF2\u7ECF\u8FD4\u56DE</li><li><code>3</code> \u6B63\u5728\u4E0B\u8F7D\u54CD\u5E94\u4F53\u3002\u54CD\u5E94\u4F53\u4E0B\u8F7D\u4E2D\uFF0C<code>responseText</code> \u4E2D\u5DF2\u7ECF\u83B7\u53D6\u4E86\u90E8\u5206\u6570\u636E</li><li><code>4</code> \u8BF7\u6C42\u5B8C\u6210\u3002\u6574\u4E2A\u8BF7\u6C42\u8FC7\u7A0B\u5DF2\u7ECF\u5B8C\u6BD5</li></ul><ol start="5"><li><code>getResponseHeader()</code> \u53EF\u4EE5\u83B7\u53D6 HTTP \u54CD\u5E94\u5934\u3002</li></ol>`,9),e=[p];function t(c,r,F,y,D,A){return n(),a("div",null,e)}const i=s(l,[["render",t]]);export{d as __pageData,i as default};