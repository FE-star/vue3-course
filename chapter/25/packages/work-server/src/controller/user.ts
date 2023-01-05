import type { Context, Next } from 'koa';
import jwt from 'jsonwebtoken';
import { registerUser, queryAccount } from '../service/user';
import { jwtConfig } from '../config';

const onlineCookie = 'online-status';

export async function parseOnlineUserData(
  ctx: Context
): Promise<{ username: string; uuid: string }> {
  let userData = null;
  const token = ctx.cookies.get(onlineCookie) || '';
  if (token) {
    const data: { exp: number; user: any } = (jwt.verify(
      token,
      jwtConfig.secret
    ) || {}) as { exp: number; user: any };
    if (data?.exp < Date.now()) {
      userData = data.user;
    }
  }
  return userData;
}

export async function getOnlineUser(ctx: Context) {
  ctx.body = await parseOnlineUserData(ctx);
}

const unCheckPathList = [
  '/page/sign-in',
  '/page/home',
  '/page/sign-out',
  '/page/preview'
];

export async function checkAccountOnlineStatus(ctx: Context, next: Next) {
  if (unCheckPathList.includes(ctx.path)) {
    await next();
  } else {
    const data: any = await parseOnlineUserData(ctx);
    if (data && data.username && data.uuid) {
      await next();
    } else {
      ctx.redirect('/page/sign-in');
    }
  }
}

export async function signIn(ctx: Context) {
  const params = ctx.request.body as {
    username?: string;
    password?: string;
  };
  const loginResult = await queryAccount(params);
  if (loginResult?.success === true) {
    const token = jwt.sign({ user: loginResult?.data }, jwtConfig.secret, {
      expiresIn: jwtConfig.time
    });
    ctx.cookies.set(onlineCookie, token, {
      path: '/',
      maxAge: jwtConfig.time,
      expires: new Date(),
      httpOnly: false,
      overwrite: false
    });
  }
  ctx.body = loginResult;
}

export async function signUp(ctx: Context) {
  const params = ctx.request.body as {
    username?: string;
    password?: string;
  };
  const result = await registerUser(params);
  ctx.body = result;
}

export async function signOut(ctx: Context) {
  ctx.cookies.set(onlineCookie, null);
  ctx.redirect('/');
}

export async function filterLoginStatus(ctx: Context, next: Next) {
  const data: any = await parseOnlineUserData(ctx);
  if (data && data.username && data.uuid) {
    await next();
  } else {
    ctx.body = {
      data: null,
      success: false,
      message: '暂无权限，请先登录'
    };
  }
}
