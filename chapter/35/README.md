# 第35课

## 多进程启动 后台服务

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


### 第三部 启动后台多进程服务 （生产模式）

```sh
# 启动后台-全栈生产模式 多进程
npm run start:work-process
``` 


## 生产模式

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


### 第三部 启动平台所有服务（生产模式）

```sh
# 启动后台-全栈生产模式
npm run start:work
```
```sh
# 启动前台-全栈生产模式
npm run start:portal
```


### 第四步 访问页面

- 先登录 [http://127.0.0.1:8001/page/sign-in](http://127.0.0.1:8001/page/sign-in)
- 生产模式页面管理功能 [http://127.0.0.1:8001/page/manage/page-list](http://127.0.0.1:8001/page/manage/page-list)
  - 进行页面编辑或者页面发布
  - 然后进入“页面发布流程”
- 根据页面uuid访问前台页面  `http://127.0.0.1:6001/p/${uuid}`
- 访问图片懒加载demo  [http://127.0.0.1:6001/demo/lazyload-image](http://127.0.0.1:6001/demo/lazyload-image)


## 测试

### 单元测试

```sh
npm run test
```

### 基准测试

```sh
npm run test:bench
```

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

### 第三步 启动平台开发模式


```sh

# 启动后台-前端开发模式
npm run dev:work-front

# 启动后台-后端开发模式
npm run dev:work-server

# 启动前台-前端开发模式
npm run dev:portal-front

# 启动前台-后端开发模式
npm run dev:portal-server

```


### 第四步 访问开发模式页面

- 先登录 [http://127.0.0.1:8002/page/sign-in](http://127.0.0.1:8002/page/sign-in)
- 生产模式页面管理功能 [http://127.0.0.1:8002/page/manage/page-list](http://127.0.0.1:8002/page/manage/page-list)
  - 进行页面编辑或者页面发布
  - 然后进入“页面发布流程”
- 根据页面uuid访问前台页面  `http://127.0.0.1:6002/p/${uuid}`
- 访问图片懒加载demo  [http://127.0.0.1:6001/demo/lazyload-image](http://127.0.0.1:6002/demo/lazyload-image)


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


 