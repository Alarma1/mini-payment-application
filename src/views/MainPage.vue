<template>
    <body class="border-t-4 border-black">
    <div class="px-4 pt-1.5 w-full">
        <h1 class="mb-3">Список платежей</h1>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4" @click="openModal">
            Добавить платеж
        </button>
        <div class="flex pb-4  mb-4 border-b-border-b-2">
            <div>
                <p>Дата платежа</p>
                <div class="w-48 px-1.5 py-1 border rounded mr-2">
                    <InputComponent typeInput="date" :placeholderInput="'дд.мм.гггг'"/>
                </div>
            </div>
            <div>
                <p>Источник платежа</p>
                <div class="w-56 px-1.5 py-1 border rounded">
                    <InputComponent typeInput="select" :placeholderInput="'Все источники'"
                                    :options="['Источник платежа','Карта','Наличные','Перевод']"/>
                </div>
            </div>
        </div>
        <table cellpadding="15" class="w-full border-collapse mb-4">
            <thead>
            <tr>
                <th class="border-b-2">Клиент</th>
                <th class="border-b-2">Договор №</th>
                <th class="border-b-2">Тип оплаты</th>
                <th class="border-b-2">Дата оплаты</th>
                <th class="border-b-2">Сумма оплаты (руб)</th>
                <th class="border-b-2">Источник платежа</th>
                <th class="border-b-2">Статус платежа</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(payment, index) in store.state.listPayments" :key="index">
                <td align="center" class="border-b-2">{{ payment.client }}</td>
                <td align="center" class="border-b-2">{{ payment.contract }}</td>
                <td align="center" class="border-b-2">{{ payment.type_id }}</td>
                <td align="center" class="border-b-2">{{ payment.date }}</td>
                <td align="center" class="border-b-2">{{ payment.summ }}</td>
                <td align="center" class="border-b-2">{{ payment.source_id }}</td>
                <td align="center" class="border-b-2">{{ payment.status_id }}</td>
            </tr>
            </tbody>
        </table>
    </div>
    </body>
</template>

<script setup>
    import InputComponent from '../components/InputComponent.vue';
    import {ref, onMounted} from 'vue'
    import {useStore} from 'vuex'

    const store = useStore()
    const modalForm = ref(false)
    const openModal = () => {
        modalForm.value = !modalForm.value
        console.log(store)
    }
    onMounted(() => {
        store.dispatch('gettingListPayments');
    })

</script>

<style scoped>

</style>

