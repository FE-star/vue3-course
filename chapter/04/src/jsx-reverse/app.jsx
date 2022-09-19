import { defineComponent, ref } from 'vue';
import Module01 from './module01.vue';
import Module02 from './module02.vue';
import Module03 from './module03.vue';
import Module04 from './module04.vue';

const App = defineComponent({

  setup() {
    const isReverse = ref(false);
    const onClick = () => {
      isReverse.value = !isReverse.value;
    }
    return {
      isReverse,
      onClick,
    }
  },

  render(ctx) {
    const { isReverse, onClick } = ctx;
    const mods = [
      <Module01 />,
      <Module02 />,
      <Module03 />,
      <Module04 />
    ]
    isReverse === true && mods.reverse();
    return (
      <div class="app">
        {mods.map((mod) => {
          return mod;
        })}
        <button class="btn" onClick={onClick}>
          转换顺序: {`${isReverse}`}
        </button>
      </div>
    )
  }
});

export default App;