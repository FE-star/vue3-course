import { defineComponent, h } from 'vue';
import type { Component } from 'vue';
import { prefixName } from '../theme/index';

export const DialogComponent = defineComponent({
  props: {
    text: String,
    Content: Object,
    hideFooter: Boolean
  },
  emits: ['onOk'],
  setup(props, context) {
    const { text, Content, hideFooter } = props as {
      text: string;
      Content: Component;
      hideFooter: boolean;
    };
    const { emit } = context;
    const onOk = () => {
      emit('onOk');
    };
    return () => {
      return (
        <div class={`${prefixName}-dialog-mask`}>
          <div class={`${prefixName}-dialog`}>
            {Content ? (
              h(Content, {})
            ) : (
              <div class={`${prefixName}-dialog-text`}>{text}</div>
            )}
            {hideFooter !== true && (
              <div class={`${prefixName}-dialog-footer`}>
                <button class={`${prefixName}-dialog-btn`} onClick={onOk}>
                  确定
                </button>
              </div>
            )}
          </div>
        </div>
      );
    };
  }
});
