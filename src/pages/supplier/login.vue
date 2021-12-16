<template>
    <div class="supplier_login_container">
        <n-form class="supplier_login_info">
            <n-form-item>
                <n-h2>商家登陆</n-h2>
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
                <n-button @click="handleClick" attr-type="button">验证</n-button>
            </n-form-item>
        </n-form>
    </div>
</template>


<script setup lang="ts">
import { reactive } from 'vue';
import { useStore } from 'vuex'
const loginStore = useStore()

const logInfo = reactive({
    username: "",
    password: "",
})

function handleClick(){
    loginStore.dispatch("supplier/login",{id:logInfo.username,passwd:logInfo.password})
}

</script>

<style lang="less">
.supplier_login_container{
    width: 25%;
    height: 20%;
    margin-left: 35%;
    margin-top: 15%;
    margin-bottom: 0%;
    
}
// .supplier_login_info {
//     n-form-item{
//         width: 100%
//     }
// }
</style>