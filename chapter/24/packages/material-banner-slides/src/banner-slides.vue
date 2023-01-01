<template>
  <div
    :style="{ width: props.width, height: props.height }"
    class="banner-slides"
    @mouseenter="stopPlay()"
    @mouseleave="startPlay()"
  >
    <div class="banner-slides-body">
      <div
        class="banner-slides-item"
        v-for="(item, i) in props.banners"
        :key="i"
        :class="{ fade: index === i }"
        :style="{ background: item.background }"
      >
        <div class="banner-slides-item-text">{{ item.text }}</div>
      </div>
    </div>
    <span class="banner-slides-btn prev" @click="goToNextSlide(-1)">&lt;</span>
    <span class="banner-slides-btn next" @click="goToNextSlide(1)">&gt;</span>

    <div class="banner-slides-pointer-list">
      <span
        class="banner-slides-pointer"
        v-for="(item, i) in props.banners"
        :key="i"
        :class="{ active: index === i }"
        @click="index = i"
        :title="item.text"
      ></span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onUnmounted } from 'vue';
import type { MaterialProps } from './types';

const props = withDefaults(
  defineProps<{
    width?: MaterialProps['width'];
    height?: MaterialProps['width'];
    banners?: MaterialProps['banners'];
  }>(),
  {
    width: '100%',
    height: 100,
    banners: () => [
      {
        text: '这是第1个轮播内容',
        background: '#66ded3'
      },
      {
        text: '这是第2个轮播内容',
        background: '#f5a991'
      },
      {
        text: '这是第3个轮播内容',
        background: '#9ccef6'
      },
      {
        text: '这是第4个轮播内容',
        background: '#ffeb3b'
      }
    ]
  }
);

const duration = 3000;
const index = ref(0);
const autoPlay = true;
let timer: undefined | string | number = undefined;

const autoPlayFn = () => {
  clearInterval(timer);
  timer = window.setInterval(() => {
    index.value++;
    if (
      Array.isArray(props?.banners) &&
      index.value >= props?.banners?.length
    ) {
      index.value = 0;
    }
  }, duration);
};

const stopPlay = () => {
  if (timer) clearInterval(timer);
};
const startPlay = () => {
  if (props?.banners?.length && autoPlay) {
    autoPlayFn();
  }
};

const goToNextSlide = (step: number) => {
  index.value += step;
  if (Array.isArray(props?.banners) && index.value >= props?.banners?.length) {
    index.value = 0;
    return;
  }
  if (Array.isArray(props?.banners) && index.value < 0) {
    index.value = props?.banners?.length - 1;
  }
};

onUnmounted(() => {
  clearInterval(timer);
});
</script>
<style lang="less" scoped>
.banner-slides {
  min-width: 300px;
  min-height: 100px;
  position: relative;
  text-decoration: none;
  user-select: none;

  .banner-slides-body {
    width: 100%;
    height: 100%;
    background: #f0f0f0;
  }
  .banner-slides-item {
    display: flex;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    list-style: none;
    transition: opacity 0.5s linear;
    align-items: center;
    justify-content: center;
    &.fade {
      opacity: 1;
      z-index: 1;
    }

    .banner-slides-item-text {
      display: flex;
      text-align: center;
      font-size: 20px;
    }
  }
  .banner-slides-pointer-list {
    position: absolute;
    left: 0;
    bottom: 10px;
    z-index: 2;
    width: 100%;
    text-align: center;
    .banner-slides-pointer {
      display: inline-block;
      width: 16px;
      height: 16px;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 50%;
      margin: 0 6px;
      cursor: pointer;
      &.active {
        background: #fff;
      }
    }
  }
  .banner-slides-btn {
    display: flex;
    position: absolute;
    top: 0;
    z-index: 1;
    width: 44px;
    height: 100%;
    background: #000000;
    color: #fff;
    text-align: center;
    transition: all 300ms;
    text-align: center;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: 0.2;

    &:hover {
      opacity: 0.5;
    }

    &.prev {
      left: 0;
    }
    &.next {
      right: 0;
    }
  }
}
</style>
