<template>
  <div>
    <Header/>
    <div class="wid-con section" style="padding-bottom: 30px">
      <div style="margin: 30px">
        <div style="margin: 20px 0">
          订单列表
          <span
              @click="goHome()"
              class="pointer"
              style="color: #2080f0; float: right"
          >返回主页</span
          >
        </div>
        <div class="order-list">
          <n-card>
            <div class="order-item" v-for="(item, index) in list" :key="index">
              <div class="order-info-top">
                下单时间：{{ item.orderdate }}
                <span style="margin-left: 20px"
                >订单号：{{ item.orderID }}</span
                >
              </div>
              <div class="order-info-top">
                收货人：{{ item.nickname }}
                <span style="margin-left: 20px">手机号：{{ item.phone }}</span>
                <span style="margin-left: 20px"
                >收货地址：{{ item.receiveAddress }}</span
                >
              </div>
              <div class="good-info">
                <div class="good-img">
                  <img class="pointer" @click="goGoodDetail(item)" :src="item.picUrl" alt=""/>
                </div>
                <div style="flex: 1">
                  <div class="good-name text-cut-2">
                    {{ item.productName }}
                  </div>
                  <div class="flex justify-between margin-tb-sm">
                    <div class="price">
                      ¥ {{ Math.floor(item.priceSum * 100) / 100 }}
                    </div>
                    <div>X {{ item.quantity }}</div>
                  </div>
                  <div class="good-manage">
                    <n-popconfirm
                        v-if="!item.isReturn"
                        positive-text="确定"
                        negative-text="取消"
                        @positive-click="refund(item)"
                        @negative-click="handleNegativeClick"
                    >
                      <template #trigger>
                        <n-button
                            type="info"
                            size="small"
                            style="margin-right: 10px"
                        >退货
                        </n-button
                        >
                      </template>
                      确认退货吗？
                    </n-popconfirm>
                    <n-button
                        v-else
                        type="info"
                        size="small"
                        disabled
                        style="margin-right: 10px"
                    >已退货
                    </n-button
                    >
                    <n-button type="info" size="small" @click="comment(item)"
                    >评价
                    </n-button
                    >
                  </div>
                </div>
              </div>
              <div>评价:{{ item.comment || "无" }}</div>
            </div>
            <n-empty v-if="list.length == 0" description="你还没有订单">
              <template #extra>
                <n-button size="small" @click="goHome()">去挑选商品</n-button>
              </template>
            </n-empty>
          </n-card>
        </div>
      </div>
    </div>
    <n-modal v-model:show="showModel" preset="dialog" title="评价">
      <div style="margin-top: 20px">
        <p class="one-item">
          <n-input
              v-model:value="commentVal"
              placeholder="请输入评价"
              @input="onInput"
              type="textarea"
          ></n-input>
        </p>
      </div>
      <template #action>
        <n-button @click="hideModel()">取消</n-button>
        <n-button type="primary" @click="sub">确定</n-button>
      </template>
    </n-modal>
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
  name: "order",
  setup()
  {
    const router = useRouter();
    const message = useMessage();
    let showModel = ref(false);
    let commentVal = ref(false);
    let commentValId = ref(false);
    let userInfo = ref({});
    let list = ref([]);
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
    });

    function refund(item)
    {
      axios
          .post(`/api/customer/${userInfo.value.ID}/orders/salesreturn`, {
            orderID: item.orderID,
          })
          .then((response) =>
          {
            console.log(response, "获取数据");
            if (response.data.statusCode == "successful")
            {
              message.info("退货成功");
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

    function hideModel()
    {
      showModel.value = false;
    }

    function comment(item)
    {
      console.log(item);
      commentValId.value = item.orderID;
      commentVal.value = item.comment;
      showModel.value = true;
    }

    function sub()
    {
      // if (!commentVal.value) return message.warning("请输入评价内容");

      let data = {
        orderID: commentValId.value,
        comment: commentVal.value,
      };
      console.log(data);
      axios
          .post(`/api/comment/update`, data)
          .then((response) =>
          {
            console.log(response, "获取数据");
            if (response.data.statusCode == "successful")
            {
              message.info("评价成功！");
              showModel.value = false;
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

    function onInput(val)
    {
      commentVal.value = val;
    }

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

    function goHome()
    {
      router.push({
        path: "/home",
      });
    }

    function getList()
    {
      axios
          .get(`/api/customer/${userInfo.value.ID}/orders`, {})
          .then((response) =>
          {
            console.log(response, "获取数据");
            list.value = response.data.detail;
          })
          .catch((error) =>
          {
            console.log(error);
          });
    }

    return {
      goGoodDetail,
      commentValId,
      userInfo,
      commentVal,
      refund,
      showModel,
      sub,
      onInput,
      hideModel,
      goHome,
      list,
      getList,
      comment,
    };
  },
});
</script>
<style scoped lang="less">
.order-item {
  padding: 10px 0;
  border-bottom: 1px solid #f1f1f1;
}

.order-item:last-child {
  border-bottom: 0px;
}

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

.price {
  color: #f22e00;
  margin-top: 5px;
}

.good-manage {
  display: flex;
  justify-content: flex-end;
}
</style>
