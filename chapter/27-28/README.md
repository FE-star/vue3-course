# 第27-28课

## 开发模式

### 第一步 安装依赖

```sh
# 使用 pnpm 来管理项目
pnpm i
```

### 第二步 初始化数据库

修改 `.env` 文件的数据库账户和密码

```sh
npm run db:init
```

### 第三步 启动(后台)全栈开发服务
  

```sh

# 启动后台-前端开发模式
npm run dev:work-front

# 启动后台-后端开发模式
npm run dev:work-server

```

### 第四步 访问页面

- 先登录 [http://127.0.0.1:8002/page/sign-in](http://127.0.0.1:8002/page/sign-in)
- 生产模式页面管理功能 [http://127.0.0.1:8002/page/manage/page-list](http://127.0.0.1:8002/page/manage/page-list)
  - 进行页面编辑或者页面发布
  - 然后进入“页面发布流程”


## 生产模式

### 第一步 安装依赖

```sh
# 使用 pnpm 来管理项目
pnpm i
```


### 第二步 启动(后台)全栈项目生产模式
  

```sh
 
# 启动后台-生产模式
npm run start:work

```

### 第三步 访问生产模式页面

- 生产模式登录 [http://127.0.0.1:8001/page/sign-in](http://127.0.0.1:8001/page/sign-in)
- 生产模式页面管理功能 [http://127.0.0.1:8001/page/manage/page-list](http://127.0.0.1:8001/page/manage/page-list)
  - 进行页面编辑或者页面发布
  - 然后进入“页面发布流程”


## 其他

### 物料组件开发


独立开发 `packages/material-banner-slides`

```sh
npm run dev:banner
```


独立开发 `packages/material-product-list`
```sh
npm run dev:products
```

> 注意：开发完后，需要将对应组件提升版本，然后再执行 npm run build:materials 来重新构建新版本物料。


### 组件库开发

### 基础组件开发模式

```sh
# 开发模式
npm run dev:components
```

### 业务组件开发模式

```sh
# 开发模式
npm run dev:business
```


 