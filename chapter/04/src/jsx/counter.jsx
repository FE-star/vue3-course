import { defineComponent, reactive } from 'vue';
import './counter.css';

const Counter = defineComponent({

  setup() {
    const state = reactive({
      count: 0
    });
    const onClick = () => {
      state.count ++;
    }
    return {
      state,
      onClick,
    }
  },

  render(ctx) {
    const { state, onClick } = ctx;
    return (
      <div class="counter">
        <div class="text">Count: {state.count}</div>
        <button class="btn" onClick={onClick}>Add</button>
      </div>
    )
  }
});

export default Counter;