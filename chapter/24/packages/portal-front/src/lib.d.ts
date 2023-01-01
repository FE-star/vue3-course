import type Vue from 'vue';

declare global {
  interface Window {
    Vue: Vue;
  }
}
