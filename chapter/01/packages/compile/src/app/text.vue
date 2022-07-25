<template>
  <div class="v-text">{{ props.text }}</div>
</template>

<script setup>
  const props = defineProps({
    text: Number
  });
</script>

<style>
.v-text {
  font-size: 28px;
  font-weight: bolder;
}
</style>

