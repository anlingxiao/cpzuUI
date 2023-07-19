<template>
  <a-layout has-sider>
    <sider-view/>
    <a-layout :style="{ marginLeft: '200px' }">
      <header-view/>
      <a-layout-content :style="{ margin: '24px 16px 0', overflow: 'initial' }">
        <router-view/>
      </a-layout-content>
      <footer-view/>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import FooterView from "@/components/framework/FooterView.vue";
import SiderView from "@/components/framework/SiderView.vue";
import HeaderView from "@/components/framework/HeaderView.vue";
</script>

<style scoped>
.site-layout-background {
  background: #fff;
}

[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}
</style>
