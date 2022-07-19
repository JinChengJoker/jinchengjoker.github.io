---
title: "Ruby on rails 之分页"
date: 2022-07-19T11:18:46+08:00
draft: false
---

## 创建 items Table

数据建模：

```bash
bin/rails g model item user_id:bigint amount:integer note:text tags_id:bigint happend_at:datetime
```

完善`db/migrate`中对应的`change`方法：

```ruby
def change
  create_table :items do |t|
    t.bigint :user_id
    t.integer :amount
    t.text :note
    t.bigint :tags_id, array: true
    t.datetime :happend_at

    t.timestamps
  end
end
```

前进数据库：

```bash
bin/rails db:migrate
```


## 创建 items Controller

```bash
bin/rails g controller Api::V1::items
```

添加 items Controller 的`create`方法：

```ruby
def create
  item = Item.new amount: 1
  if item.save
    render json: {resource: item}
  else
    render json: {errors: item.errors}
  end
end
```


## 使用第三方库进行分页

这里推荐两个第三方分页库 [kaminari](https://github.com/kaminari/kaminari) 和 [pagy](https://github.com/ddnexus/pagy)。

安装`kaminari`，在`Gemfile`文件中添加：

```
gem 'kaminari'
```

安装依赖：

```bash
bundle
# or
bundle install

# 当下载太慢时，可以查看下载过程、检查下载源
bundle --verbose
```

*安装完成后可能需要重启服务。*

添加 items Controller 的`index`方法：

```ruby
def index
  # 获取第一页的数据
  items = Item.page(1)
  render json: {resources: items}
end
```

`kaminari`默认是 25 条数据为一页，可以对其进行配置。

生成配置文件：

```bash
bin/rails g kaminari:config
```

修改配置文件`kaminari_config.rb`：

```ruby
config.default_per_page = 10
```

获取`page`参数：

```ruby
def index
  items = Item.page(params[:page])
  render json: {resources: items}
end
```

单独指定每页的数量：

```ruby
def index
  items = Item.page(params[:page]).per(20)
  render json: {resources: items}
end
```

返回分页信息：

```ruby
def index
  items = Item.page(params[:page]).per(20)
  render json: {
    resources: items,
    pager: {
      page: params[:page],
      per_page: 20,
      count: Item.count
    }
  }
end
```