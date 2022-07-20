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

创建`user`的`model`测试：

```bash
# 安装了 rspec-rails 后会自动添加钩子
# 同时创建对应的 model 文件和测试文件
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


## 测试 request

创建`items`的`request`测试：

```bash
# 仅创建测试文件
bin/rails g rspec:request items
```

在`spec/requests/items_spec.rb`中添加测试用例：

```ruby
describe "GET /items" do
  it "Get data by page" do
    # ruby 的测试用例之间没有关联
    # 这里创建的测试数据将在这个用例执行完后自动清除
    11.times do
      Item.create amount: 100
    end
    expect(Item.count).to eq(11)

    get '/api/v1/items'
    expect(response).to have_http_status(200)
    json = JSON.parse(response.body)
    expect(json['resources'].size).to eq(10)

    get '/api/v1/items?page=2'
    expect(response).to have_http_status(200)
    json = JSON.parse(response.body)
    expect(json['resources'].size).to eq(1)

    get '/api/v1/items?page=3'
    expect(response).to have_http_status(200)
    json = JSON.parse(response.body)
    expect(json['resources'].size).to eq(0)
  end

  it "Clear data" do
    # 这里可以验证是不是清除了数据
    expect(Item.count).to eq(0)
  end
end

describe 'POST /items' do
  it 'Create item' do
    expect(Item.count).to eq(0)
    post '/api/v1/items', params: {amount: 100}
    expect(response).to have_http_status(200)
    expect(Item.count).to eq(1)
    json = JSON.parse(response.body)
    expect(json['resource']['amount']).to eq(100)
  end
end
```


## 测试发送验证码

创建`validation_codes`的`request`测试：

```bash
bin/rails g rspec:request validation_codes
```

在`spec/requests/validation_codes_spec.rb`中添加测试用例：

```ruby
describe 'POST /validation_codes' do
  it 'Create validation_code' do
    expect(ValidationCode.count).to eq(0)
    post '/api/v1/validation_codes', params: {email: 'jincheng@haplox.com'}
    expect(response).to have_http_status(200)
    expect(ValidationCode.count).to eq(1)
  end
end
```

实现 validation_codes controller create 方法：

```ruby
def create
  # 生成 6 位随机数作为验证码
  code = SecureRandom.random_number.to_s[2..7]
  validation_code = ValidationCode.new email: params[:email], kind: :sign_in, code: code
  if validation_code.save
    head 200
  else
    render json: {errors: validation_code.errors}
  end
end
```


## 运行测试

```bash
bundle exec rspec
```