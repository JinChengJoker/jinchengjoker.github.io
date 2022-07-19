---
title: "Ruby on rails 之单元测试"
date: 2022-07-19T19:36:01+08:00
draft: true
---

## 安装测试框架

这里使用第三方测试框架 [rspec-rails](https://github.com/rspec/rspec-rails)。

将`rspec-rails`添加到`Gemfile`文件的`:development`组和`:test`组中：

```
group :development, :test do
  gem 'rspec-rails', '~> 5.0.0'
end
```

执行安装：

```bash
bundle
# or
bundle install
```

初始化（创建模板配置文件）：

```bash
bin/rails generate rspec:install
```


## 创建测试数据库

修改`config/database.yml`文件：

```yml
test:
  <<: *default
  database: mangosteen_test
  username: mangosteen
  password: 123456
  host: db-for-mangosteen
```

在测试环境下创建数据库和数据表：

```bash
# 创建数据库
RAILS_ENV=test bin/rails db:create

# 创建数据表
RAILS_ENV=test bin/rails db:migrate
```


## 测试 model

创建`user model`的测试：

```bash
# 创建对应的 model 文件和测试文件
bin/rails g model user

# or 仅创建测试文件
bin/rails g rspec:model user
```

在`spec/models`中可以找到刚才创建的文件`user_spec.rb`：

```ruby
# 一些通用的帮助办法可以写在 rails_helper 里（例如登录）
# 然后在这里引用
require 'rails_helper'
```

添加一个测试用例：

```ruby
RSpec.describe User, type: :model do
  it '有 email' do
    user = User.new email: 'jincheng@haplox.com'
    expect(user.email).to eq 'jincheng@haplox.com'
  end
end
```

运行测试：

```bash
bundle exec rspec
```