<template>
  <button @click="onClick">点击打开对话框</button>
</template>

<script setup lang="ts">
import { Dialog, Button } from '../src';

const onClick = () => {
  const dialog = Dialog.createDialog({
    text: '您好',
    // Content: Button,
    // hideFooter: true,
    onOk: () => {
      dialog.close();
    }
  });
};
</script>
