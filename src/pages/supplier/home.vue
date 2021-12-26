<template>
  <n-layout>
    <n-layout-header>
        <n-h2>您好，{{ supplier_id }}</n-h2>
    </n-layout-header>
    <n-layout has-sider>
      <n-layout-sider>
        <n-menu :options="menuOptions"></n-menu>
      </n-layout-sider>
      <n-layout>
        <router-view></router-view>
      </n-layout>
    </n-layout>
  </n-layout>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { useRoute, RouterLink } from 'vue-router';
import { NLayout, NLayoutSider, NLayoutHeader, NMenu, NH2 } from 'naive-ui';
const route = useRoute()
const supplier_id = route.params.id

const menuOptions = [
  {
    label: () =>
      h(RouterLink,
        {
          to: { name: 'supplier.home.order', }
        },
        { default: () => "查看订单" }
      ),
    key: "to_order"
  },
  {
    label: () =>
      h(RouterLink,
        {
          to: { name: 'supplier.home.product', }
        },
        { default: () => "管理商品" }
      ),
    key: "to_product"
  },
  {
    label: () =>
      h(RouterLink,
        {
          to: { path:"/statistics-data", }
        },
        { default: () => "查看排行榜" }
      ),
    key: "to_product"
  }
]
</script>

<style lang="less">

.go_to_static{
  display:inline
}
</style>