<template>
  <div class="good">
    <div>
      <Header/>
      <!-- 搜索 -->
      <div class="wid-con section">
        <div class="search">
          <n-input-group class="flex justify-center">
            <n-input
                placeholder="请输入喜欢的宝贝"
                v-model:value="keywords"
                @input="inputSearchChange"
                :style="{ width: '50%' }"
            />
            <n-button type="primary" @click="getGoodListInfo()" ghost
            >搜索
            </n-button
            >
          </n-input-group>
        </div>
        <div class="search search-fixed" v-if="fixed">
          <n-input-group class="flex justify-center">
            <n-input
                placeholder="请输入喜欢的宝贝"
                @input="inputSearchChange"
                v-model="keywords"
                :style="{ width: '50%' }"
            />
            <n-button type="primary" ghost @click="goGoodListPage()"
            >搜索
            </n-button
            >
          </n-input-group>
        </div>
        <!-- 商品 -->
        <div
            style="
            margin-left: 20px;
            padding-top: 30px;
            font-size: 18px;
            font-weight: 600;
          "
        >
          商品列表
        </div>
        <div class="good-list flex flex-wrap" style="padding: 30px 0">
          <div
              class="item"
              v-for="(item, index) in goodList"
              :key="index"
              @click="goGoodsDetail(item)"
          >
            <div class="good-img">
              <img :src="item.product_pic" alt=""/>
            </div>
            <div class="text-cut-2 good-name">
              {{ item.product_name }}
            </div>
            <div class="price">¥ {{ item.price }}</div>
          </div>
        </div>
        <div
            v-if="goodList.length >= total"
            style="text-align: center; margin: 30px auto"
        >
          没有更多数据
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/header.vue";
import {defineComponent, onMounted, ref} from "vue";
import axios from "axios";
import {useRoute} from "vue-router";

export default defineComponent({
  components: {Header},
  setup()
  {
    const route = useRoute();

    // 去商品详情
    function goGoodsDetail()
    {
    }

    onMounted(() =>
    {
      getRouter();
      getGoodList();
    });
    const goodList = ref([]);
    const currentPage = ref(1);
    const total = ref(0);
    const fixed = ref("");

    const keywords = ref("");
    const category = ref("");
    const getRouter = () =>
    {
      console.log(route.query); // 路由信息
      let query = route.query
      keywords.value = query.keywords || ''
      category.value = query.category || ''
    };

    function getGoodListInfo()
    {
      currentPage.value = 1;
      goodList.value = [];
      getGoodList();
    }

    function inputSearchChange(val)
    {
      keywords.value = val;
    }

    // 获取商品列表
    function getGoodList()
    {
      axios
          .get("/api/HomePage/getProductInCond", {
            params: {
              needNumber: 20,
              page: currentPage.value,
              keywords: keywords.value,
              category: category.value,
            },
          })
          .then((response) =>
          {
            console.log(response.data);
            total.value = response.data.totalSize;
            goodList.value = goodList.value.concat(response.data.detail);
          })
          .catch((error) =>
          {
            console.log(error);
          });
    }

    // 判断是否到底部
    window.onscroll = function ()
    {
      //变量scrollTop是滚动条滚动时，距离顶部的距离
      const scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;
      //变量windowHeight是可视区的高度
      const windowHeight =
          document.documentElement.clientHeight || document.body.clientHeight;
      //变量scrollHeight是滚动条的总高度
      const scrollHeight =
          document.documentElement.scrollHeight || document.body.scrollHeight;
      //滚动条到底部的条件
      if (Math.round(scrollTop) + windowHeight === scrollHeight)
      {
        //写后台加载数据的函数
        console.log("到顶部", total.value, goodList.value.length);
        if (total.value > goodList.value.length)
        {
          currentPage.value = currentPage.value + 1;
          getGoodList();
        }
      }
      // 搜索框吸顶效果
      //   console.log(scrollTop);
      if (Math.round(scrollTop) >= 35)
      {
        fixed.value = "search-fixed";
      } else
      {
        fixed.value = "";
      }
    };
    return {
      fixed,
      keywords,
      category,
      total,
      inputSearchChange,
      goodList,
      getRouter,
      goGoodsDetail,
      getGoodListInfo,
      getGoodList,
    };
  },
});
</script>
<style scoped lang="less">
.search {
  text-align: center;
  padding: 30px 0;
  position: relative;
  top: 0;
  width: 100%;
  z-index: 99999;
}

.search-fixed {
  position: fixed;
  background: #fff;
  display: flex;
  justify-content: center;
  width: 1180px;
}

.good-list {
  height: 100%;
}

.item {
  border-radius: 10px;
  float: left;
  padding: 10px;
  margin: 0 0 20px 10px;
  color: #6c6c6c;
  width: 200px;
  height: 300px;
  position: relative;
  background: #f8f8f8;
  cursor: pointer;

  .good-img {
    border-radius: 15px;
    overflow: hidden;
  }

  .price {
    color: #f22e00;
    margin-top: 5px;
  }
}

.item:hover {
  background: #f1f1f1;
  box-shadow: 3px 3px 10px #f1f1f1;
}

.item:hover .good-name {
  color: #f22e00;
}
</style>