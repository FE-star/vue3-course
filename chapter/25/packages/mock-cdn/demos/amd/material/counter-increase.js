window.define('counter-increase', ['vue'], function (Vue) {
  const { h, ref, toDisplayString } = Vue;
  const Counter = {
    setup() {
      const num = ref(0);
      const click = () => {
        num.value += 1;
      };
      return () => {
        return h('div', { class: 'v-counter' }, [
          h('div', { class: 'v-text' }, toDisplayString(num.value)),
          h(
            'button',
            {
              class: 'v-btn',
              onClick: click
            },
            '点击加1'
          )
        ]);
      };
    }
  };
  return Counter;
});
