---
title: "Ruby on rails 之创建路由"
date: 2022-07-18T19:01:20+08:00
draft: false
---

## 快速创建路由

`rails`提供了快速创建路由的方式，我们只需要在`config/routes.rb`文件中写好结构，就可以自动生成对应的路由。

```ruby
namespace :api do
  namespace :v1 do
    resources :validation_codes, only: [:create]
    resource :session, only: [:create, :destory]
    resource :me, only: [:show]
    resources :items
    resources :tags
  end
end
```

1. 这里用了两层`namespace`来规范路由和版本控制，即所有的路由都会以`/api/v1`开头。
2. `:api`这种前面带冒号的表示是一种简单字符串，没有任何其他的功能，仅仅只是一个字符串而已。
3. `resource`代表对应的资源名称，如果是复数资源那么就要使用`resources`。
4. `only`表示这个路由只需要特定的方法，不指定则默认拥有所有方法。一共有`index`、`create`、`show`、`update`、`destory`五种方法。
5. 对应的还有`exclude`代表不需要的方法。

然后我们可以通过`rails`提供的命令查看所有的路由及对应的方法：

```bash
bin/rails routes
```


## 创建 validation_codes Table

数据建模：

```bash
# 创建 model 的时候 ValidationCode 不需要复数。
bin/rails g model ValidationCode email:string kind:string used_at:datetime
```

完善`db/migrate`中对应的`change`方法：

```ruby
def change
  create_table :validation_codes do |t|
    t.string :email
    t.integer :kind, default: 1, null: false
    t.string code, limit: 100
    t.datetime :used_at

    t.timestamps
  end
end
```

前进数据库：

```bash
bin/rails db:migrate
```


## 创建 validation_codes Controller

```bash
# 前面创建的路由结构做了版本控制规范，所以这里创建的时候最好与其对应
# 且只需要 create 方法
bin/rails g controller Api::V1::validation_codes create
```

*注意：这条命令同时也会创建一条路由，需要手动删除。*