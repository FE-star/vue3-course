import { defineComponent } from 'vue';
import { prefixName } from '../theme/index';

export const DialogComponent = defineComponent({
  props: {
    text: String
  },
  emits: ['onOk'],
  setup(props, context) {
    const { emit } = context;
    const onOk = () => {
      emit('onOk');
    };
    return () => {
      return (
        <div class={`${prefixName}-dialog-mask`}>
          <div class={`${prefixName}-dialog`}>
            <div class={`${prefixName}-dialog-text`}>{props.text}</div>
            <div class={`${prefixName}-dialog-footer`}>
              <button class={`${prefixName}-dialog-btn`} onClick={onOk}>
                确定
              </button>
            </div>
          </div>
        </div>
      );
    };
  }
});
