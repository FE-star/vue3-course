import { defineComponent } from 'vue';
import { prefixName } from '../theme/index';

export const Box = defineComponent({
  props: {
    class: String
  },
  setup(props, { slots }) {
    return () => {
      return (
        <div class={`${prefixName}-box ${props.class || ''}`}>
          {slots?.default?.()}
        </div>
      );
    };
  }
});
