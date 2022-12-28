# 第22课

## 第一步 安装依赖

```sh
# 使用 pnpm 来管理项目
pnpm i
```

## 第二步 多模块Demo演示

```sh
cd ./packages/mock-cdn

npm run serve
```


访问多种模块化页面
- [http://127.0.0.1:7001/demos/esm/](http://127.0.0.1:7001/demos/esm/)
- [http://127.0.0.1:7001/demos/amd/](http://127.0.0.1:7001/demos/amd/)
- [http://127.0.0.1:7001/demos/iife/](http://127.0.0.1:7001/demos/iife/)

## 第三步 搭建平台-前台多模块Demo演示

```sh

# 启动前台-后端开发模式
npm run dev:portal-server

# 启动前台-前端开发模式
npm run dev:portal-front
```

编译本地两个物料组件 `packages/material-banner-slides` 和 `packages/material-product-list`

```sh
npm run build:materials
```

访问实际物料组装页面
- [http://127.0.0.1:6002/demo/esm](http://127.0.0.1:6002/demo/esm)
- [http://127.0.0.1:6002/demo/amd](http://127.0.0.1:6002/demo/amd)
- [http://127.0.0.1:6002/demo/iife](http://127.0.0.1:6002/demo/iife)


## 其他

独立开发 `packages/material-banner-slides`

```sh
npm run dev:banner
```


独立开发 `packages/material-product-list`
```sh
npm run dev:products
```

> 注意：开发完后，需要将对应组件提升版本，然后再执行 npm run build:materials 来重新构建新版本物料。