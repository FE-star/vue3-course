<template>
  <h1>List View</h1>
  <ul>
    <li v-for="(item, index) in data.list" :key="index">
      <RouterLink :to="'/detail/' + item.id">Detail {{ item.id }}</RouterLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { RouterLink } from 'vue-router';
const data = reactive<{ list: { id: string; name: string }[] }>({
  list: []
});

onMounted(() => {
  fetch('/api/getData')
    .then((res) => res.json())
    .then((result) => {
      data.list = result;
    });
});
</script>
