import {
  findUserByUsernameAndPassword,
  checkUserIsUsernameExist,
  createUser
} from '../model/user';
import type { MyAPIResult } from '../types';
import type { UserInfo } from '../types';

export async function queryAccount(params: {
  username?: string;
  password?: string;
}): Promise<MyAPIResult> {
  const result: MyAPIResult = {
    data: null,
    success: false,
    message: '登录失败'
  };
  const { username, password } = params;
  if (username && password) {
    const modelData: UserInfo | null = await findUserByUsernameAndPassword({
      username,
      password
    });
    result.success = true;
    result.message = '登录成功';
    result.data = {
      allow: modelData !== null,
      username: modelData?.username,
      uuid: modelData?.uuid
    };
  } else {
    result.message = '登录失败，用户名称或密码错误';
  }
  return result;
}

export async function registerUser(params: {
  username?: string;
  password?: string;
}): Promise<MyAPIResult> {
  const { username, password } = params;
  let result: MyAPIResult = {
    data: null,
    success: false,
    message: '注册失败'
  };
  if (!username || !password) {
    result.message = '信息不全';
    return result;
  }

  try {
    const isExist = await checkUserIsUsernameExist({ username });
    if (isExist === true) {
      result.message = '用户名已存在';
      return result;
    }
    const createResult = await createUser({ username, password });
    result = {
      data: createResult,
      success: true,
      message: '注册成功'
    };
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.log(err);
    result.message = err?.toString() || '出现异常';
  }
  return result;
}
