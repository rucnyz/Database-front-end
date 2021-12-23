<template>
  <div>
    <Header/>
    <div class="wid-con section" style="padding-bottom: 30px">
      <div style="margin: 30px">
        <div style="margin: 30px 0; color: red">
          温馨提示：如需新增收货地址，请去个人中心添加!
        </div>
        <div style="display: flex; align-items: center">
          <div style="width: 80px">选择地址:</div>
          <n-select
              v-model="selectedValue"
              clearable
              placeholder="请选择收货地址"
              :options="options"
              @update:value="handleUpdateValue"
          />
        </div>
        <div style="margin-top: 30px">
          <n-card title="">
            <n-empty v-if="list.length === 0" description="什么也没有">
              <template #extra>
                <n-button size="small" @click="goHome()">去挑选商品</n-button>
              </template>
            </n-empty>
            <div class="radio-list" style="width: 100%" v-else>
              <div
                  class="radio-item flex align-center"
                  v-for="(item, index) in list"
                  :key="index"
              >
                <div class="good-info" style="width: 100%">
                  <div class="good-img">
                    <img class="pointer" :src="item.picUrl" alt=""/>
                  </div>
                  <div style="flex: 1">
                    <div class="good-name text-cut-2">
                      {{ item.productName }}
                    </div>
                    <div class="flex justify-between" style="margin-top: 5px">
                      <div class="flex align-center">
                        <div class="price">¥ {{ item.price }}</div>
                      </div>
                      <div>X {{ item.count }}</div>
                    </div>
                    <div>规格 {{ item.size }}</div>
                  </div>
                </div>
              </div>
            </div>
          </n-card>
          <div style="margin: 30px">
            <div class="flex align-center justify-end">
              <div>
                <n-button type="primary" @click="sub()">下单</n-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {defineComponent, ref, onMounted, watch} from "vue";
import Header from "../components/header.vue";
import {useMessage} from "naive-ui";
import {useRouter, useRoute} from "vue-router";
import {getCurrentUserInfo} from "../utils";
import axios from "axios";

export default defineComponent({
  components: {Header},
  name: "affirm-order",
  setup()
  {
    const router = useRouter();
    const route = useRoute();
    const message = useMessage();
    const list = ref([]);
    const isCart = ref("");
    let userInfo = ref({});
    const selectedValue = ref("");
    const options = ref([]);
    const handleUpdateValue = (val) =>
    {
      console.log(val);
      selectedValue.value = val;
    };
    onMounted(() =>
    {
      // 判断是否登录
      let isLogin = getCurrentUserInfo();
      if (!isLogin)
      {
        message.warning("请先登录！");
        router.push({
          path: "/login",
        });
        return false;
      }
      userInfo.value = JSON.parse(isLogin);
      getAddressList();
      getList();
    });

    function sub()
    {
      if (!selectedValue.value)
      {
        message.error("请选择收货地址！");
        return false;
      }

      let data = {
        orders: [],
      };
      //    "productID": "P000000001",
      //   "orderDate": "当前时间，精确到秒",
      //   "priceSum": "1000(总价格)",
      //   "quantity": "5(数量)",
      //   "receiveAddress": "地址字符串"
      let date = new Date(+new Date() + 8 * 3600 * 1000)
          .toISOString()
          .replace(/T/g, " ")
          .replace(/\.[\d]{3}Z/, "");
      console.log(date, list);
      // 判断立即购买是单个商品，购物车进入是多个商品下单
      if (isCart.value === 0)
      {
        data.orders = [
          {
            productID: list.value[0].productID,
            orderDate: date,
            priceSum: list.value[0].count * list.value[0].price,
            quantity: list.value[0].count,
            receiveAddress: selectedValue.value,
          },
        ];
      } else if (isCart.value === 1)
      {
        list.value.forEach((item) =>
        {
          let newItem = {
            productID: item.productID,
            orderDate: date,
            priceSum: item.count * item.price,
            quantity: item.count,
            receiveAddress: selectedValue.value,
          };
          data.orders.push(newItem);
        });
      }
      console.log(data);
      axios
          .post(`/api/customer/${userInfo.value.ID}/orders/add_cart`, data)
          .then((response) =>
          {
            console.log(response, "获取数据");
            if (response.data.statusCode === "successful")
            {
              message.info("下单成功");
              setTimeout(() =>
              {
                router.push({
                  path: "/order",
                });
              }, 500);
            } else
            {
              message.info(response.data.message);
            }
          })
          .catch((error) =>
          {
            console.log(error);
          });
    }

    const getList = () =>
    {
      let order_info_list = localStorage.getItem("order_info_list");
      if (!order_info_list)
      {
        return false;
      }
      list.value = JSON.parse(order_info_list).list;
      isCart.value = JSON.parse(order_info_list).isCart;
    };
    const getAddressList = () =>
    {
      axios
          .get(`/api/customer/${userInfo.value.ID}/info`, {})
          .then((response) =>
          {
            console.log(response, "获取数据");
            let arr = [];
            response.data.address.forEach((element) =>
            {
              let newitem = {
                label: element.addressName,
                value: element.addressName,
              };
              arr.push(newitem);
            });
            options.value = arr;
          })
          .catch((error) =>
          {
            console.log(error);
          });
      console.log(options.value);
    };
    return {
      isCart,
      sub,
      getList,
      list,
      userInfo,
      selectedValue,
      options,
      handleUpdateValue,
    };
  },
});
</script>
<style scoped lang="less">
.radio-item {
  .good-info {
    display: flex;
    margin-left: 10px;
    padding: 10px 0;

    .good-img {
      width: 120px;
      height: 120px;
      margin-right: 10px;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}

.price {
  color: #f22e00;
  margin-top: 5px;
}
</style>
