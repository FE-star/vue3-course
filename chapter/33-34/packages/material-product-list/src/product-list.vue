<template>
  <div class="product-list">
    <div
      class="product-item"
      v-for="(item, index) in props.productList"
      v-bind:key="index"
    >
      <div class="product-preview">
        <img class="product-image" :src="item?.imageUrl" />
      </div>
      <div class="product-info">
        <div class="product-title">{{ item.title }}</div>
        <div class="product-label-list" v-if="Array.isArray(item?.labels)">
          <span
            v-for="(label, idx) in item?.labels"
            v-bind:key="idx"
            class="product-label"
          >
            {{ label }}
          </span>
        </div>
        <div
          class="product-label-list"
          v-else-if="typeof item?.labels === 'string'"
        >
          <span
            v-for="(label, idx) in item?.labels?.split?.(',')"
            v-bind:key="idx"
            class="product-label"
          >
            {{ label }}
          </span>
        </div>
        <div class="product-price">
          <span class="product-price-unit">&yen;</span>
          <span class="product-price-num">{{ item?.price }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { MaterialProps } from './types';

const props = withDefaults(
  defineProps<{
    productList?: MaterialProps['productList'];
  }>(),
  {
    productList: () =>
      [0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        return {
          id: `000${i}`,
          title: `2023年流行款衣服简约风时尚风百搭-${i}`,
          labels: ['商家包邮', '送运费险'],
          imageUrl:
            'data:image/svg+xml;utf8,<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200" fill="%23ffffff"><path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32z m-40 632H136v-39.9l138.5-164.3 150.1 178L658.1 489 888 761.6V792z m0-129.8L664.2 396.8c-3.2-3.8-9-3.8-12.2 0L424.6 666.4l-144-170.7c-3.2-3.8-9-3.8-12.2 0L136 652.7V232h752v430.2z"></path><path d="M304 456c48.6 0 88-39.4 88-88s-39.4-88-88-88-88 39.4-88 88 39.4 88 88 88z m0-116c15.5 0 28 12.5 28 28s-12.5 28-28 28-28-12.5-28-28 12.5-28 28-28z"></path></svg>',
          price: '123.45'
        };
      })
  }
);
</script>

<style lang="less" scoped>
.product-list {
  overflow: hidden;

  .product-item {
    background: #f7f9fa;
    // width: 360px;
    width: 300px;
    height: 120px;
    float: left;
    margin: 10px;
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    color: #333333;
    font-size: 12px;
  }

  .product-preview {
    position: absolute;
    display: flex;
    width: 120px;
    top: 0;
    left: 0;
    bottom: 0;
    text-align: center;
    align-items: center;
    justify-content: center;

    .product-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      background: #8fc7f4;
    }
  }

  .product-info {
    padding: 10px;
    padding-left: 130px;
    box-sizing: border-box;

    .product-title {
      color: #333333;
      font-size: 16px;
      line-height: 20px;
    }

    .product-label-list {
      padding: 6px 0;
      .product-label {
        display: inline-block;
        color: #ff0033;
        background: #ffffff;
        height: 18px;
        padding: 0 4px;
        margin-right: 6px;
        font-size: 12px;
        line-height: 18px;
        color: #ff0033;
        background: #ffffff;
        border: 1px solid #ff0033;
        border-radius: 3px;
      }
    }

    .product-price {
      color: #ff0033;
      font-size: 14px;

      .product-price-unit {
        margin-right: 4px;
      }

      .product-price-num {
        font-size: 20px;
        font-weight: bolder;
      }
    }
  }
}
</style>
