<template>
    <body class="border-t-4 border-black">
    <div class="px-4 pt-1.5 w-full relative z-0">
        <h1 class="mb-3">Список платежей</h1>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4" @click="openModal">
            Добавить платеж
        </button>
        <div class="flex pb-4 mb-4 border-b-2">
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
            <tr v-for="(payment, index) in listPayments" :key="index">
                <td align="center" class="border-b-2">{{ payment.client }}</td>
                <td align="center" class="border-b-2">{{ payment.contract }}</td>
                <td align="center" class="border-b-2">{{ findType(payment.type_id) }}</td>
                <td align="center" class="border-b-2">{{ payment.date }}</td>
                <td align="center" class="border-b-2">{{ formatNumber(payment.summ) }}</td>
                <td align="center" class="border-b-2">{{ findSource(payment.source_id) }}</td>
                <td align="center" class="border-b-2">{{ findStatus(payment.status_id) }}</td>
            </tr>
            </tbody>
        </table>
    </div>
    <div :class="{'opacity-100 fixed' :modalForm}" class="transition-opacity opacity-0 duration-500 w-full h-full top-0 left-0 z-10 none bg-black bg-opacity-40">
        <div class="w-[500px] h-[450px] top-5 left-0 bottom-0 right-0 fixed margin-y-0 margin-x-auto bg-white m-auto rounded-md">
            <div class="py-3 px-3 mb-6 flex justify-between items-center border-b-2">
                <h1>Добавление нового платежа</h1>
                <button @click="openModal">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>
            <div>
                <div class="flex mb-3.5">
                    <div class="w-6/12 flex justify-end items-center">
                        <div class="pr-2.5">
                            <h3><span class="mr-1 text-red-500">*</span>Клиент</h3>
                        </div>
                    </div>
                    <div class="w-56 px-1.5 py-1 border rounded ">
                        <InputComponent typeInput="text" nameTitle="client" :placeholderInput="'Введите ФИО'"/>
                    </div>
                </div>
                <div class="flex mb-3.5">
                    <div class="w-6/12 flex justify-end items-center">
                        <div class="pr-2.5">
                            <h3><span class="mr-1 text-red-500">*</span>Договор №</h3>
                        </div>
                    </div>
                    <div class="w-56 px-1.5 py-1 border rounded ">
                        <InputComponent typeInput="number" nameTitle="contract"
                                        :placeholderInput="'Введите номер договора'"/>
                    </div>
                </div>
                <div class="flex mb-3.5">
                    <div class="w-6/12 flex justify-end items-center">
                        <div class="pr-2.5">
                            <h3><span class="mr-1 text-red-500">*</span>Тип оплаты:</h3>
                        </div>
                    </div>
                    <div class="w-56 px-1.5 py-1 border rounded ">
                        <InputComponent typeInput="select" nameTitle="type_id" :placeholderInput="'Не выбрано'"/>
                    </div>
                </div>
                <div class="flex mb-3.5">
                    <div class="w-6/12 flex justify-end items-center">
                        <div class="pr-2.5">
                            <h3><span class="mr-1 text-red-500">*</span>Дата оплаты:</h3>
                        </div>
                    </div>
                    <div class="w-56 px-1.5 py-1 border rounded ">
                        <InputComponent typeInput="date" nameTitle="date" :placeholderInput="'дд.мм.гггг'"/>
                    </div>
                </div>
                <div class="flex mb-3.5">
                    <div class="w-6/12 flex justify-end items-center">
                        <div class="pr-2.5">
                            <h3><span class="mr-1 text-red-500">*</span>Сумма оплаты:</h3>
                        </div>
                    </div>
                    <div class="w-56 px-1.5 py-1 border rounded ">
                        <InputComponent typeInput="number" nameTitle="summ" :placeholderInput="'Введите сумму'"/>
                    </div>
                </div>
                <div class="flex mb-3.5">
                    <div class="w-6/12 flex justify-end items-center">
                        <div class="pr-2.5">
                            <h3><span class="mr-1 text-red-500">*</span>Статус:</h3>
                        </div>
                    </div>
                    <div class="w-56 px-1.5 py-1 border rounded ">
                        <InputComponent typeInput="select" nameTitle="status_id" :placeholderInput="'Не оплачено'"/>
                    </div>
                </div>
            </div>
            <div class="py-4 pl-6 pr-3 mt-6 flex justify-between items-center border-t-2">
                <button @click="openModal">Отмена</button>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="openModal">
                    Добавить оплату
                </button>
            </div>
        </div>
    </div>
    </body>
</template>

<script setup>
    import InputComponent from '../components/InputComponent.vue';
    import {ref, onMounted, computed} from 'vue'
    import {useStore} from 'vuex'

    const store = useStore()
    const modalForm = ref(false)
    const listPayments = computed(() => store.state.listPayments)
    const openModal = () => {
        modalForm.value = !modalForm.value
    }
    const findType = (id) => {
        const status = store.state.allTypes.find((item) => {
            return item.id === id
        })
        return status?.title
    }
    const formatNumber = (number) => {
        const parts = number.toString().split('.');
        if (parts.length === 2 && parseInt(parts[1]) !== 0) {
            return number.toFixed(2);
        } else {
            return Math.round(number);
        }
    }
    const findSource = (id) => {
        const status = store.state.allSources.find((item) => {
            return item.id === id
        })
        return status?.title
    }
    const findStatus = (id) => {
        const status = store.state.allStatuses.find((item) => {
            return item.id === id
        })
        return status?.title
    }
    onMounted(() => {
        store.dispatch('gettingListPayments');
        store.dispatch('gettingAllTypes');
    })

</script>

<style scoped>

</style>

