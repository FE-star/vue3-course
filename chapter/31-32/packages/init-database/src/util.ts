import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

export const database = process.env.MYSQL_DATABASE;

const config = {
  host: process.env.MYSQL_HOST,
  port: parseInt(process.env.MYSQL_PORT),
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD
};

const pool = mysql.createPool(config);
const poolDatabase = mysql.createPool({ ...config, ...{ database } });

export function querySQLByPool(sql: string) {
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

export function queryDatabaseSQLByPool(sql: string) {
  return new Promise((resolve, reject) => {
    poolDatabase.query(sql, (err, results, fields) => {
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

export function queryDatabaseSQL(sql: string, values: (string | number)[]) {
  const conn = mysql.createConnection({ ...config, ...{ database } });
  conn.connect();
  return new Promise((resolve, reject) => {
    conn.query(sql, values, (err, rows) => {
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

export function closePools() {
  pool.end();
  poolDatabase.end();
}
