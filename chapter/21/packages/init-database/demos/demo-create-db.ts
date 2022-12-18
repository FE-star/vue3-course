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
// 用来建库
const pool = mysql.createPool(config);

// 封装连接池执行方法
function querySQLByPool(sql: string) {
  return new Promise((resolve, reject) => {
    pool.query(sql, (err, results, fields) => {
      if (err) {
        pool.end();
        reject(err);
      } else {
        pool.end();
        resolve({ results, fields });
      }
    });
  });
}

async function init() {
  // 建库 SQL 语句
  const sqlDB = `CREATE DATABASE IF NOT EXISTS ${database};`;
  // 执行建库操作
  await querySQLByPool(sqlDB);
  console.log(`运营搭建平台 - 数据库 ${database} 建库成功！`);
}

// 开始数据库初始化
init();
