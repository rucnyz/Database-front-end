<template>
  <div>
    <Header/>
    <div class="wid-con section" style="padding-bottom: 30px">
      <div style="margin: 30px">
        <div style="margin: 20px 0">
          个人信息
          <span
              @click="goHome()"
              class="pointer"
              style="color: #2080f0; float: right"
          >返回主页</span
          >
        </div>
        <n-card>
          <div class="info-item">
            ID:
            {{ userInfo.ID }}
          </div>
          <div class="info-item">
            <span>昵称: </span>
            <span v-if="!isEdit">{{ userInfo.nickName }} </span>
            <n-input
                style="width: 300px; margin-left: 10px"
                v-model:value="nickName"
                size="small"
                placeholder="请输入收货人姓名"
                @input="onInputNickName"
                v-else
            ></n-input>
          </div>
          <div class="info-item">
            <span>手机号: </span>
            <span v-if="!isEdit">{{ userInfo.phoneNumber }} </span>
            <n-input
                style="width: 300px; margin-left: 10px"
                v-model:value="phoneNumber"
                size="small"
                placeholder="请输入收货人姓名"
                @input="onInputPhoneNumber"
                v-else
            ></n-input>
          </div>
          <!-- <div class="info-item">
            <span>详细地址: </span>
            <span v-if="!isEdit">{{ userInfo.addressName }} </span>
            <n-input
              style="width: 300px; margin-left: 10px"
              size="small"
              v-model="addressName"
              placeholder="请输入收货人姓名"
              @input="onInputAddressName"
              v-else
            ></n-input>
          </div> -->
          <!-- <div style="margin-top: 10px">
            <n-button type="info" v-if="!isEdit" @click="showUpd()"
              >修改信息</n-button
            >
            <n-button type="info" v-else @click="saveInfo">保存</n-button>
          </div> -->
          <div style="text-align: right">
            <span @click="goOrder()" class="pointer" style="color: #2080f0"
            >我的订单</span
            >
          </div>
        </n-card>
        <div style="margin: 30px 0 20px">地址管理</div>
        <div style="margin: 0 0 30px">
          <n-card>
            <div class="address-list">
              <div
                  class="address-item"
                  v-for="(item, index) in addressList"
                  :key="index"
              >
                <div style="flex: 1">
                  <div>{{ item.nickName }} {{ item.phoneNumber }}</div>
                  <div class="text-cut-2">{{ item.addressName }}</div>
                </div>
                <div>
                  <n-button
                      type="primary"
                      style="margin-right: 10px"
                      @click="edit(item)"
                  >修改
                  </n-button>

                  <n-popconfirm
                      positive-text="确定"
                      negative-text="取消"
                      @positive-click="handlePositiveClick(item)"
                  >
                    <template #trigger>
                      <n-button>删除</n-button>
                    </template>
                    确认删除吗？
                  </n-popconfirm>
                </div>
              </div>
              <n-empty
                  v-if="addressList.length === 0"
                  description="你还没有地址"
              >
              </n-empty>
              <div class="add">
                <n-button type="info" @click="add()">新增</n-button>
              </div>
            </div>
          </n-card>
        </div>
      </div>
    </div>
    <n-modal
        v-model:show="showModal"
        preset="dialog"
        :title="id ? '编辑地址' : '新增地址'"
    >
      <div style="margin-top: 20px">
        <p class="one-item">
          <n-input
              v-model:value="name"
              placeholder="请输入收货人姓名"
              @input="onInputName"
          ></n-input>
        </p>
        <p class="one-item">
          <n-input
              v-model:value="phone"
              placeholder="请输入手机号"
              @input="onInputPhone"
          ></n-input>
        </p>
        <p class="one-item">
          <!-- <n-input
            v-model:value="address"
            placeholder="请输入收货地址"
            @input="onInputAddress"
            v-if="id"
            disabled
          ></n-input> -->
          <!-- <n-input
            v-model="address"
            clearable
            placeholder="请输入收货地址"
            @input="onInputAddress"
            v-else
          ></n-input> -->
          <n-input
              v-model:value="address"
              clearable
              placeholder="请输入收货地址"
              @input="onInputAddress"
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
  name: "my",
  setup()
  {
    const router = useRouter();
    const message = useMessage();
    let isEdit = ref(false);
    let phoneNumber = ref("");
    let nickName = ref("");
    let addressName = ref("");
    let id = ref("");
    let name = ref("");
    let phone = ref("");
    let address = ref("");
    let addressList = ref([]);
    let userInfo = ref({});
    let showModal = ref(false);
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
      // phoneNumber.value = userInfo.value.phoneNumber;
      // nickName.value = userInfo.value.nickName;
      // addressName.value = userInfo.value.addressName;
    });

    function showUpd()
    {
      isEdit.value = true;
    }

    function onInputPhoneNumber(e)
    {
      console.log(e);
      phoneNumber.value = e;
    }

    function onInputAddressName(e)
    {
      console.log(e);
      addressName.value = e;
    }

    function onInputNickName(e)
    {
      console.log(e);
      nickName.value = e;
    }

    function onInputName(e)
    {
      console.log(e);
      name.value = e;
    }

    function onInputPhone(e)
    {
      console.log(e);
      phone.value = e;
    }

    function onInputAddress(e)
    {
      console.log(e);
      address.value = e;
    }

    function handlePositiveClick(item)
    {
      console.log(item);
      let url = `/api/customer/${userInfo.value.ID}/address/delete`;
      axios
          .post(url, {
            address: item.addressName,
          })
          .then((response) =>
          {
            if (response.data.statusCode === "successful")
            {
              message.info("删除成功");
              getAddressList();
            } else
            {
              message.info(response.data.message);
            }
          })
          .catch((error) =>
          {
          });
      // message.info("删除成功");
    }

    //获取地址列表
    function getAddressList()
    {
      axios
          .get(`/api/customer/${userInfo.value.ID}/info`, {})
          .then((response) =>
          {
            console.log(response, "获取数据");
            addressList.value = response.data.address;
          })
          .catch((error) =>
          {
            console.log(error);
          });
    }

    function goOrder()
    {
      router.push({
        path: "/order",
      });
    }

    function goHome()
    {
      router.push({
        path: "/home",
      });
    }

    function hideModel()
    {
      showModal.value = false;
    }

    function add()
    {
      id.value = "";
      showModal.value = true;
      name.value = "";
      phone.value = "";
      address.value = "";
      console.log(111);
    }

    function edit(item)
    {
      id.value = item.id || 1;
      name.value = item.nickName;
      phone.value = item.phoneNumber;
      address.value = item.addressName;
      showModal.value = true;
    }

    function sub()
    {
      if (!name.value) return message.warning("请输入收货人姓名");
      if (!phone.value) return message.warning("请输入收货人手机号");
      if (!phone.value) return message.warning("请输入手机号");
      // 正则校验
      let regPhone = /^[1][3,4,5,6,7,8][0-9]{9}$/;
      if (!regPhone.test(phone.value))
      {
        message.warning("请输入11位正确的手机号");
        return false;
      }
      if (!address.value) return message.warning("请输入收货地址");
      let url = `/api/customer/${userInfo.value.ID}/address/update`;
      if (!id.value)
      {
        url = `/api/customer/${userInfo.value.ID}/address/add`;
      }
      axios
          .post(url, {
            nickName: name.value,
            phoneNumber: phone.value,
            address: address.value,
          })
          .then((response) =>
          {
            if (response.data.statusCode == "successful")
            {
              message.info("操作成功");
              getAddressList();
              showModal.value = false;
            } else
            {
              message.info(response.data.message);
            }
          })
          .catch((error) =>
          {
            message.error("操作失败");
            console.log(error);
          });
    }

    function saveInfo()
    {
      if (!nickName.value) return message.warning("请输入姓名");
      if (!phoneNumber.value) return message.warning("请输入手机号");
      // 正则校验
      let regPhone = /^[1][3,4,5,6,7,8][0-9]{9}$/;
      if (!regPhone.test(phoneNumber.value))
      {
        message.warning("请输入11位正确的手机号");
        return false;
      }
      // if (!addressName.value) return message.warning("请输入地址");
      axios
          .post(`/api/customer/${userInfo.value.ID}/address/update`, {
            nickName: nickName.value,
            phoneNumber: phoneNumber.value,
            address: userInfo.value.addressName,
          })
          .then((response) =>
          {
            if (response.data.statusCode == "successful")
            {
              message.info("操作成功");
              localStorage.setItem(
                  "customer_infl",
                  JSON.stringify({
                    ID: userInfo.value.ID,
                    nickName: nickName.value,
                    addressName: userInfo.value.addressName,
                    phoneNumber: phoneNumber.value,
                  })
              );
              isEdit.value = false;
            } else
            {
              message.info(response.data.message);
            }
          })
          .catch((error) =>
          {
            message.error("操作失败");
            console.log(error);
          });
    }

    return {
      showUpd,
      saveInfo,
      phoneNumber,
      addressName,
      nickName,
      onInputNickName,
      onInputAddressName,
      onInputPhoneNumber,
      isEdit,
      id,
      name,
      address,
      phone,
      onInputName,
      onInputPhone,
      onInputAddress,
      sub,
      hideModel,
      edit,
      add,
      goOrder,
      getAddressList,
      goHome,
      showModal,
      addressList,
      userInfo,
      handlePositiveClick,
    };
  },
});
</script>
<style scoped lang="less">
.address-item {
  padding: 10px 0;
  border-bottom: 1px solid #f1f1f1;
  display: flex;
  justify-content: space-between;
}

.add {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.one-item {
  margin: 10px 0;
}

.info-item {
  margin: 10px 0;
  display: flex;
}
</style>