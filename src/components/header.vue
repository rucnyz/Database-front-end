<template>
  <n-grid class="header" :cols="12">
    <n-gi span=4 class="header-search" :offset=4 >搜索框//TODO</n-gi>
    <n-gi :offset=1>
      <div @click="goLogin()" class="header-login">亲，请登录</div>
    </n-gi>
    <n-gi>
      <div  @click="goRegister()" class="header-register">免费注册</div>
    </n-gi>
    <n-gi class="header-cart">
      <div @click="goCart()"><img src="../assets/common/cart.png" alt=""/> 购物车 </div>
    </n-gi>
  </n-grid>
</template>

<script setup lang="ts">

import { Router, useRouter } from 'vue-router'
const router:Router = useRouter()

function goCart():void{
  router.push({path:"/cart"})
}

function goRegister():void{
  router.push({path: "/register"});
}

function goLogin():void{
  router.push({path: "/login"});
}

</script>
<style scoped lang="less">
.header {
  height: 35px;
  line-height: 35px;
  width: 100%;
  background-color: #f5f5f5;
  border-bottom: 2px solid #eee;
  font-size: small;
}

.header-search {
  border: 1px solid #FF1700;
}

.header-login {
  max-width:100%;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  &:hover{
    color: #FF1700;
    cursor: pointer;
  }
}

.header-register {
  max-width:100%;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  &:hover{
    color: #FF1700;
    cursor: pointer;
  }
}

.header-cart {  
  img {
    vertical-align: text-bottom;
    width: 15px;
    height: 15px;
  }

  div {
    max-width:100%;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    &:hover{
    color: #FF1700;
    cursor: pointer;
    }
  }
}
</style>