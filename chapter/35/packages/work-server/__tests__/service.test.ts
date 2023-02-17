import { describe, test, expect } from 'vitest';
import md5 from 'md5';
import { queryAccount } from '../src/service/user';

describe('work-server: database', () => {
  test('service/user.ts queryAccount', async () => {
    const result = await queryAccount({
      username: 'admin001',
      password: md5('88888888')
    });
    expect(result).toStrictEqual({
      data: {
        allow: true,
        username: 'admin001',
        uuid: '00000000-aaaa-bbbb-cccc-ddddeeee0001'
      },
      success: true,
      message: '登录成功'
    });
  });
});
