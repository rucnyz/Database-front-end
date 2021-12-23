<template>
  <div>
    <Header/>
    <div class="wid-con section" style="padding-bottom: 30px">
      <div style="margin: 30px">
        <div style="margin: 20px 0">
          商品详情
          <span
              @click="goHome()"
              class="pointer"
              style="color: #2080f0; float: right"
          >返回主页</span
          >
        </div>
        <div class="good-info">
          <div class="good-img">
            <img :src="info.pic_url" alt=""/>
          </div>
          <div style="flex: 1" class="_right">
            <div class="good-name">
              {{ info.productName }}
            </div>
            <div class="flex justify-between margin-tb-sm">
              <div class="price">¥ {{ info.price }}</div>
              <div></div>
            </div>
            <div>规格： {{ info.size }}</div>
            <!-- <div class="flex align-center">
              <div style="margin-right:10px">
                <div>选择规格：</div>
              </div>
              <div>
                <n-radio-group v-model="sizeVal" name="radiogroup">
                  <n-radio
                    @change="radioChange"
                    v-for="(size, index) in info.sizes"
                    :key="index"
                    :value="size.id"
                  >
                    {{ size.value }}
                  </n-radio>
                </n-radio-group>
              </div>
            </div> -->
            <div class="flex justify-between margin-tb-sm">
              <div></div>
              <div>
                <n-input-number
                    placeholder=""
                    v-model:value="num"
                    @input="handleChangeNUmber($event)"
                    @change="handleChangeNUmberBtn($event)"
                    min="1"
                />
              </div>
            </div>
            <div class="good-manage">
              <n-button
                  type="warning"
                  size="small"
                  style="margin-right: 10px"
                  @click="goPay"
              >立即购买
              </n-button
              >
              <n-button type="error" size="small" @click="goCart"
              >加入购物车
              </n-button
              >
            </div>
          </div>
        </div>
        <div style="margin: 20px 0">商品评论</div>
        <div class="comment-list">
          <n-empty v-if="commentList.length === 0" description="没有评论">
          </n-empty>
          <div
              class="coment-item"
              v-for="(item, index) in commentList"
              :key="index"
          >
            <div>
              评论人：{{ item.customerID }}
              <span style="margin-left: 20px">评论时间：{{ item.date }}</span>
            </div>
            <div style="margin: 10px; color: #666;padding:30px 15px;border-radius:3px;background:#f1f1f1">
              评论内容：{{ item.comments }}
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
  name: "good-detail",
  setup()
  {
    const router = useRouter();
    const route = useRoute();
    const message = useMessage();
    const currentPage = ref(1);
    let sizeVal = ref("");
    const total = ref(0);
    let commentList = ref([]);
    let userInfo = ref({});
    let id = ref("");
    let num = ref(1);
    const info = ref({
      price: "",
      picUrl: "",
      size: "",
      category: "",
    });
    onMounted(() =>
    {
      console.log(route.query.id);
      id.value = route.query.id;
      // 判断是否登录
      let isLogin = getCurrentUserInfo();
      if (!isLogin)
      {
        message.warning("请先登录！");
        router.push({
          path: "/login",
        });
      }
      else
      {
        userInfo.value = JSON.parse(isLogin);
        getGoodsInfo();
        getCommentList();
      }

    });

    function getGoodsInfo()
    {
      axios
          .get(`/api/product/${id.value}`, {})
          .then((response) =>
          {
            console.log(response, "获取数据");
            info.value = response.data;
          })
          .catch((error) =>
          {
            console.log(error);
          });
    }

    function goHome()
    {
      router.push({
        path: "/home",
      });
    }

    window.onscroll = function ()
    {
      //变量scrollTop是滚动条滚动时，距离顶部的距离
      var scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;
      //变量windowHeight是可视区的高度
      var windowHeight =
          document.documentElement.clientHeight || document.body.clientHeight;
      //变量scrollHeight是滚动条的总高度
      var scrollHeight =
          document.documentElement.scrollHeight || document.body.scrollHeight;
      //滚动条到底部的条件
      if (Math.round(scrollTop) + windowHeight === scrollHeight)
      {
        //写后台加载数据的函数
        console.log("到顶部", total.value, commentList.value.length);
        if (total.value > commentList.value.length)
        {
          currentPage.value = currentPage.value + 1;
          getCommentList();
        }
      }
    };

    function getCommentList()
    {
      axios
          .get(`/api/product/${id.value}/allcomments`, {
            params: {
              needNumber: 20,
              page: currentPage.value,
            },
          })
          .then((response) =>
          {
            console.log(response.data);
            total.value = response.data.totalSize;
            let list = commentList.value.concat(response.data.comments);
            commentList.value = list;
          })
          .catch((error) =>
          {
            console.log(error);
          });
    }

    // 修改数量
    function handleChangeNUmber(val)
    {
      console.log(val.target.value);
      num.value = val.target.value;
    }

    function handleChangeNUmberBtn(val)
    {
      console.log(val);
      num.value = val;
    }

    function radioChange(val)
    {
      console.log(val.target.value);
      sizeVal.value = val.target.value;
    }

    function goPay()
    {
      if (!num.value) return message.error("请选择数量");

      message.info("支付成功");
    }

    function goCart()
    {
      if (!num.value) return message.error("请选择数量");
      axios
          .post(`/api/customer/${userInfo.value.ID}/shoppingCart/add`, {
            productID: id.value,
            count: num.value,
          })
          .then((response) =>
          {
            console.log(response, "获取数据");
            message.info("成功加入购物车");
          })
          .catch((error) =>
          {
            console.log(error);
          });
    }

    return {
      userInfo,
      total,
      id,
      num,
      commentList,
      getCommentList,
      goPay,
      goCart,
      radioChange,
      sizeVal,
      handleChangeNUmber,
      handleChangeNUmberBtn,
      getGoodsInfo,
      info,
      goHome,
    };
  },
});
</script>
<style scoped lang="less">
.good-info {
  display: flex;
  margin-left: 10px;
  padding: 10px 0;

  .good-img {
    width: 240px;
    height: 240px;
    border-radius: 10px;
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

._right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.coment-item {
  margin: 20px 0;
  padding: 10px 0;
  border-bottom: 1px solid #f1f1f1;
}
</style>
