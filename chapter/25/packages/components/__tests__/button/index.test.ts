import { describe, test, expect } from 'vitest';
import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import ButtonTest from './index.test.vue';

describe('Button', () => {
  test('click event', async () => {
    const wrapper = mount(ButtonTest, { props: { num: 123 } });
    const textDOM = wrapper.find('.display-text');
    const btnDOM = wrapper.find('.btn-add');
    expect(textDOM.text()).toBe('当前数值=123');
    btnDOM.trigger('click');
    await nextTick();
    expect(textDOM.text()).toBe('当前数值=124');
  });
});
