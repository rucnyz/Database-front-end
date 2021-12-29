<template>
    <n-space>
        <n-button @click="getData">刷新</n-button>
        <n-button @click="showForm = !showForm">添加</n-button>
        <n-button @click="remove_product">删除</n-button>
    </n-space>
    <br>
    <template v-if="showForm">
        <n-form inline>
            <n-form-item label="图片地址" >
                <n-input placeholder="请输入图片的地址" v-model:value="pic_url"/>
            </n-form-item>
            <n-form-item label="商品名称">
                <n-input placeholder="请输入商品的名称" v-model:value="product_name"/>
            </n-form-item>
            <n-form-item label="商品价格（单价）">
                <n-input-number placeholder="请输入商品的价格" v-model:value="product_price" />
            </n-form-item>
            <n-form-item label="商品库存">
                <n-input placeholder="请输入商品的库存" v-model:value="product_remain"/>
            </n-form-item>
            <n-form-item label="商品类别">
                <n-input placeholder="请输入商品的类别" v-model:value="product_category" />
            </n-form-item>
            <n-form-item label="商品规格">
                <n-input placeholder="请输入商品的规格" v-model:value="product_size" />
            </n-form-item>
            <n-form-item label="商品折扣">
                <n-input-number placeholder="请输入商品的规格" v-model:value="product_discount" />
            </n-form-item>
            <n-form-item>
                <n-button @click="add_product">提交</n-button>
            </n-form-item>
        </n-form>
    </template>
    <n-data-table
        remote
        ref="table"
        :columns="columns"
        :data="data"
        :max-height="500"
        @update:checked-row-keys="handleCheck"
        virtual-scroll
    />
</template>

<script setup lang="ts">
import { NButton, NSpace, NDataTable, NInputNumber, NInput, NImage, NForm, NFormItem } from 'naive-ui';
import { TableColumn } from 'naive-ui/lib/data-table/src/interface';
import { onMounted, ref, h } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
type product_raw = { key: number, product_id: string, product_pic: string, product_name: string, product_price: number, product_sold: number };
const route = useRoute()
const router = useRouter()
const supplier_id = route.params.id


//这里必须手动推断类型，自动匹配似乎有一些问题
const col_sel: TableColumn = { type: 'selection' }
const columns = [
    col_sel,
    {
        title: "商品ID",
        key: "product_id"
    },
    {
        title: "商品图片",
        key: "product_pic",
        render: (rowData: product_raw, _: number) => { return h(NImage, { src: rowData.product_pic }) },
    },
    {
        title: "商品名称",
        key: "product_name",
        ellipsis: true
    },
    {
        title: "商品价格",
        key: "product_price"
    },
    {
        title: "商品销量",
        key: "product_sold"
    }
]



const data = ref<product_raw[]>([])
function getData(): void {
    axios.post(`/api/supplier/${supplier_id}/homepage`)
        .then(
            (res: { data: any }) => {
                const temp_data: { 商品ID: string, 商品图片: string, 商品名称: string, 商品价格: number, 商品销量: number }[] = res.data['details']
                data.value = Array.apply(null, Array(temp_data.length))
                    .map((_, index) => ({
                        key: index,
                        product_id: temp_data[index].商品ID,
                        product_pic: temp_data[index].商品图片,
                        product_name: temp_data[index].商品名称,
                        product_price: temp_data[index].商品价格,
                        product_sold: temp_data[index].商品销量
                    })
                    )
            }
        )
}

onMounted(() => getData())
const to_delete = ref<product_raw[]>([])

function handleCheck(rowKeys: (string | number)[]): void {
    to_delete.value = Array.apply(null, Array(rowKeys.length)).map((_, index) => { return data.value[rowKeys[index]] })
}

function remove_product() {
    for (let i = 0; i < to_delete.value.length; i++) {
        let id_i = to_delete.value[i].product_id
        axios.post(`/api/supplier/${supplier_id}/product/delete`, { "product_id": id_i })
    }
    // 直接刷新当前页面
    router.go(0)
}




const showForm = ref(false)
const pic_url = ref("")
const product_name = ref("")
const product_category = ref("")
const product_remain = ref("")
const product_price = ref(0)
const product_size = ref("")
const product_discount = ref(0)

function add_product(){
    axios.post(`/api/supplier/${supplier_id}/product/add`,{
        "product_name":product_name.value,
        "price":product_price.value,
        "remain":product_remain.value,
        "size":product_size.value,
        "discount":product_discount.value,
        "category":product_category.value,
        "pic_url":pic_url.value
    })
    .then((res:{data:any}) => {console.log(res.data)})
    .catch(e=>{console.log(e)})
    router.go(0)
}

</script>