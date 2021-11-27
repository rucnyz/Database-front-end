<template>
    <n-button @click="getList">click here to test</n-button>
    <h1>{{message}}</h1>
</template>

<script setup lang="ts">
    import { ref,inject } from 'vue'
    const axios:any = inject("axios")
    const message = ref("hello")
    function getList(): void {
        axios.post("test", {
            "version": "0.1",
            "test": "hello"
            })
            .then((response: { data: any; }) => {
                console.log(response.data);
                message.value = response.data;
            })
            .catch((error: any) => {
                console.log(error);
            });
    }
</script>