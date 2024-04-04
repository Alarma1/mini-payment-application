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
                <div class="w-48 h-[35px] mr-2">
                    <InputComponent typeInput="date"
                                    :placeholderInput="'дд.мм.гггг'"
                                    @happenedChoice="changeValue"/>
                </div>
            </div>
            <div>
                <p>Источник платежа</p>
                <div class="w-56 h-[35px]">
                    <InputComponent typeInput="select"
                                    :placeholderInput="'Все источники'"
                                    :arrOptions="allSources"
                                    @happenedChoice="changeValue"/>
                </div>
            </div>
        </div>
        <table cellpadding="15" class="w-full border-collapse mb-4">
            <thead>
            <tr>
                <th class="border-b-2">
                    <div class="flex justify-center items-center">
                        <div>
                            <p>Клиент</p>
                        </div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                 class="w-4 h-4">
                                <path fill-rule="evenodd"
                                      d="M5.22 10.22a.75.75 0 0 1 1.06 0L8 11.94l1.72-1.72a.75.75 0 1 1 1.06 1.06l-2.25 2.25a.75.75 0 0 1-1.06 0l-2.25-2.25a.75.75 0 0 1 0-1.06ZM10.78 5.78a.75.75 0 0 1-1.06 0L8 4.06 6.28 5.78a.75.75 0 0 1-1.06-1.06l2.25-2.25a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1 0 1.06Z"
                                      clip-rule="evenodd"/>
                            </svg>
                        </div>
                    </div>
                </th>
                <th class="border-b-2">Договор №</th>
                <th class="border-b-2">
                    <div class="flex justify-center items-center">
                        <div>
                            <p>Тип платежа</p>
                        </div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                 class="w-4 h-4">
                                <path fill-rule="evenodd"
                                      d="M5.22 10.22a.75.75 0 0 1 1.06 0L8 11.94l1.72-1.72a.75.75 0 1 1 1.06 1.06l-2.25 2.25a.75.75 0 0 1-1.06 0l-2.25-2.25a.75.75 0 0 1 0-1.06ZM10.78 5.78a.75.75 0 0 1-1.06 0L8 4.06 6.28 5.78a.75.75 0 0 1-1.06-1.06l2.25-2.25a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1 0 1.06Z"
                                      clip-rule="evenodd"/>
                            </svg>
                        </div>
                    </div>
                </th>
                <th class="border-b-2">
                    <div class="flex justify-center items-center">
                        <div>
                            <p>Дата</p>
                        </div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                 class="w-4 h-4">
                                <path fill-rule="evenodd"
                                      d="M5.22 10.22a.75.75 0 0 1 1.06 0L8 11.94l1.72-1.72a.75.75 0 1 1 1.06 1.06l-2.25 2.25a.75.75 0 0 1-1.06 0l-2.25-2.25a.75.75 0 0 1 0-1.06ZM10.78 5.78a.75.75 0 0 1-1.06 0L8 4.06 6.28 5.78a.75.75 0 0 1-1.06-1.06l2.25-2.25a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1 0 1.06Z"
                                      clip-rule="evenodd"/>
                            </svg>
                        </div>
                    </div>
                </th>
                <th class="border-b-2">Сумма оплаты (руб)</th>
                <th class="border-b-2">Источник платежа</th>
                <th class="border-b-2">
                    <div class="flex justify-center items-center">
                        <div>
                            <p>Статус</p>
                        </div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                 class="w-4 h-4">
                                <path fill-rule="evenodd"
                                      d="M5.22 10.22a.75.75 0 0 1 1.06 0L8 11.94l1.72-1.72a.75.75 0 1 1 1.06 1.06l-2.25 2.25a.75.75 0 0 1-1.06 0l-2.25-2.25a.75.75 0 0 1 0-1.06ZM10.78 5.78a.75.75 0 0 1-1.06 0L8 4.06 6.28 5.78a.75.75 0 0 1-1.06-1.06l2.25-2.25a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1 0 1.06Z"
                                      clip-rule="evenodd"/>
                            </svg>
                        </div>
                    </div>
                </th>
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
                <td align="center" class="border-b-2">
                    <div class="h-7">
                        <ColorField :fieldText="remakeNameStatus(payment.status_id)"
                                    :idType="findStatus(payment.status_id)"/>
                    </div>

                </td>
            </tr>
            </tbody>
        </table>
    </div>
    <transition
            enter-active-class="duration-500 ease-out"
            enter-from-class="transform opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="duration-200 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="transform opacity-0"
    >
        <div v-if="modalForm"
             class="transition-opacity opacity-0 fixed z-10 w-full h-full top-0 left-0 bg-black bg-opacity-40">
            <div class="w-[500px] h-[500px] top-5 left-0 bottom-0 right-0 fixed margin-y-0 margin-x-auto bg-white m-auto rounded-md">
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
                                <h3><span class="mr-1 text-red-500">*</span>Клиент:</h3>
                            </div>
                        </div>
                        <div class="w-56">
                            <InputComponent typeInput="text"
                                            nameTitle="client"
                                            :placeholderInput="'Введите ФИО'"
                                            :initialValue="paymentDetails.client"
                                            :validationProp="validationValue"
                                            @happenedChoice="changeValueModal('client',$event)"/>
                        </div>
                    </div>
                    <div class="flex mb-3.5">
                        <div class="w-6/12 flex justify-end items-center">
                            <div class="pr-2.5">
                                <h3><span class="mr-1 text-red-500">*</span>Договор №:</h3>
                            </div>
                        </div>
                        <div class="w-56">
                            <InputComponent typeInput="text"
                                            nameTitle="contract"
                                            :placeholderInput="'Введите номер договора'"
                                            :initialValue="paymentDetails.contract"
                                            :validationProp="validationValue"
                                            @happenedChoice="changeValueModal('contract',$event)"/>
                        </div>
                    </div>
                    <div class="flex mb-3.5">
                        <div class="w-6/12 flex justify-end items-center">
                            <div class="pr-2.5">
                                <h3><span class="mr-1 text-red-500">*</span>Тип оплаты:</h3>
                            </div>
                        </div>
                        <div class="w-56">
                            <InputComponent typeInput="select"
                                            nameTitle="type_id"
                                            :arrOptions="allTypes"
                                            :placeholderInput="'Не выбрано'"
                                            :initialValue="paymentDetails.type_id"
                                            :validationProp="validationValue"
                                            @happenedChoice="changeValueModal('type_id',$event)"/>
                        </div>
                    </div>
                    <div class="flex mb-3.5">
                        <div class="w-6/12 flex justify-end items-center">
                            <div class="pr-2.5">
                                <h3><span class="mr-1 text-red-500">*</span>Дата оплаты:</h3>
                            </div>
                        </div>
                        <div class="w-56">
                            <InputComponent typeInput="date"
                                            nameTitle="date"
                                            :placeholderInput="'дд.мм.гггг'"
                                            :initialValue="paymentDetails.date"
                                            :validationProp="validationValue"
                                            @happenedChoice="changeValueModal('date',$event)"/>
                        </div>
                    </div>
                    <div class="flex mb-3.5">
                        <div class="w-6/12 flex justify-end items-center">
                            <div class="pr-2.5">
                                <h3><span class="mr-1 text-red-500">*</span>Сумма оплаты:</h3>
                            </div>
                        </div>
                        <div class="w-56">
                            <InputComponent typeInput="number"
                                            nameTitle="summ"
                                            :placeholderInput="'Введите сумму'"
                                            :initialValue="paymentDetails.summ"
                                            :validationProp="validationValue"
                                            @happenedChoice="changeValueModal('summ',$event)"/>
                        </div>
                    </div>
                    <div class="flex mb-3.5">
                        <div class="w-6/12 flex justify-end items-center">
                            <div class="pr-2.5">
                                <h3><span class="mr-1 text-red-500">*</span>Источник платежа:</h3>
                            </div>
                        </div>
                        <div class="w-56">
                            <InputComponent typeInput="select"
                                            nameTitle="source_id"
                                            :placeholderInput="'Выберите источник'"
                                            :arrOptions="allSources"
                                            :initialValue="paymentDetails.source_id"
                                            :validationProp="validationValue"
                                            @happenedChoice="changeValueModal('source_id',$event)"/>
                        </div>
                    </div>
                    <div class="flex mb-3.5">
                        <div class="w-6/12 flex justify-end items-center">
                            <div class="pr-2.5">
                                <h3><span class="mr-1 text-red-500">*</span>Статус:</h3>
                            </div>
                        </div>
                        <div class="w-56">
                            <InputComponent typeInput="select"
                                            nameTitle="status_id"
                                            :placeholderInput="'Выберите статус'"
                                            :arrOptions="allStatuses"
                                            :initialValue="paymentDetails.status_id"
                                            :validationProp="validationValue"
                                            @happenedChoice="changeValueModal('status_id',$event)"/>
                        </div>
                    </div>
                </div>
                <div class="py-4 pl-6 pr-3 mt-6 flex justify-between items-center border-t-2">
                    <button @click="openModal">Отмена
                    </button>
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            @click="addPayment">Добавить оплату
                    </button>
                </div>
            </div>
        </div>
    </transition>
    </body>
</template>

<script setup>
    import InputComponent from '../components/InputComponent.vue';
    import ColorField from '../components/ColorField.vue';
    import {ref, onMounted, computed} from 'vue'
    import {useStore} from 'vuex'

    const store = useStore()
    const modalForm = ref(false)
    const calendarDate = ref(null)
    const typeSource = ref(null)
    const paymentDetails = ref({})
    const validationValue = ref(false)
    const listPayments = computed(() => store.state.listPayments)
    const allSources = computed(() => store.state.allSources)
    const allStatuses = computed(() => store.state.allStatuses)
    const allTypes = computed(() => store.state.allTypes)
    const openModal = () => {
        modalForm.value = !modalForm.value
        validationValue.value = false
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
    const remakeNameStatus = (id) => {
        const status = store.state.allStatuses.find((item) => {
            return item.id === id
        })
        if (status?.id === 1) {
            return 'Not paid'
        }
        if (status?.id === 2) {
            return 'Paid'
        }
        if (status?.id === 3) {
            return 'Confirmed'
        }
    }
    const changeValue = (emitEvent) => {
        if (emitEvent.type === 'input') {
            calendarDate.value = emitEvent.value.target.value
        }
        if (emitEvent.type === 'select') {
            typeSource.value = emitEvent.value.target.value
        }
        store.dispatch('gettingListPayments', {data: calendarDate.value, source_id: typeSource.value});
    }
    const changeValueModal = (nameInput, emitEvent) => {
        paymentDetails.value[nameInput] = emitEvent.value.target.value

    }
    const addPayment = async () => {
        validationValue.value = true
        if (paymentDetails.value.client === '' || paymentDetails.value.client === null || paymentDetails.value.client === undefined) {
            return;
        }
        if (paymentDetails.value.contract === '' || paymentDetails.value.contract === null || paymentDetails.value.contract === undefined) {
            return;
        }
        if (paymentDetails.value.date === '' || paymentDetails.value.date === null || paymentDetails.value.date === undefined) {
            return;
        }
        if (paymentDetails.value.source_id === '' || paymentDetails.value.source_id === null || paymentDetails.value.source_id === undefined) {
            return;
        }
        if (paymentDetails.value.status_id === '' || paymentDetails.value.status_id === null || paymentDetails.value.status_id === undefined) {
            return;
        }
        if (paymentDetails.value.summ === '' || paymentDetails.value.summ === null || paymentDetails.value.summ === undefined) {
            return;
        }
        if (paymentDetails.value.type_id === '' || paymentDetails.value.type_id === null || paymentDetails.value.type_id === undefined) {
            return;
        }
        await store.dispatch('addPayment', paymentDetails.value);
        await store.dispatch('gettingListPayments');
        paymentDetails.value = {}
        openModal()
    }
    onMounted(() => {
        store.dispatch('gettingListPayments');
        store.dispatch('gettingAllTypes');
    })

</script>

<style scoped>

</style>

