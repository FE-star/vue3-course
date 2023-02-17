import { describe, test, expect } from 'vitest';
import md5 from 'md5';
import {
  findUserByUsernameAndPassword,
  checkUserIsUsernameExist
} from '../src/model/user';

describe('work-server: database', () => {
  test('model/user.ts findUserByUsernameAndPassword', async () => {
    const result = await findUserByUsernameAndPassword({
      username: 'admin001',
      password: md5('88888888')
    });
    expect(JSON.parse(JSON.stringify(result))).toStrictEqual({
      id: 1,
      uuid: '00000000-aaaa-bbbb-cccc-ddddeeee0001',
      username: 'admin001',
      password: '1f22f6ce6e58a7326c5b5dd197973105',
      status: 1,
      info: '{}',
      extend: null,
      createTime: '2023-01-18T08:33:18.000Z',
      modifyTime: '2023-01-18T08:33:18.000Z'
    });
  });
  test('model/user.ts checkUserIsUsernameExist', async () => {
    const result = await checkUserIsUsernameExist({
      username: 'admin001'
    });
    expect(result).toStrictEqual(true);
  });
});
