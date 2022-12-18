/* eslint-disable no-console */
import mysql from 'mysql';
import dotenv from 'dotenv';
import type { OkPacket } from 'mysql';

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

// 封装连接执行方法
function queryDatabaseSQL(sql: string, values: (string | number)[]) {
  const conn = mysql.createConnection({ ...config, ...{ database } });
  conn.connect();
  return new Promise<OkPacket | unknown[]>((resolve, reject) => {
    conn.query(sql, values, (err, rows: OkPacket) => {
      if (err) {
        conn.end();
        reject(err);
      } else {
        conn.end();
        resolve(rows);
      }
    });
  });
}

async function init() {
  // 查询数据 SQL 语句
  const sql = `
    SELECT username, create_time FROM user_info WHERE id = ?
  `;
  // 执行插入数据操作
  const data: unknown[] = (await queryDatabaseSQL(sql, [1])) as unknown[];
  console.log(`运营搭建平台 - 数据表 user_info 成功查询${data?.length}条数据`);
  console.log(data);
}

// 开始执行数据库操作
init();
