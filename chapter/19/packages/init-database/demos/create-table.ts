/* eslint-disable no-console */
import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

// 需要创建的数据库名称
const database = process.env.MYSQL_DATABASE;
// 数据库连接配置
const config = {
  host: process.env.MYSQL_HOST,
  port: parseInt(process.env.MYSQL_PORT),
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD
};

// 创建一个数据库连接池
// 用来建表
const poolDatabase = mysql.createPool({ ...config, ...{ database } });

// 封装连接池执行方法
function queryDatabaseSQLByPool(sql: string) {
  return new Promise((resolve, reject) => {
    poolDatabase.query(sql, (err, results, fields) => {
      if (err) {
        poolDatabase.end();
        reject(err);
      } else {
        poolDatabase.end();
        resolve({ results, fields });
      }
    });
  });
}

async function init() {
  // 建库 SQL 语句
  const sqlDB = `
  CREATE TABLE  IF NOT EXISTS \`user_info\` (
    \`id\` int(11) NOT NULL AUTO_INCREMENT, 
    \`uuid\` varchar(128) NOT NULL UNIQUE COMMENT '员工用户UUID', 
    \`username\` varchar(64) NOT NULL UNIQUE COMMENT '员工用户名称', 
    \`password\` varchar(64) NOT NULL COMMENT '员工用户密码', 
    \`info\` json COMMENT '扩展描述（JSON数据格式）', 
    \`create_time\` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    \`modify_time\` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后修改时间',
    PRIMARY KEY (\`id\`)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
  `;
  // 执行建表操作
  await queryDatabaseSQLByPool(sqlDB);
  console.log('运营搭建平台 - 数据表 user_info 创建成功！');
}

// 开始数据库初始化
init();
