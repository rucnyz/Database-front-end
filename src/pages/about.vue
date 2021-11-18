<template>
    <h1>welcome to {{message}}</h1>
    <router-link to="/home">go home</router-link>
</template>

<script setup lang="ts">
    const message = "the about page"
</script>