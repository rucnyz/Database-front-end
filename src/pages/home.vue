<template>
    <n-pageheader>header</n-pageheader>
    <h1>welcome to {{message}}</h1>
    <router-link to="/about">go to about</router-link><br>
    <router-link to="/register">go to register</router-link><br>
    <router-link to="/login">go to login</router-link><br>
    

</template>

<script setup lang="ts">
    const message = "the home page"
    
</script>