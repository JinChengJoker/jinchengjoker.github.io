---
title: "Ruby on rails 之创建项目"
date: 2022-07-12T11:25:38+08:00
draft: false
---

## RubyGems

Ruby 的包（gem）管理工具。

类似于 NPM，但主要用于管理全局的 gems。

查看当前下载源：

```bash
gem sources -l
```

如果源不是 ruby-china 建议切换：

```bash
gem sources --add https://gems.ruby-china.com/ --remove https://rubygems.org/
```


## Bundler

也是 Ruby 的包（gem）管理工具。

和 RubyGems 不同的是，它主要用于管理项目局部的 gems，能够跟踪并安装所需的特定版本的 gem，以此来为 Ruby 项目提供一致的运行环境。

切换至国内源：

```bash
bundle config mirror.https://rubygems.org https://gems.ruby-china.com
```

也可以修改 Gemfile 的 source：

```
source 'https://gems.ruby-china.com'
```


## 安装 rails

这里使用 gem 全局安装 rails 并指定了版本：

```bash
gem install rails -v 7.0.2.3
```


## 安装数据库驱动包

由于数据库用的是 postgresql，所以这里安装对应的驱动包：

```bash
pacman -S postgresql-libs
```

`pacman`是`Arch Linux`用于安装软件的工具。


## 创建 rails 项目

```bash
rails new --api --database=postgresql --skip-test mangosteen-1
```

- `--api`只使用 api 模式。
- `--database=postgresql`使用 postgresql 作为数据库。
- `--skip-test`跳过测试，后续可以使用第三方测试工具。
- `mangosteen-1`项目名称并创建对应的目录。


## 启动数据库容器

**注意**是额外启动一个容器服务，而不是在已有容器环境中执行。

```bash
docker run -d \
    --name db-for-mangosteen \
    -e POSTGRES_USER=mangosteen \
    -e POSTGRES_PASSWORD=123456 \
    -e POSTGRES_DB=mangosteen_dev \
    -e PGDATA=/var/lib/postgresql/data/pgdata \
    -v mangosteen-data:/var/lib/postgresql/data \
    --network=network1 \
    postgres:14
```

- `-d`在后台持续运行容器。
- `--name db-for-mangosteen`容器的名称。
- `-e`写入环境变量。
- `-v mangosteen-data:/var/lib/postgresql/data`创建数据卷并映射，用于数据持久化。
- `--network=network1`指定要加入的网络。
- `postgres:14`指定使用的数据库容器镜像版本。

如果报错提示找不到网络，则需要先创建对应的网络：

```bash
docker network create network1
```


## 连接数据库

进入 rails 项目目录 mangosteen-1，修改`config/database.yml`文件：

```yml
development:
  <<: *default
  database: mangosteen_dev
  username: mangosteen
  password: 123456
  host: db-for-mangosteen
```


## 启动 rails 项目

这里推荐优先使用局部的 rails 版本启动：

```bash
bundle exe rails server
# 等价于
bin/rails server
```

也可以使用全局的 rails 版本启动：

```bash
rails server
```

但是有可能和局部的版本不一致，所以不推荐。