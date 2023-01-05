<template>
  <div>
    <button @click="onClick">打开的信息提示</button>
    <button @click="onClickFixed">打开固定的信息提示</button>
    <button @click="onClickCloseFixed">关闭固定的信息提示</button>
  </div>
  <div>
    <button @click="onClickInfo">info信息提示</button>
    <button @click="onClickSuccess">success信息提示</button>
    <button @click="onClickWarn">warn信息提示</button>
    <button @click="onClickError">error信息提示</button>
  </div>
</template>

<script setup lang="ts">
// import { onMounted } from 'vue';
import { Message } from '../src';

// onMounted(() => {
//   Message.open({
//     text: '您好，这是一个自动显示的提示！您好，这是一个自动显示的提示！您好，这是一个自动显示的提示！',
//     duration: 0
//   });
// });

const onClick = () => {
  Message.open({
    text: '您好，这是默认的信息提示'
    // duration: 1000
  });
};

let msg: { close: () => void } | null = null;
const onClickFixed = () => {
  msg = Message.open({
    text: '您好，这是固定的信息提示，不会自动关闭',
    duration: 0
  });
};

const onClickCloseFixed = () => {
  msg?.close();
};

const onClickInfo = () => {
  Message.open({
    text: '您好，这是一个info提示',
    type: 'info',
    duration: 1000
  });
};

const onClickSuccess = () => {
  Message.open({
    text: '您好，这是一个info提示',
    type: 'success',
    duration: 2000
  });
};

const onClickWarn = () => {
  Message.open({
    text: '您好，这是一个warn提示',
    type: 'warn',
    duration: 1000
  });
};

const onClickError = () => {
  Message.open({
    text: '您好，这是一个error提示',
    type: 'error',
    duration: 1000
  });
};
</script>
