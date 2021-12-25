<template>
  <div>
    <div class="header">
      <div class="wid-con">
        <div class="header-con flex justify-between">
          <div>
            <span
                @click="goHome()"
                class="pointer"
                style="color: #2080f0"
            >返回主页</span
            >
          </div>
          <div>
              <span class="pointer  hover-f22e00" @click="goAdminLogin()">
            管理员登录
          </span>
          </div>
        </div>
      </div>
    </div>
    <div class="wid-con section" style="padding-bottom: 30px">
      <div style="margin: 20px 0">分析查询</div>
      <div style="margin: 20px 5px">
        <n-card>
          <n-tabs default-value="signin" size="large">
            <n-tab-pane name="signin" tab="商品热销排行榜">
              <n-scrollbar style="max-height: 600px;">
                <n-table :single-line="false">
                  <thead>
                  <tr>
                    <th>商家名字</th>
                    <th>商品ID</th>
                    <th>商品名字</th>
                    <th>销量</th>
                    <th>排名</th>
                  </tr>
                  </thead>
                  <tbody v-for="(j, i) in getDataHotList" :key="i">
                  <tr v-for="(item, index) in getDataHotList[i]" :key="index">
                    <td>{{ item.supplierName }}</td>
                    <td>{{ item.productId }}</td>
                    <td>{{ item.productName }}</td>
                    <td>{{ item.sumQuantity }}</td>
                    <td>{{ item.rank }}</td>
                  </tr>
                  </tbody>
                </n-table>
                <div
                    v-if="getDataHotList.length === 0"
                    style="padding: 10px; text-align: center"
                >
                  暂无数据
                </div>
              </n-scrollbar>
            </n-tab-pane>
            <n-tab-pane name="signin1" tab="低价排行榜">
              <div>
                <p
                    class="one-item flex"
                    style="width: 240px; margin-bottom: 20px"
                >
                  <n-input
                      v-model:value="keywords"
                      placeholder="请输入商品名称"
                      @input="onInputkeywords"
                  ></n-input>
                  <n-button
                      style="margin-left: 5px"
                      type="primary"
                      @click="search"
                  >搜索
                  </n-button
                  >
                </p>
              </div>
              <n-scrollbar style="max-height: 600px;">
                <n-table :single-line="false" class="auto">
                  <thead>
                  <tr>
                    <th>商家名字</th>
                    <th>商品ID</th>
                    <th>商品名字</th>
                    <th>销售价格</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(item, index) in getDataSmalltList" :key="index">
                    <td>{{ item.supplierName }}</td>
                    <td>{{ item.productId }}</td>
                    <td>{{ item.productName }}</td>
                    <td>{{ item.price }}</td>
                  </tr>
                  </tbody>
                </n-table>
                <div
                    v-if="getDataSmalltList.length === 0"
                    style="padding: 10px; text-align: center"
                >
                  暂无数据
                </div>
              </n-scrollbar>
            </n-tab-pane>
            <!-- 管理员 商家自己可见 下-->
            <n-tab-pane
                v-if="role_Type === 'A' || role_Type === 'S'"
                name="signin2"
                tab="销售额排行榜"
            >
              <n-scrollbar style="max-height: 600px;">
                <n-table :single-line="false" class="auto">
                  <thead>
                  <tr>
                    <th>年份</th>
                    <th>商家ID</th>
                    <th>商家名字</th>
                    <th>年销售总额</th>
                  </tr>
                  </thead>
                  <tbody v-for="(j, i) in getDataSellList" :key="i">
                  <tr v-for="(item, index) in j.suppliers" :key="index">
                    <td>{{ item.year }}</td>
                    <td>{{ item.supplierId }}</td>
                    <td>{{ item.supplierName }}</td>
                    <td>{{ item.annualSales }}</td>
                  </tr>
                  </tbody>
                </n-table>
                <div
                    v-if="getDataSellList.length === 0"
                    style="padding: 10px; text-align: center"
                >
                  暂无数据
                </div>
              </n-scrollbar>
            </n-tab-pane>
            <!-- 管理员，用户自己 下-->
            <n-tab-pane
                v-if="role_Type === 'A' || role_Type === 'C'"
                name="signin3"
                tab="购买量排行榜"
            >
              <n-scrollbar style="max-height: 600px;">
                <n-table :single-line="false" class="auto">
                  <thead>
                  <tr>
                    <th>会员ID</th>
                    <th>会员昵称</th>
                    <th>商品ID</th>
                    <th>商品名字</th>
                    <th>购买量</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(item, index) in getDataPayList" :key="index">
                    <td>{{ item.customerId }}</td>
                    <td>{{ item.customerName }}</td>
                    <td>{{ item.productId }}</td>
                    <td>{{ item.productName }}</td>
                    <td>{{ item.topNum }}</td>
                  </tr>
                  </tbody>
                </n-table>
                <div
                    v-if="getDataPayList.length === 0"
                    style="padding: 10px; text-align: center"
                >
                  暂无数据
                </div>
              </n-scrollbar>
            </n-tab-pane>
            <!-- 管理员 下 -->
            <n-tab-pane
                v-if="role_Type === 'A'"
                name="signin4"
                tab="省级消费额排行榜"
            >
              <n-scrollbar style="max-height: 600px;">
                <n-table :single-line="false" class="auto">
                  <thead>
                  <tr>
                    <th>省份</th>
                    <th>平均消费额</th>
                    <th>最大消费额</th>
                    <th>最小消费额</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(item, index) in getDataProvinceList" :key="index">
                    <td>{{ item.province.province }}</td>
                    <td>{{ item.province.avg }}</td>
                    <td>{{ item.province.max }}</td>
                    <td>{{ item.province.min }}</td>
                  </tr>
                  </tbody>
                </n-table>
                <div
                    v-if="getDataProvinceList.length === 0"
                    style="padding: 10px; text-align: center"
                >
                  暂无数据
                </div>
              </n-scrollbar>
            </n-tab-pane>
            <!-- 管理员 商家自己 下-->
            <n-tab-pane
                v-if="role_Type === 'A' || role_Type === 'S'"
                name="signin5"
                tab="店铺铁粉排行榜"
            >
              <n-scrollbar style="max-height: 600px;">
                <n-table :single-line="false" class="auto">
                  <thead>
                  <tr>
                    <th>商家ID</th>
                    <th>商家名字</th>
                    <th>会员ID</th>
                    <th>会员昵称</th>
                    <th>消费额</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(item, index) in getDataClientList" :key="index">
                    <td>{{ item.supplierId }}</td>
                    <td>{{ item.supplierName }}</td>
                    <td>{{ item.customerId }}</td>
                    <td>{{ item.customerName }}</td>
                    <td>{{ item.sumConsume }}</td>
                  </tr>
                  </tbody>
                </n-table>
                <div
                    v-if="getDataClientList.length === 0"
                    style="padding: 10px; text-align: center"
                >
                  暂无数据
                </div>
              </n-scrollbar>
            </n-tab-pane>
            <!-- 管理员，用户自己 下-->
            <n-tab-pane
                v-if="role_Type === 'A' || role_Type === 'C'"
                name="signin6"
                tab="会员消费额排行榜"
            >
              <n-scrollbar style="max-height: 600px;">
                <n-table :single-line="false" class="auto">
                  <thead>
                  <tr>
                    <th>年份</th>
                    <th>会员ID</th>
                    <th>会员昵称</th>
                    <th>年消费额</th>
                  </tr>
                  </thead>
                  <tbody v-for="(j, i) in getDataVipList" :key="i">
                  <tr v-for="(item, index) in j.customers" :key="index">
                    <td>{{ item.year }}</td>
                    <td>{{ item.customerId }}</td>
                    <td>{{ item.customerName }}</td>
                    <td>{{ item.annualConsume }}</td>
                  </tr>
                  </tbody>
                </n-table>
                <div
                    v-if="getDataVipList.length === 0"
                    style="padding: 10px; text-align: center"
                >
                  暂无数据
                </div>
              </n-scrollbar>
            </n-tab-pane>
            <n-tab-pane name="signin7" tab="商家热销排行榜">
              <div>
                <p
                    class="one-item flex"
                    style="width: 240px; margin-bottom: 20px"
                >
                  <n-input
                      v-model:value="keywordsSupplier"
                      placeholder="请输入商品名称"
                      @input="onInputkeywordsSupplier"
                  ></n-input>
                  <n-button
                      style="margin-left: 5px"
                      type="primary"
                      @click="searchSupplier"
                  >搜索
                  </n-button
                  >
                </p>
              </div>
              <n-scrollbar style="max-height: 600px;">
                <n-table :single-line="false" class="auto">
                  <thead>
                  <tr>
                    <th>商家名字</th>
                    <th>商品ID</th>
                    <th>商品名字</th>
                    <th>销量</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(item, index) in getDatahotGoodsList" :key="index">
                    <td>{{ item.supplierName }}</td>
                    <td>{{ item.productId }}</td>
                    <td>{{ item.productName }}</td>
                    <td>{{ item.sumQuantity }}</td>
                  </tr>
                  </tbody>
                </n-table>
                <div
                    v-if="getDatahotGoodsList.length === 0"
                    style="padding: 10px; text-align: center"
                >
                  暂无数据
                </div>
              </n-scrollbar>
            </n-tab-pane>
          </n-tabs>
        </n-card>
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
    const keywords = ref("");
    const keywordsSupplier = ref("");
    const role_Id = ref("");
    const role_Type = ref("");
    const getDataHotList = ref([]);
    const getDataSmalltList = ref([]);
    const getDatahotGoodsList = ref([]);
    const getDataClientList = ref([]);
    const getDataVipList = ref([]);
    const getDataProvinceList = ref([]);
    const getDataPayList = ref([]);
    const getDataSellList = ref([]);

    function onInputkeywords(val)
    {
      keywords.value = val;
    }

    function onInputkeywordsSupplier(val)
    {
      keywordsSupplier.value = val;
    }

    onMounted(() =>
    {
      getDataHot();
      let role_infl = localStorage.getItem("role_infl");
      if (role_infl)
      {
        role_infl = JSON.parse(role_infl);
        role_Id.value = role_infl.roleId;
        console.log(role_infl.roleId);
        role_Type.value = role_Id.value.substring(0, 1);
        getDataSell()
        getDataPay()
        getDataProvince()
        getDataVip()
        getDataClient()
      }
    });

    function search()
    {
      if (!keywords.value)
      {
        return false
      }
      getDataSmall(keywords.value);
    }

    function searchSupplier()
    {
      if (!keywordsSupplier.value)
      {
        return false
      }
      getDatahotGoods(keywordsSupplier.value);
    }

    function getDataHot()
    {
      // 热销排行榜
      axios
          .get(`/api/admin/top3_product`, {})
          .then((response) =>
          {
            console.log(response, "获取数据");
            getDataHotList.value = response.data.details;
          })
          .catch((error) =>
          {
            console.log(error);
          });
    }

    function getDataSmall(val)
    {
      // 低价排行榜
      axios
          .post(`/api/admin/low5_supplier`, {keywords: val})
          .then((response) =>
          {
            console.log(response, "获取数据");
            getDataSmalltList.value = response.data.details;
          })
          .catch((error) =>
          {
            console.log(error);
          });
    }

    function getDataSell()
    {
      // 销售额排行榜
      axios
          .post(`/api/admin/annual_sales`, {ID: role_Id.value})
          .then((response) =>
          {
            console.log(response, "获取数据");
            getDataSellList.value = response.data.details;
          })
          .catch((error) =>
          {
            console.log(error);
          });
    }

    function getDataPay()
    {
      // 购买量排行榜
      axios
          .post(`/api/admin/top_product`, {ID: role_Id.value})
          .then((response) =>
          {
            console.log(response, "获取数据");
            getDataPayList.value = response.data.details;
          })
          .catch((error) =>
          {
            console.log(error);
          });
    }

    function getDataProvince()
    {
      // 省级消费额排行榜
      axios
          .get(`/api/admin/province_top`, {})
          .then((response) =>
          {
            console.log(response, "获取数据");
            getDataProvinceList.value = response.data.details;
          })
          .catch((error) =>
          {
            console.log(error);
          });
    }

    function getDataClient()
    {
      // 店铺铁粉排行榜
      axios
          .post(`/api/admin/top_customer`, {ID: role_Id.value})
          .then((response) =>
          {
            console.log(response, "获取数据");
            getDataClientList.value = response.data.details;
          })
          .catch((error) =>
          {
            console.log(error);
          });
    }

    function getDataVip()
    {
      // 会员消费额排行榜
      axios
          .post(`/api/admin/annual_consume`, {ID: role_Id.value})
          .then((response) =>
          {
            console.log(response, "获取数据");
            getDataVipList.value = response.data.details;
          })
          .catch((error) =>
          {
            console.log(error);
          });
    }

    function getDatahotGoods(val)
    {
      // 热销排行榜
      axios
          .post(`/api/admin/top5_supplier`, {keywords: val})
          .then((response) =>
          {
            console.log(response, "获取数据");
            getDatahotGoodsList.value = response.data.details;
          })
          .catch((error) =>
          {
            console.log(error);
          });
    }

    function goAdminLogin()
    {
      router.push({
        path: "/admin-login",
      });
    }

    function goHome()
    {
      router.push({
        path: "/home",
      });
    }

    return {
      goAdminLogin,
      goHome,
      getDataClientList,
      getDataVipList,
      getDataProvinceList,
      getDataPayList,
      getDataSellList,
      role_Type,
      getDatahotGoodsList,
      getDataSmalltList,
      getDataHotList,
      role_Id,
      getDatahotGoods,
      getDataVip,
      getDataClient,
      getDataProvince,
      getDataPay,
      getDataSell,
      getDataHot,
      getDataSmall,
      search,
      onInputkeywords,
      keywords,
      searchSupplier,
      onInputkeywordsSupplier,
      keywordsSupplier,
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

.hover-f22e00:hover {
  color: #f22e00;
}

td, th {
  text-align: center
}
</style>
