<template>
  <div class="header">
    <div class="wid-con">
      <div class="header-con">
        <div class="flex" v-if="true">
          <span class="text-f22e00 pointer" @click="goLogin()">亲，请登录</span>
          <span class="pointer hover-f22e00" @click="goRegister()"
          >免费注册</span
          >
        </div>
        <div class="" v-else>
          <span class="pointer">张三疯</span>
          <span class="pointer hover-f22e00">退出</span>
        </div>
        <div class="pointer hover-f22e00 flex align-center">
          <div class="cart-img">
            <img src="../assets/common/cart.png" alt=""/>
          </div>
          <span @click="goCart()"> 购物车 </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "header",
  setup()
  {
    function goCart()
    {
      this.$router.push({
        path: "/cart",
      });
    }

    function goRegister()
    {
      this.$router.push({
        path: "/register",
      });
    }

    function goLogin()
    {
      this.$router.push({
        path: "/login",
      });
    }

    return {
      goCart,
      goRegister,
      goLogin,
    };
  },
});
</script>
<style scoped lang="less">
.header {
  height: 35px;
  line-height: 35px;
  width: 100%;
  background-color: #f5f5f5;
  border-bottom: 1px solid #eee;

  .header-con {
    display: flex;
    justify-content: flex-end;
    font-size: 12px;

    span {
      margin-right: 20px;
    }
  }
}

.text-f22e00 {
  color: #f22e00;
}

.hover-f22e00:hover {
  color: #f22e00;
}

.cart-img {
  height: 100%;
  margin-right: 4px;
  display: flex;
  align-items: center;

  img {
    width: 15px;
    height: 15px;
    margin-top: -4px;
  }
}
</style>