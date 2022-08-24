# 在 NPM 上发布一个命令行工具包

以自己写的一个[命令行工具 demo](https://github.com/JinChengJoker/zy-todo)为例。

## 修改 package.json

```json
{
  "name": "zy-todo",
  "version": "0.0.1",
  "main": "index.js",
  "bin": {
    "zydo": "cli.js"
  },
  "files": [
    "*.js"
  ],
  "license": "MIT",
  "dependencies": {
    "commander": "^5.1.0",
    "inquirer": "^7.1.0"
  }
}
```

- name：必须是唯一的，不能和其他已发布的包重名。
- version：发布的包的版本号。
- main：整个包的主要逻辑文件，一般是 index.js。
- bin：如果这个包是一个命令行工具，那么最终生成的命令是什么，以及命令对应执行的文件是什么。
- files：告诉 NPM 哪些文件是有用的。


## shebang

shebang 写在某个文件的头部，用来告诉命令行用什么程序来执行这个文件。

例如我这个包是用 node 执行 cli.js 文件，那么就在 cli.js 文件头部写入：

```bash
#!/usr/bin/env node
```


## 可行性权限

在 Linux 和 Mac OS 下还需要给文件加上可执行权限：

```bash
chmod +x cli.js
```


## NPM 发布

发布包需要一个 NPM 账号。

必须使用 npm 的官方源进行发布，淘宝源不支持发布。

可以使用 nrm 来作为 npm 的源管理工具：

```bash
yarn global add nrm
```

登录 NPM：

```bash
npm adduser
```

发布：

```bash
npm publish
```