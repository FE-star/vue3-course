import { bench, expect, afterAll, beforeAll } from 'vitest';
import {
  cleanPort,
  startWorkServer,
  closeWorkServer,
  workServerHost,
  workServerPort,
  nodeFetch
} from './util';

beforeAll(async () => {
  await cleanPort();
  await startWorkServer();
});

afterAll(() => {
  closeWorkServer();
});

bench(
  'no login /api/get/account/online',
  async () => {
    const url = `http://${workServerHost}:${workServerPort}/api/get/account/online`;
    const res = await nodeFetch(url);
    const json = await res.json();
    expect(json).toStrictEqual({ username: null, uuid: null });
  },
  {
    time: 1000
  }
);
