import { createElementVNode, ref, toDisplayString } from 'vue';

const Counter = {
  setup() {
    const num = ref(0);
    const click = () => {
      num.value += 1;
    };

    return () => {
      return createElementVNode('div', { class: 'v-counter' }, [
        createElementVNode(
          'div',
          { class: 'v-text' },
          toDisplayString(num.value)
        ),
        createElementVNode(
          'button',
          { class: 'v-btn', onClick: click },
          '点击加1'
        )
      ]);
    };
  }
};

export default Counter;
