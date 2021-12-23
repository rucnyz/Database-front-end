<template>
    <div class="supplier_register_container">
        <n-form class="supplier_register_info">
            <n-form-item>
                <n-h2>商家注册</n-h2>
            </n-form-item>
            <n-form-item label="姓名:">
                <n-input v-model:value="registerInfo.onwer_name" 
                        placeholder="请输入您的姓名" clearable></n-input>
            </n-form-item>
            <n-form-item label="身份证号:">
                <n-input v-model:value="registerInfo.onwer_id" 
                        placeholder="请输入您的身份证号" clearable></n-input>
            </n-form-item>
            <n-form-item label="密码:">
                <n-input v-model:value="registerInfo.password" 
                        placeholder="请输入密码" clearable></n-input>
            </n-form-item>
            <n-form-item label="店铺名称:">
                <n-input v-model:value="registerInfo.supplier_name" 
                        placeholder="请输入店铺名称" clearable></n-input>
            </n-form-item>
            <n-form-item>
                <n-button @click="handleClick" attr-type="button">验证</n-button>
            </n-form-item>
        </n-form>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { reactive } from 'vue';
import { getEncrypt } from '@/api/index'
import { useRouter } from 'vue-router';

const router = useRouter()
const registerInfo = reactive({
    onwer_name:"",
    onwer_id:"",
    supplier_name:"",
    password:""
})

function handleClick(){
    axios.post("/api/supplier/register",{'ownerName':registerInfo.onwer_name,
                                            'ownerID':registerInfo.onwer_id,
                                            'password':getEncrypt(registerInfo.password),
                                            'supplierName':registerInfo.supplier_name})
        .then((response:{data:any})=>{
            if(response.data == "successful"){
                router.push("supplier/register")
            }
        })
        .catch((err:any)=>{console.log(err)})
}
</script>

<style lang="less">
.supplier_register_container{
    width: 25%;
    height: 30%;
    margin-left: 35%;
    margin-top: 8%;
    margin-bottom: 0%;
    
}
</style>