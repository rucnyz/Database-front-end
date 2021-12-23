<template>
  <n-space>
    <div class="container">
      <div class="goback" @click="goHome()">返回主页</div>
      <div class="login-info">
        <section class="title">
          <h2>{{ Login }}</h2>
        </section>
        <!-- 输入区 -->
        <section class="input-area">
          <p class="one-item">
            <n-input
              v-model="realName"
              clearable
              placeholder="请输入姓名"
              @input="onInputrealName"
            ></n-input>
          </p>
          <p class="one-item">
            <n-input
              v-model="phoneNumber"
              clearable
              placeholder="请输入手机号"
              @input="onInputphoneNumber"
            ></n-input>
          </p>
          <p class="one-item">
            <n-input
              v-model="nickName"
              clearable
              placeholder="请输入昵称"
              @input="onInputnickName"
            ></n-input>
          </p>
          <p class="one-item">
            <n-input
              v-model="password"
              clearable
              type="password"
              @input="onInputpassword"
              placeholder="请输入密码"
            ></n-input>
          </p>
        </section>

        <!-- 提交区 -->
        <section class="submit-area margin-top-twenty" style="margin-top: 20px">
          <n-button
            :loading="loading"
            type="primary"
            @click="postLoginInfo"
            style="width: 120px"
            >注册</n-button
          >
        </section>
        <div style="margin-top: 10px; text-align: right">
          已有账号，<span class="pointer hover-f22e00" @click="goLogin()"
            >去登录</span
          >
        </div>
      </div>
    </div>
  </n-space>
</template>

<!--suppress JSPotentiallyInvalidConstructorUsage -->
<script setup lang="ts">
import { ref, inject } from "vue";
import {getEncrypt} from "../api";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { useMessage } from "naive-ui";

const store = useStore(); // 获取vuex实例
const router = useRouter(); // 获取router实例
// 表单提交信息
const realName = ref("");
const phoneNumber = ref("");
const nickName = ref("");
const password = ref("");
// 用于传递数据给后端
const axios: any = inject("axios");
// 前端显示信息
const Login = ref("注册");
// True为正在加载
const loading = ref(false);
// 使用SHA256加密
function goLogin() {
  router.push({
    path: "/login",
  });
}
function goHome() {
  router.push({
    path: "/home",
  });
}
// 信息提示
const message = useMessage();
function onInputrealName(e: string) {
  console.log(e);
  realName.value = e;
}
function onInputphoneNumber(e: string) {
  console.log(e);
  phoneNumber.value = e;
}
function onInputnickName(e: string) {
  console.log(e);
  nickName.value = e;
}
function onInputpassword(e: string) {
  console.log(e);
  password.value = e;
}
// 用于传递信息给后端，当点击登录按钮触发
function postLoginInfo(): void {
  console.log(realName.value);
  // 正则校验
  let regPhone = /^[1][3,4,5,6,7,8][0-9]{9}$/;
  let regPassword = /^((\w){6,15}|(\w){32})$/;
  let regName = /^.{2,16}$/;
  if (!regName.test(realName.value)) {
    message.warning("请输入姓名（2~16字符）");
    return;
  }
  if (!regPhone.test(phoneNumber.value)) {
    message.warning("请输入11位正确的手机号（将会被作为账号）");
    return;
  }
  if (!regName.test(nickName.value)) {
    message.warning("请输入昵称（2~16字符）");
    return;
  }
  if (!regPassword.test(password.value)) {
    message.warning("请输入密码(6-15个字母、数字、下划线)");
    return;
  }
  // 首先加载
  loading.value = !loading.value;
  // 进行加密
  const info = {
    version: "0.1",
    password: getEncrypt(password.value),
    realName: realName.value,
    nickName: nickName.value,
    phoneNumber: phoneNumber.value,
  };
  // 传递过去
  axios
    .post("/api/customer/register", info)
    .then((response: { data: any; }) => {
      loading.value = !loading.value;
      console.log(response.data);
      let data = response.data;
      if (data.statusCode == "successful") {
        // message.success("注册成功！");
        // 注册成功后延迟0.5秒跳转
        // 注册成功，可以登录
        setTimeout(() => {
          router.push({
            path: "/login",
          });
        }, 500);
      } else {
        message.info(data.message);
      }
    })
    .catch((error: any) => {
      loading.value = !loading.value;
      console.log(error);
    });
}
</script>

<style scoped lang="less">
:deep(.el-input) {
  width: 100%;
}

.container {
  width: 100vw;
  height: 100vh;
  background-image: url("../../public/img/background.jpeg");
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-info {
    // border: 1px solid red;
    width: 350px;
    padding: 30px;
    border-radius: 10px;
    background-image: linear-gradient(
      to right,
      rgba(245, 245, 220, 0.9),
      rgba(255, 255, 224, 0.85)
    );

    .title {
      font-weight: bold;
      text-align: center;
    }

    .input-area {
      // border: 1px solid blue;
      display: flex;
      flex-flow: row wrap;

      .one-item {
        flex: 1 0 100%;
        // border: 1px solid red;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-top: 20px;

        .label {
          flex: 0 0 60px;
          border: 1px solid gold;
        }
      }
    }

    .submit-area {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
.hover-f22e00:hover {
  color: #f22e00;
}
.hover-f22e00 {
  color: #e93e17;
}
.goback {
  position: fixed;
  top: 30px;
  left: 60px;
  color: rgb(32, 128, 240);
  cursor: pointer;
}
</style>