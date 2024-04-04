<template>
    <div class="w-full h-full rounded-md text-white"
         :class="{'bg-green-500' : fieldText === 'Confirmed','bg-orange-500' : fieldText === 'Paid','bg-gray-500' : fieldText === 'Not paid'}"
    ><p>{{ idType }}</p>
    </div>
</template>

<script setup>
    const props = defineProps(['idType', 'fieldText'])
</script>

<style scoped>

</style>
