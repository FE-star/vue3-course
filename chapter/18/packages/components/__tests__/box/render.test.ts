import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BoxTest from './index.test.vue';

describe('Box', () => {
  test('className', () => {
    const wrapper = mount(BoxTest);
    const boxDOM = wrapper.find('.my-vue-box');
    expect(boxDOM).toBeTruthy();
    const slotDOM = boxDOM.find('.hello');
    expect(slotDOM).toBeTruthy();
    expect(slotDOM.text()).toBe('Hello World');
  });
});
