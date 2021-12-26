<template>
    <n-button @click="getData">刷新</n-button>
    <n-data-table
        remote
        ref="table"
        :columns="columns" 
        :data="data"
        :max-height="400"
        virtual-scroll />

</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { NDataTable, NButton } from 'naive-ui';
import axios from 'axios';
import { onMounted, ref } from 'vue';
const route = useRoute()
const supplier_id = route.params.id
type order_raw = { key: number; customer_id: string; order_date: string; product_name: string; product_quantity: string; sum_price: number; }
const columns = [
    {
        title: "顾客ID",
        key: "customer_id",
    },
    {
        title: "下单时间",
        key: "order_date",
        sorter: true,
    },
    {
        title: "商品名称",
        key: "product_name",
        ellipsis: true
    },
    {
        title: "数量",
        key: "product_quantity"
    },
    {
        title: "总金额",
        key: "sum_price",
    },
]

const data = ref<order_raw[]>([])

function getData(){
    axios.post(`/api/supplier/${supplier_id}/orders`)
    .then(
        (res:{data:any})=>{
            
            const temp_data: { 顾客ID: string; 下单时间: string; 商品名称: string, 商品数量:string, 订单总额: number }[] = res.data['detail']  
            data.value =  Array.apply(null, Array(temp_data.length))
                .map( (_, index) => ({
                        key: index,
                        customer_id: temp_data[index].顾客ID,
                        order_date: temp_data[index].下单时间,
                        product_name: temp_data[index].商品名称,
                        product_quantity: temp_data[index].商品数量,
                        sum_price: temp_data[index].订单总额
                    })
                )
        }
    )
}

onMounted(()=>getData())

</script>