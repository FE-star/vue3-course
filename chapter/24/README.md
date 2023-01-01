# 第24课

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

## 第三步 启动(后台)全栈开发服务
  

```sh

# 启动后台-前端开发模式
npm run dev:work-front

# 启动后台-后端开发模式
npm run dev:work-server

```

## 第四步 访问页面

- 先登录 [http://127.0.0.1:8002/page/sign-in](http://127.0.0.1:8002/page/sign-in)
- 再访问物料管理页面 [http://127.0.0.1:8002/page/manage/material-list](http://127.0.0.1:8002/page/manage/material-list)
- 最后访问单独某个物料，点击“预览按钮”

