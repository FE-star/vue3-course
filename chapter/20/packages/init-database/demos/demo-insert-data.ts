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
  return new Promise<OkPacket>((resolve, reject) => {
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
  // 插入数据 SQL 语句
  const sql = `
    INSERT INTO user_info
    ( uuid, username, password, info, create_time, modify_time)
    VALUES 
    ('00000000-aaaa-bbbb-cccc-ddddeeee0001','hello-vue-004', '1f22f6ce6e58a7326c5b5dd197973105', '{}', '2022-12-01 00:00:01','2022-12-01 00:00:01'),
    ('00000000-aaaa-bbbb-cccc-ddddeeee0002','hello-vue-005', '1f22f6ce6e58a7326c5b5dd197973105', '{}', '2022-12-01 00:00:01','2022-12-01 00:00:01'),
    ('00000000-aaaa-bbbb-cccc-ddddeeee0003','hello-vue-006', '1f22f6ce6e58a7326c5b5dd197973105', '{}', '2022-12-01 00:00:01','2022-12-01 00:00:01');
  `;
  // 执行插入数据操作
  const data: OkPacket = await queryDatabaseSQL(sql, []);
  console.log(
    `运营搭建平台 - 数据表 user_info 成功插入${data?.affectedRows}条数据`
  );
}

// 开始执行数据库操作
init();
