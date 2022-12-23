<template>
  <h1>Detail Item: {{ $route.params.id }}</h1>
  <div>
    <button @click="onClick">回到List页面</button>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const onClick = () => {
  router.push('/list');
};
</script>
