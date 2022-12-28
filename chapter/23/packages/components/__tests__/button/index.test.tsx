import { describe, test, expect } from 'vitest';
import { nextTick, defineComponent, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { Button } from '../../src';

describe('Button', () => {
  test('click event', async () => {
    const ButtonTest = defineComponent({
      setup() {
        const num = ref(123);
        const onClick = () => {
          num.value += 1;
        };
        return {
          num,
          onClick
        };
      },
      render(ctx) {
        const { num, onClick } = ctx;
        return (
          <div>
            <div class="display-text">当前数值={num}</div>
            <Button class="btn-add" onClick={onClick}>
              点击加1
            </Button>
          </div>
        );
      }
    });

    const wrapper = mount(ButtonTest, { props: {} });
    const textDOM = wrapper.find('.display-text');
    const btnDOM = wrapper.find('.btn-add');
    expect(textDOM.text()).toBe('当前数值=123');
    btnDOM.trigger('click');
    await nextTick();
    expect(textDOM.text()).toBe('当前数值=124');
  });
});
