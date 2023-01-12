<template>
  <Box class="example">
    <div class="btn-list">
      <Button @click="onClickTheme">切换主题</Button>
    </div>
    <div class="btn-list">
      <Button>Default</Button>
      <Button :type="'primary'">Primary</Button>
      <Button :type="'success'">Success</Button>
      <Button :type="'warning'">Warning</Button>
      <Button :type="'danger'">Danger</Button>
    </div>
    <div class="btn-list">
      <Button :variant="'outlined'">Default</Button>
      <Button :type="'primary'" :variant="'outlined'">Primary, Outlined</Button>
      <Button :type="'success'" :variant="'outlined'">Success, Outlined</Button>
      <Button :type="'warning'" :variant="'outlined'">Warning, Outlined</Button>
      <Button :type="'danger'" :variant="'outlined'">Danger, Outlined</Button>
    </div>
    <div class="btn-list">
      <Button disabled>Default</Button>
      <Button :type="'primary'" disabled>Primary</Button>
      <Button :type="'success'" disabled>Success</Button>
      <Button :type="'warning'" disabled>Warning</Button>
      <Button :type="'danger'" disabled>Danger</Button>
    </div>
    <div class="btn-list">
      <Button :variant="'outlined'" disabled>Default</Button>
      <Button :type="'primary'" :variant="'outlined'" disabled
        >Primary, Outlined</Button
      >
      <Button :type="'success'" :variant="'outlined'" disabled
        >Success, Outlined</Button
      >
      <Button :type="'warning'" :variant="'outlined'" disabled
        >Warning, Outlined</Button
      >
      <Button :type="'danger'" :variant="'outlined'" disabled
        >Danger, Outlined</Button
      >
    </div>
  </Box>
</template>

<script lang="ts" setup>
import { Button, Box } from '../src';
import { prefixName } from '../src/theme/index';

const onClickTheme = () => {
  const darkThemeName = `${prefixName}-theme-dark`;
  const html = document.querySelector('html');
  if (html?.classList.contains(darkThemeName)) {
    html?.classList.remove(darkThemeName);
  } else {
    html?.classList.add(darkThemeName);
  }
};
</script>

<style lang="less">
.example {
  width: 960px;
  margin: 30px auto;
  padding: 100px;
  // box-shadow: #0000004f 1px 1px 16px;

  .btn-list {
    margin-bottom: 10px;
    button {
      margin-right: 10px;
    }
  }
}
</style>
