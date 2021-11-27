<template>
  <h1>{{ message }}</h1><br>
  <n-space vertical>
    <n-input
        v-model:value="username"
        type="text"
        placeholder="请输入用户名"
        autosize style="min-width: 25%;"
    />
    <n-input
        v-model:value="password"
        type="password"
        show-password-on="mousedown"
        placeholder="请输入密码"
        autosize style="min-width: 25%;"
    />
    <br>
  </n-space>

  <n-button :loading="loading" @click="postLoginInfo" size="large"> 登录</n-button>


</template>

<script setup lang="ts">
import {ref, inject} from 'vue'
import jsSHA from "jssha"

const username = ref(null)
const password = ref("")
// 用于传递数据给后端
const axios: any = inject("axios")
// 前端显示信息
const message = ref("Login")
// True为正在加载
const loading = ref(false)
// 使用SHA256加密
const shaPassword = new jsSHA("SHA-256", "TEXT", {encoding: "UTF8"})

// 用于传递信息给后端，当点击登录按钮触发
function postLoginInfo(): void {
  // 首先加载
  loading.value = !loading.value
  // 进行加密
  shaPassword.update(password.value)
  console.log(shaPassword.getHash("HEX"))// 测试一下
  const info = {
    "version": "0.1",
    "name": username.value,
    "password": shaPassword.getHash("HEX")
  }
  // 传递过去
  axios.post("/api/login", info).then((response: { data: any; }) => {
    console.log(response.data)
    message.value = response.data;
  }).catch((error: any) => {
    console.log(error);
  });

}
</script>

<style scoped>

</style>