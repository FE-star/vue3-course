<template>
  <div class="example">
    <Row>
      <Col class="gird" :span="24">col-24</Col>
    </Row>
    <Row>
      <Col class="gird" :span="12">col-12</Col>
      <Col class="gird gird-dark" :span="12">col-12</Col>
    </Row>
    <Row>
      <Col class="gird" :span="8">col-8</Col>
      <Col class="gird gird-dark" :span="8">col-8</Col>
      <Col class="gird" :span="8">col-8</Col>
    </Row>
    <Row>
      <Col class="gird" :span="6">col-6</Col>
      <Col class="gird gird-dark" :span="6">col-6</Col>
      <Col class="gird" :span="6">col-6</Col>
      <Col class="gird gird-dark" :span="6">col-6</Col>
    </Row>
    <Row>
      <Col class="gird" :span="4">col-4</Col>
      <Col class="gird gird-dark" :span="4">col-4</Col>
      <Col class="gird" :span="4">col-4</Col>
      <Col class="gird gird-dark" :span="4">col-4</Col>
      <Col class="gird" :span="4">col-4</Col>
      <Col class="gird gird-dark" :span="4">col-4</Col>
    </Row>
    <Row>
      <Col class="gird" :span="3">col-3</Col>
      <Col class="gird gird-dark" :span="3">col-3</Col>
      <Col class="gird" :span="3">col-3</Col>
      <Col class="gird gird-dark" :span="3">col-3</Col>
      <Col class="gird" :span="3">col-3</Col>
      <Col class="gird gird-dark" :span="3">col-3</Col>
      <Col class="gird" :span="3">col-3</Col>
      <Col class="gird gird-dark" :span="3">col-3</Col>
    </Row>
    <Row>
      <Col class="gird" :span="2">col-2</Col>
      <Col class="gird gird-dark" :span="2">col-2</Col>
      <Col class="gird" :span="2">col-2</Col>
      <Col class="gird gird-dark" :span="2">col-2</Col>
      <Col class="gird" :span="2">col-2</Col>
      <Col class="gird gird-dark" :span="2">col-2</Col>
      <Col class="gird" :span="2">col-2</Col>
      <Col class="gird gird-dark" :span="2">col-2</Col>
      <Col class="gird" :span="2">col-2</Col>
      <Col class="gird gird-dark" :span="2">col-2</Col>
      <Col class="gird" :span="2">col-2</Col>
      <Col class="gird gird-dark" :span="2">col-2</Col>
    </Row>
  </div>
</template>

<script setup lang="ts">
import { Col, Row } from '../src';
</script>

<style lang="less">
.example {
  width: 960px;
  margin: 0 auto;
  margin-top: 10px;
  // gird-shadow: #0000004f 1px 1px 16px;
}
.gird {
  background: #0092ff6b;
  border: 1px #0092ff6b solid;
  margin-bottom: 10px;
  height: 50px;
  color: #035593;
  font-size: 18px;
  // font-weight: bolder;
  text-align: center;
  line-height: 50px;

  &.gird-dark {
    background: #068aed;
    border: 1px #068aed solid;
    color: #ffffff;
    margin-bottom: 10px;
  }
}
</style>
