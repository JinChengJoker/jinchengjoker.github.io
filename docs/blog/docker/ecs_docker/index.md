# 云服务器安装 Docker

## 购买云服务器

阿里云、腾讯云、华为云任选。

*下面以`Linux`系统选择`Ubuntu 20`版本为例。*


## 配置端口

以阿里云为例，在服务器实例的安全组配置中可以配置端口。

推荐开启一些测试端口，例如`3000`、`3001`、`8000`等。

但是`80`和`443`端口比较特殊，如果开启后则需要备案。


## 登录到云服务器

第一次使用`root`用户登录：

```bash
# 后面是服务器的公网 ip
# 建议在创建服务器实例的时候添加 ssh-key，这样每次登录就不需要输入密码
ssh root@120.25.169.68
```


## 添加用户和组

添加用户：

```bash
adduser jincheng
# 会同时创建 jincheng 用户和 jincheng 组
```

拷贝`/root/.ssh`目录到`jincheng`用户目录下，目的是需要目录里的`authorized_keys`文件用于登录：

```bash
cp -r /root/.ssh /home/jincheng/
```

修改目录所有权：

```bash
# -R 表示递归
# jincheng:jincheng 对应 username:group
chown -R jincheng:jincheng /home/jincheng/.ssh
```

然后就可以使用`jincheng`用户登录：

```bash
ssh jincheng@120.25.169.68
```


## 安装 Docker

这里要以`root`用户安装。

安装参考[Install Docker Engine on Ubuntu](https://docs.docker.com/engine/install/ubuntu/)。

`apt-get`是`Ubuntu`安装软件的工具。

安装完成后，需要将使用`Docker`的用户添加至`docker`组：

```bash
adduser jincheng docker
```

这样`jincheng`用户就可以使用`Docker`了。