import { defineComponent, reactive, createApp, h, toRaw } from 'vue';

const Dialog = defineComponent({
  props: {
    text: String,
  },
  emits: [ 'onOk' ],
  setup(props, context) {
    const { emit } = context;
    const state = reactive({
      count: 0
    });
    const onOk = () => {
      emit('onOk')
    }
    return {
      props,
      onOk,
    }
  },
  render(ctx) {
    const { props, onOk } = ctx;
    return (
      <div class="v-dialog-mask">
        <div class="v-dialog">
          <div class="v-dialog-text">
            {props.text}
          </div>
          <div class="v-dialog-footer">
            <button class="v-dialog-btn" onClick={onOk}>确定</button>
          </div>
        </div>
      </div>
    )
  }
});



export function createDialog(params = {}) {
  const dom = document.createElement('div');
  const body = document.querySelector('body');
  body.appendChild(dom);
  const app = createApp({
    render() {
      return h(Dialog, {
        text: params.text,
        onOnOk: params.onOk
      })
    }
  });
  app.mount(dom)

  return {
    close: () => {
      app.unmount();
      dom.remove();
    }
  }
};