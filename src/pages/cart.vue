<template>
  <div>
    <Header/>
    <div class="wid-con section" style="padding-bottom: 30px">
      <div style="margin: 30px">
        <div style="margin: 20px 0">
          购物车
          <span
              @click="goHome()"
              class="pointer"
              style="color: #2080f0; float: right"
          >返回主页</span
          >
        </div>
        <!-- <div style="margin: 30px 0; color: red">
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
        </div> -->
      </div>
      <div style="margin: 30px">
        <n-card title="">
          <n-empty v-if="list.length == 0" description="购物车什么也没有">
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
              <n-checkbox
                  @change="handleChangeRadio(item)"
                  :checked="item.isChecked"
                  style="width: 50px"
              >
              </n-checkbox>
              <div class="good-info" style="width: 100%">
                <div class="good-img">
                  <img class="pointer" @click="goGoodDetail(item)" :src="item.picUrl" alt=""/>
                </div>
                <div style="flex: 1">
                  <div class="good-name text-cut-2">
                    {{ item.productName }}
                  </div>
                  <div class="flex justify-between" style="margin-top: 5px">
                    <div class="flex align-center">
                      <div class="price">¥ {{ item.price }}</div>
                    </div>
                    <div>
                      <n-input-number
                          placeholder=""
                          :default-value="item.count"
                          @input="handleChangeNUmber($event, item)"
                          @change="handleChangeNUmberBtn($event, item)"
                          min="1"
                      />
                    </div>
                  </div>
                  <div>规格 {{ item.size }}</div>
                  <div class="good-manage">
                    <n-button type="primary" size="small" @click="delCart(item)"
                    >删除
                    </n-button
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </n-card>
        <div class="flex justify-between margin-tb align-center">
          <div>
            <n-button type="primary" @click="AllClick()">全选</n-button>
          </div>
          <div class="flex align-center">
            <div style="margin-right: 20px">总价值：{{ allMoney }}元</div>
            <div>
              <n-button type="primary" @click="sub()">提交订单</n-button>
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
import {useRouter} from "vue-router";
import {getCurrentUserInfo} from "../utils";
import axios from "axios";

export default defineComponent({
  components: {Header},
  name: "cart",
  setup()
  {
    const router = useRouter();
    const message = useMessage();
    const allMoney = ref(0);
    const options = ref([]);
    const list = ref([]);
    let userInfo = ref({});
    const count = ref(1);
    const selectedValue = ref("");
    const handleUpdateValue = (val) =>
    {
      console.log(val);
      selectedValue.value = val;
    };
    watch(list, (val) =>
    {
      console.log(list, 45555555);
      allMoney.value = 0;
      val.forEach((item) =>
      {
        if (item.isChecked)
        {
          allMoney.value += item.price * item.count;
        }
      });
    });

    // 去商品详情
    function goGoodDetail(item)
    {
      router.push({
        path: "/good-detail",
        query: {
          id: item.productID
        }
      });
    }

    const getAddressList = () =>
    {
      options.value = [{label: "地址1", value: "1"}];
      console.log(options.value);
    };

    // 修改数量
    function handleChangeNUmber(val, item)
    {
      console.log(val.target.value);
      item.count = val.target.value;
      list.value = JSON.parse(JSON.stringify(list.value));
    }

    function handleChangeNUmberBtn(val, item)
    {
      console.log(val, item);
      item.count = val;
      list.value = JSON.parse(JSON.stringify(list.value));
    }

    // 修改单选框
    function handleChangeRadio(val)
    {
      val.isChecked = !val.isChecked;
      list.value = JSON.parse(JSON.stringify(list.value));
    }

    const getList = () =>
    {
      axios
          .get(`/api/customer/${userInfo.value.ID}/shoppingCart`, {})
          .then((response) =>
          {
            console.log(response, "获取数据");
            let newList = response.data.cartDetail;
            newList.forEach((item) =>
            {
              item.isChecked = false;
            });
            list.value = newList;
          })
          .catch((error) =>
          {
            console.log(error);
          });
    };
    const goHome = () =>
    {
      router.push({
        path: "/home",
      });
    };
    const AllClick = () =>
    {
      let val = JSON.parse(JSON.stringify(list.value));
      val.forEach((item) =>
      {
        item.isChecked = true;
      });
      list.value = val;
      console.log(list.value);
    };

    function delCart(item)
    {
      axios
          .post(`/api/customer/${userInfo.value.ID}/shoppingCart/delete`, {
            productID: [item.productID],
          })
          .then((response) =>
          {
            console.log(response, "获取数据");
            if (response.data.statusCode == "successful")
            {
              message.info("删除成功");
              getList();
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

    // 提交
    const sub = () =>
    {
      // console.log(list.value, 222);
      // if (!selectedValue.value) {
      //   message.error("请选择收货地址！");
      //   return false;
      // }
      let val = JSON.parse(JSON.stringify(list.value));
      let arr = [];
      val.forEach((item) =>
      {
        if (item.isChecked)
        {
          arr.push(item);
        }
      });
      if (arr.length == 0)
      {
        message.error("请选择商品！");
        return false;
      }
      console.log(arr, 22333333333)
      let order_info_list = {
        isCart: 1,
        list: arr
      };
      localStorage.setItem("order_info_list", JSON.stringify(order_info_list));
      router.push({
        path: "/affirm-order",
      });
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
      getList();
      getAddressList();
    });
    return {
      goGoodDetail,
      delCart,
      userInfo,
      allMoney,
      count,
      options,
      list,
      selectedValue,
      handleUpdateValue,
      onMounted,
      goHome,
      sub,
      AllClick,
      handleChangeRadio,
      handleChangeNUmber,
      handleChangeNUmberBtn,
      getAddressList,
      getList,
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

.good-manage {
  display: flex;
  justify-content: flex-end;
}
</style>
