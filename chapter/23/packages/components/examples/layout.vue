<template>
  <!-- <Layout class="example">
    <Header class="example-header">Header</Header>
    <Content class="example-content">Content</Content>
    <Footer class="example-footer">Footer</Footer>
  </Layout> -->

  <!-- <Layout class="example" :hasSider="true">
    <Sider class="example-sider">Sider</Sider>
    <Layout>
      <Header class="example-header">Header</Header>
      <Content class="example-content">Content</Content>
      <Footer class="example-footer">Footer</Footer>
    </Layout>
  </Layout> -->

  <!-- <Layout class="example" :hasSider="true">
    <Sider class="example-sider">Sider</Sider>
    <Layout>
      <Header class="example-header">Header</Header>
      <Content class="example-content">Content</Content>
      <Footer class="example-footer">Footer</Footer>
    </Layout>
    <Sider class="example-sider">Sider</Sider>
  </Layout> -->

  <!-- <Layout class="example">
    <Header class="example-header">Header</Header>
    <Layout :hasSider="true">
      <Sider class="example-sider">Sider</Sider>
      <Layout>
        <Content class="example-content">Content</Content>
        <Footer class="example-footer">Footer</Footer>
      </Layout>
    </Layout>
  </Layout> -->

  <!-- <Layout class="example">
    <Header class="example-header">Header</Header>
    <Layout :hasSider="true">
      <Sider class="example-sider">Sider</Sider>
      <Layout>
        <Content class="example-content">Content</Content>
      </Layout>
    </Layout>
    <Footer class="example-footer">Footer</Footer>
  </Layout> -->

  <!-- <Layout class="example">
    <Header class="example-header">Header</Header>
    <Layout :hasSider="true">
      <Sider class="example-sider">Sider</Sider>
      <Layout>
        <Content class="example-content">Content</Content>
      </Layout>
      <Sider class="example-sider">Sider</Sider>
    </Layout>
    <Footer class="example-footer">Footer</Footer>
  </Layout> -->

  <Layout class="example">
    <Header class="example-header">Header</Header>
    <Layout :hasSider="true">
      <Sider class="example-sider">Sider</Sider>
      <Layout>
        <Content class="example-content">
          <Row :style="{ width: '100%' }">
            <Col class="gird" :span="4">col-4</Col>
            <Col class="gird gird-dark" :span="4">col-4</Col>
            <Col class="gird" :span="4">col-4</Col>
            <Col class="gird gird-dark" :span="4">col-4</Col>
            <Col class="gird" :span="4">col-4</Col>
            <Col class="gird gird-dark" :span="4">col-4</Col>
          </Row>
          <Row :style="{ width: '100%' }">
            <Col class="gird gird-dark" :span="8">col-8</Col>
            <Col class="gird" :span="8">col-8</Col>
            <Col class="gird gird-dark" :span="8">col-8</Col>
          </Row>
          <Row :style="{ width: '100%' }">
            <Col class="gird" :span="8">col-8</Col>
            <Col class="gird gird-dark" :span="8">col-8</Col>
            <Col class="gird" :span="8">col-8</Col>
          </Row>
          <Row :style="{ width: '100%' }">
            <Col class="gird" :span="12">col-12</Col>
            <Col class="gird gird-dark" :span="12">col-12</Col>
          </Row>
          <Row :style="{ width: '100%' }">
            <Col class="gird gird-dark" :span="12">col-12</Col>
            <Col class="gird" :span="12">col-12</Col>
          </Row>
        </Content>
      </Layout>
      <Sider class="example-sider">Sider</Sider>
    </Layout>
    <Footer class="example-footer">Footer</Footer>
  </Layout>
</template>

<script setup lang="ts">
import { Layout, Header, Footer, Content, Sider, Row, Col } from '../src';
</script>

<style lang="less">
.example {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  margin-top: 10px;
  font-size: 24px;
  color: #02290a;
  text-align: center;
}

.example-header {
  background: #00968880;
  height: 40px;
  justify-content: center;
  align-items: center;
}

.example-content {
  background: #007a6ec0;
  height: 100px;
  justify-content: center;
  align-items: center;
}

.example-footer {
  background: #00968880;
  height: 40px;
  justify-content: center;
  align-items: center;
}

.example-sider {
  background: #106d64d6;
  width: 200px;
  justify-content: center;
  align-items: center;
}

.gird {
  background: #1397fcf2;
  margin-bottom: 10px;
  height: 100px;
  color: #ffffff;
  font-size: 18px;
  text-align: center;
  line-height: 120px;

  &.gird-dark {
    background: #023a64;
    color: #ffffff;
    margin-bottom: 10px;
  }
}
</style>
