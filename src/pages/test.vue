<template>
  <n-button @click="getList">click here to test</n-button>
  <h1>{{ message }}</h1>
</template>

<script setup lang="ts">
import {ref, inject} from 'vue'
import { useMessage} from "naive-ui";

const axios: any = inject("axios")
const message = useMessage()
message.info("hello")

</script>