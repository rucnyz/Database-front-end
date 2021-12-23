<template>
    <div class="supplier_login_container">
        <n-form class="supplier_login_info">
            <n-form-item>
                <n-h2>商家登陆</n-h2>
            </n-form-item>
            <n-form-item>
                <n-button @click="toRegister" 
                            class="supplier_login_to_reg" 
                            label-align='right'>注册</n-button>
            </n-form-item>
            <n-form-item label="用户名:">
                <n-input v-model:value="logInfo.username" 
                        placeholder="请输入用户名" clearable></n-input>
            </n-form-item>
            <n-form-item label="密码:">
                <n-input v-model:value="logInfo.password" 
                        placeholder="请输入密码" clearable></n-input>
            </n-form-item>
            <n-form-item>
                <n-button @click="login" attr-type="button">登陆</n-button>
            </n-form-item>
        </n-form>
    </div>
</template>


<script setup lang="ts">
import { reactive } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import router from '@/router';
const loginStore = useStore()

const logInfo = reactive({
    username: "",
    password: "",
})

function login(){
    loginStore.dispatch("supplier/login",{id:logInfo.username,passwd:logInfo.password})
}

function toRegister(){
    router.push("/supplier/register")
}

</script>

<style lang="less">
.supplier_login_container{
    width: 25%;
    height: 30%;
    margin-left: 35%;
    margin-top: 10%;
    margin-bottom: 0%;
    
}

.supplier_login_to_reg{
    border:0px
}
// .supplier_login_info {
//     n-form-item{
//         width: 100%
//     }
// }
</style>