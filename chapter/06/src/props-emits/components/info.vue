<template>
  <div class="v-info">
    <div>订单信息：</div>
    <div>收货地址：{{props.text}}</div>
    <div>总金额：<span class="v-info-value">{{totalPrice}}</span></div>
  </div>
</template>

<script setup>
  import { ref, watch } from 'vue';
  const props = defineProps({
    text: String,
    list: Array,
  });
  const totalPrice = ref(0);
  watch(props, () => {
    const list = props.list;
    let total = 0;
    list.forEach((item) => {
      total += item.price * item.count;
    });
    totalPrice.value = total;
  })
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
  line-height: 22px;
}
.v-info-value {
  font-size: 24px;
  font-weight: 800;
  color: #fe3030;
}
</style>