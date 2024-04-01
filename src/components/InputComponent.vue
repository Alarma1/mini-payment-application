<template>
    <input class="w-full h-full" v-if="typeInput !== 'select'" :type="typeInput" :placeholder="placeholderInput">
    <select class="w-full h-full" v-if="typeInput === 'select'">
        <option :value="placeholderInput" selected>{{ placeholderInput }}</option>
        <option v-for="(option, index) in options" :key="index" :value="option">{{ option }}</option>
    </select>
</template>

<script setup>
    const props = defineProps(['typeInput', 'placeholderInput', 'options'])
</script>

<style scoped>

</style>
