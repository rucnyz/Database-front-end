<template>
  <div class="container">
    <div class="login-info">
      <section class="title">
        <h2>{{ Login }}</h2>
      </section>

      <!-- 输入区 -->
      <section class="input-area">
        <p class="one-item">
          <n-input
              v-model="phone"
              placeholder="请输入账号"
              @input="onInputPhone"
          ></n-input>
        </p>
        <p class="one-item">
          <n-input
              v-model="password"
              clearable
              type="password"
              placeholder="请输入密码"
              @input="onInputPassword"
          ></n-input>
        </p>
      </section>

      <!-- 提交区 -->
      <section class="submit-area margin-top-twenty">
        <n-button
            :loading="loading"
            type="primary"
            @click="postLoginInfo"
            style="width: 120px"
        >登录
        </n-button
        >
      </section>
    </div>
  </div>
</template>

<!--suppress JSPotentiallyInvalidConstructorUsage -->
<script setup lang="ts">
import {ref, inject} from "vue";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import {getEncrypt} from "../api";

const store = useStore(); // 获取vuex实例
const router = useRouter(); // 获取router实例
const phone = ref("");
const password = ref("");
// 用于传递数据给后端
const axios: any = inject("axios");
// 前端显示信息
const Login = ref("Login");
// True为正在加载
const loading = ref(false);

// 使用SHA256加密
function onInputPhone(e: string) {
  phone.value = e;
}

function onInputPassword(e: string) {
  password.value = e;
}

// 用于传递信息给后端，当点击登录按钮触发
function postLoginInfo(): void {
  // 首先加载
  loading.value = !loading.value;
  // 进行加密
  const info = {
    version: "0.1",
    phoneNumber: phone.value,
    password: getEncrypt(password.value),
  };
  // 传递过去
  axios
      .post("/api/customer/login", info)
      .then((response: { data: any }) => {
        console.log(response.data);
        let data = response.data;
        if (data.statusCode == "successful") {
          // 判断是否可以登录
          // 设置数据
          localStorage.setItem(
              "customer_infl",
              JSON.stringify({
                ID: data["ID"],
                nickName: data["nickName"],
                addressName: data["addressName"],
                phoneNumber: data["phoneNumber"],
              })
          );
          router.push({
            path: "/home",
          });
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
  background-image: url("../assets/img/background.jpeg");
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-info {
    // border: 1px solid red;
    width: 350px;
    padding: 30px;
    border-radius: 10px;
    background-image: linear-gradient(to right,
    rgba(245, 245, 220, 0.9),
    rgba(255, 255, 224, 0.85));

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
</style>