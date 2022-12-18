# 第21课

## 第一步 安装依赖

```sh
# 使用 pnpm 来管理项目
pnpm i
```

## 第二步 初始化数据库

修改 `.env` 文件的数据库账户和密码


```sh
npm run db:init
```

## 第三步 启动全栈开发服务


- 前端项目 启动开发模式

```sh
npm run dev:work-front
```

- 服务端项目 启动开发模式

```sh
npm run dev:work-server
```


### 第四步 访问页面

- 主页 [http://127.0.0.1:8002/](http://127.0.0.1:8002/)
- 注册页面 [http://127.0.0.1:8002/page/sign-up](http://127.0.0.1:8002/page/sign-up)
- 登录页面 [http://127.0.0.1:8002/page/sign-in](http://127.0.0.1:8002/page/sign-in)
