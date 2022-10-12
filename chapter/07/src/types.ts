import type { Store } from 'pinia';

export interface MyItem {
  name: string;
  price: number;
  count: number;
}

export interface MyState {
  text: string;
  list: MyItem[];
}

export type MyStoreGetters = {
  totalPrice(state: MyState): number;
};

export interface MyStoreActions {
  updateText(text?: string): void;
  increase(index: number): void;
  decrease(index: number): void;
}

export type MyStore = Store<
  'my-store',
  MyState,
  MyStoreGetters,
  MyStoreActions
>;