import md5 from 'md5';
import { v4 } from 'uuid';
import { runSQL, tranformModelData } from '../util/db';
import type { UserInfo } from '../types';

export async function findUserByUsernameAndPassword(params: {
  username: string;
  password: string;
}) {
  const { username, password } = params;
  const md5Password = md5(password);
  const sql = `
    SELECT * FROM \`user_info\` WHERE username = ? and password = ?;
  `;
  const values = [username, md5Password];
  const results = await runSQL(sql, values);
  let result = null;
  if (results && results[0] && results[0]?.id >= 0) {
    result = tranformModelData<UserInfo>(results[0]);
  }
  return result;
}

export async function checkUserIsUsernameExist(params: {
  username: string;
}): Promise<boolean> {
  const { username } = params;
  const sql = `
    SELECT * FROM \`user_info\` WHERE username = ?;
  `;
  const values = [username];
  const results = await runSQL(sql, values);
  if (results && results.length > 0) {
    return true;
  }
  return false;
}

export async function createUser(params: {
  username: string;
  password: string;
}) {
  const sql = `
    INSERT INTO \`user_info\` SET ?;
  `;
  const uuid = v4();
  const { password, username } = params;
  const values = {
    uuid,
    password: md5(password),
    username,
    status: 1
  };
  const results = await runSQL(sql, values);
  if (results?.insertId > 0) {
    return { uuid, username };
  } else {
    return null;
  }
}
