<template>
    <div class="w-full h-full rounded-md text-white"
         :class="{'bg-green-500' : fieldText === 'Confirmed','bg-orange-500' : fieldText === 'Paid','bg-gray-500' : fieldText === 'Not paid'}"
    ><p>{{ idType }}</p>
    </div>
</template>

<script setup>
    const props = defineProps({
        idType: {
            type: String,
            default: null,
        },
        fieldText: {
            type: String,
            default: null,
        }
    })
</script>

<style scoped>

</style>
