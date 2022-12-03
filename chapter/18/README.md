# 第18课

## 快速启动

```sh
# 使用 pnpm 来管理项目
pnpm i
```

## 前后端分离项目 - 开发模式

### 前端项目启动

```sh
npm run dev:work-front
```

### 后端项目启动

```sh
npm run dev:work-server
```



### 访问页面

浏览器访问 [http://127.0.0.1:8002/](http://127.0.0.1:8002/)


## 前后端分离项目 - 生产模式

### 前端项目编译

```sh
npm run build:work-front
```


### 后端项目编译

```sh
npm run build:work-server
```

### 编译结果

前后端项目编译结果统一在 `packages/work-server/dist` 中生成。

可以通过下述操作执行编译后的全栈项目产物

```sh
cd packages/work-server/dist

node index.cjs
```


### 访问页面

浏览器访问 [ http://127.0.0.1:8001](http://127.0.0.1:8001)

> 注意：这里端口号和开发模式的不一样



 