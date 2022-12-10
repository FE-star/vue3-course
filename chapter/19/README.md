# 第19课

## 快速启动

```sh
# 使用 pnpm 来管理项目
pnpm i
```

## 数据库安装测试

修改 `.env` 文件的数据库账户和密码


## 启动数据库脚本

```sh
# 创建数据库
vite-node ./tsconfig.node.json packages/init-database/demos/create-db.ts
```

```sh
# 创建表
vite-node packages/init-database/demos/create-table.ts
```

```sh
# 插入数据到表里
vite-node packages/init-database/demos/insert-data.ts 
```


```sh
# 查询表里的数据
vite-node packages/init-database/demos/query-data.ts 
```

