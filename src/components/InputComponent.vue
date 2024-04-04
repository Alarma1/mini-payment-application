<template>
    <input class="w-full h-full px-1.5 py-1 border rounded placeholder-slate-500 text-slate-500"
           :class="{'border-red-500' : checkValue}"
           v-if="typeInput !== 'select'"
           :type="typeInput"
           :name="nameTitle"
           :placeholder="placeholderInput"
           :value="initialValue"
           @change="changeValue({type:'input',value:$event})">
    <select class="w-full h-full px-1.5 py-1 border rounded text-slate-500"
            :class="{'border-red-500' : checkValue}"
            :name="nameTitle"
            v-if="typeInput === 'select'"
            :value="initialValue"
            @change="changeValue({type:'select',value:$event})">
        <option v-if="placeholderInput !== '' && placeholderInput !== null && placeholderInput !== undefined" value=""
                disabled :selected="checkValue" hidden>{{ placeholderInput }}
        </option>
        <option v-for="(item, index) in arrOptions" :key="index" :value="item.id"
                :selected="initialValue === item.id">
            {{ item.title }}
        </option>
    </select>
</template>

<script setup>
    import {computed} from 'vue'

    const props = defineProps(['nameTitle', 'typeInput', 'placeholderInput', 'arrOptions', 'initialValue', 'validationProp'])
    const emit = defineEmits(['happenedChoice'])
    const checkValue = computed(() => (props.initialValue === '' || props.initialValue === null || props.initialValue === undefined) && props.validationProp)
    const changeValue = (event) => {
        emit('happenedChoice', event)
    }
</script>

<style scoped>

</style>
