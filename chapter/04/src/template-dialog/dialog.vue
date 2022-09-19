<template>
  <div v-if="props.show" class="v-dialog-mask">
    <div class="v-dialog">
      <div class="v-dialog-text">
        {{props.text}}
      </div>
      <div class="v-dialog-footer">
        <button class="v-dialog-btn" @click="onOk">确定</button>
      </div>
    </div>
  </div>
</template>

<script setup >
import { toRef, toRefs, computed } from 'vue';
const props = defineProps({
  text: String,
  show: Boolean,
});
const emits = defineEmits(['onOk']);
const onOk = () => {
  emits('onOk');
}
</script>

<style scoped>
.v-dialog-mask {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 100;
  background: #000000AA;
}
.v-dialog {
  position: fixed;
  z-index: 101;
  top: 100px;
  left: calc(50% - 180px);
  width: 360px;
  height: 140px;
  background: #ffffff;
  border-radius: 10px;
  font-size: 18px;
  color: #222222;
}
.v-dialog-text {
  text-align: center;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.v-dialog-footer {
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
.v-dialog-btn {
  width: 200px;
  height: 32px;
  background: #188fee;
  border: none;
  color: #ffffff;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
}
</style>