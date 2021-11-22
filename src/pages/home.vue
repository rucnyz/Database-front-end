<template>
    <h1>welcome to {{message}}</h1>
    <router-link to="/about">go to about</router-link><br>

</template>

<script setup lang="ts">
    const message = "the home page"
    
</script>