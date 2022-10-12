<template>
  <div class="v-info">
    <div>订单信息：</div>
    <div>收货地址：{{ myStore.text }}</div>
    <div>
      总金额：<span class="v-info-value">{{ myStore.totalPrice }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MyStore } from '../types';
import { useMyStore } from '../store';
const myStore: MyStore = useMyStore();
</script>

<style>
.v-info {
  width: 400px;
  margin: 20px auto;
  padding: 10px;
  box-shadow: 0px 0px 16px 0px #00000038;
  border: 1px solid #d6d5d5;
  font-size: 20px;
  color: #222222;
  background: #ffffff;
  font-size: 18px;
  text-align: left;
  line-height: 1.5;
}
.v-info-value {
  font-size: 24px;
  font-weight: 800;
  color: #fe3030;
}
</style>
Footer
