<template>
  <div class="header">
    <div class="wid-con">
      <div class="header-con">
        <div class="flex" v-if="!customer_infl">
          <span class="text-f22e00 pointer" @click="goLogin()">亲，请登录</span>
          <span class="pointer hover-f22e00" @click="goRegister()"
          >免费注册</span
          >
        </div>
        <div class="" v-else>
          <span class="pointer  hover-f22e00" @click="goStatistics()">
            排行榜
          </span>
          <span class="pointer text-f22e00 hover-f22e00" @click="goMyPage()">{{
              customer_infl.nickName
            }}</span>
          <span class="pointer hover-f22e00" @click="goOut()">退出</span>
        </div>
        <div class="pointer hover-f22e00 flex align-center" @click="goCart()">
          <div class="cart-img">
            <img src="../assets/common/cart.png" alt=""/>
          </div>
          <span> 购物车 </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent, ref, onMounted} from "vue";
import {useMessage} from "naive-ui";
import {useRouter} from "vue-router";

export default defineComponent({
  name: "header",
  setup()
  {
    const message = useMessage();
    const router = useRouter();
    let customer_infl = ref("");
    onMounted(() =>
    {
      let customer_infl_storage = localStorage.getItem("customer_infl") || "";
      // console.log(customer_infl_storage, 111);
      if (customer_infl_storage)
      {
        customer_infl.value = JSON.parse(customer_infl_storage);
        localStorage.setItem(
            "role_infl",
            JSON.stringify({
              roleId: customer_infl.value.ID,
            })
        );
      }
    });

    function goOut()
    {
      message.success("退出成功");
      localStorage.setItem("customer_infl", "");
      setTimeout(() =>
      {
        window.location.reload();
      }, 500);
    }

    function goCart()
    {
      if (customer_infl.value)
      {
        router.push({
          path: "/cart",
        });
      } else
      {
        message.warning("请先登录！");
        router.push({
          path: "/login",
        });
      }
    }

    function goRegister()
    {
      router.push({
        path: "/register",
      });
    }

    function goLogin()
    {
      router.push({
        path: "/login",
      });
    }

    function goMyPage()
    {
      router.push({
        path: "/my",
      });
    }

    function goStatistics()
    {
      router.push({
        path: "/statistics-data",
      });
    }

    return {
      customer_infl,
      goCart,
      goRegister,
      goLogin,
      goOut,
      goMyPage,
      goStatistics
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