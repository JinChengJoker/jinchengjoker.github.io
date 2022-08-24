# Ruby on rails 之初体验

## 数据建模

rails 提供了数据库建模工具：

```bash
bin/rails g model user name:string email:string
```

这个命令会自动创建两个文件：一个是对应的`model`文件，一个是对应的数据库操作文件。

然后我们直接填充/修改`db/migrate`目录下对应文件中的`change`方法即可。


## 数据库操作

数据库同步：

```bash
bin/rails db:migrate
```

数据库回滚：

```bash
# 默认回滚到上一步
bin/rails db:rollback

# 可以接受回滚步数
bin/rails db:rollback step=1
```


## 创建 Controller

创建一个`users`的`controller`，并添加`create`和`show`方法：

```bash
bin/rails g controller users create show
```

这个命令同时也会帮我们创建对应的路由，但是由于不够精确和完整，所以一般都需要删掉自己重新写。


## 创建路由

在`config/routes.rb`文件中可以创建路由：

```ruby
# 创建一个 POST 请求，并对应到 users controller 的 create 方法
post '/users', to: 'users#create'

# 创建一个 GET 请求，并对应到 users controller 的 show 方法
get '/users/:id', to: 'users#show'
```


## 创建一个用户

修改 users controller 的 create 方法：

```ruby
def create
  user = User.new name: 'jincheng', email: 'jinchengjoker@foxmail.com'
  if user.save
    render json: user
  else
    render json: user.errors
  end
end
```

- `User.new`可以创建一个用户实例。
- `user.save`可以保存一个用户实例。
- `render json: user`将`user`数据`json`序列化后返回。
- `render json: user.errors`将保存`user`的错误`json`序列化后返回。


## 数据验证

在 user 的 model 文件中，可以做数据验证：

```ruby
class User < ApplicationRecord
  # 邮箱为必填项
  validates :email, presence: true
end
```


## 获取一个用户

修改 users controller 的 show 方法：

```ruby
def show
  user = User.find_by_id params[:id]
  if user
    render json: user
  else
    head 404
  end
end
```

- `User.find_by_id`可以根据`id`查找用户。
- `params[:id]`可以获取`id`参数。
- `head 404`返回 404 状态码。

注意：`ruby`会根据数据创建的字段自动新增对应的`find`方法，例如`find_by_id`、`find_by_name`、`find_by_email`等。