import { defineStore } from 'pinia';
import type { MyState, MyStoreGetters, MyStoreActions } from './types';

export const useMyStore = defineStore<
  'my-store',
  MyState,
  MyStoreGetters,
  MyStoreActions
>('my-store', {
  state: () => ({
    text: '环城东路888号',
    list: [
      { name: '苹果', price: 20, count: 0 },
      { name: '香蕉', price: 12, count: 0 },
      { name: '梨子', price: 15, count: 0 }
    ]
  }),

  getters: {
    totalPrice(state) {
      let total = 0;
      state.list.forEach((item) => {
        total += item.price * item.count;
      });
      return total;
    }
  },

  actions: {
    updateText(text?: string) {
      // console.log(text);
      if (text) {
        this.text = text;
      }
    },

    increase(index: number) {
      this.list[index].count += 1;
    },

    decrease(index: number) {
      if (this.list[index].count > 0) {
        this.list[index].count -= 1;
      }
    }
  }
});