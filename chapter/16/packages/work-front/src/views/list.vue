<template>
  <h1>List View</h1>
  <ul>
    <li v-for="(item, index) in data" :key="index">
      <RouterLink :to="'/detail/' + item">Detail {{ item }}</RouterLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
const data = ['A001', 'A002', 'A003', 'A004'];
</script>
