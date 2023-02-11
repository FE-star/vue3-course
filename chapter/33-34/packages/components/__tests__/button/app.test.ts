import { describe, test, expect } from 'vitest';
import { createApp, nextTick } from 'vue';
import AppTest from './app.test.vue';

describe('Button', () => {
  test('click event', async () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const app = createApp(AppTest);
    app.mount(div);
    const textDOM = div.querySelector('.display-text');
    const btnDOM = div.querySelector('.btn-add');
    expect(textDOM?.textContent).toBe('当前数值=123');
    btnDOM?.dispatchEvent(new CustomEvent('click', { bubbles: true }));
    await nextTick();
    expect(textDOM?.textContent).toBe('当前数值=124');
  });
});
