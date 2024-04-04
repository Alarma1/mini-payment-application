import {createStore} from 'vuex'
import axios from 'axios';

export default createStore({
    state: {
        url: 'https://tests.szapi.ru/ts3/public_html',
        listPayments: [],
        allSources: [],
        allStatuses: [],
        allTypes: [],
    },
    actions: {
        async gettingListPayments({commit, state}, valueInput) {
            try {
                const response = await axios.get(`${state.url}/payments`, {
                    params: valueInput
                });
                commit('listPaymentsLoad', response.data);
            } catch (error) {
                console.error('Ошибка при получения списка платежей:', error);
            }
        },
        async gettingAllTypes({commit, state}) {
            try {
                const response = await axios.get(`${state.url}/form_tss`);
                commit('allTypesLoad', response.data);
            } catch (error) {
                console.error('Ошибка при выполнении запроса получения типов:', error);
            }
        },
        async addPayment({commit, state}, paymentDetails) {
            try {
                const response = await axios.post(`${state.url}/payments`, paymentDetails);
                console.log('Успешно добавлена:', response.data);
            } catch (error) {
                console.error('Ошибка при выполнении запроса получения типов:', error);
            }
        },
    },
    mutations: {
        listPaymentsLoad(state, payload) {
            state.listPayments = payload;
        },
        allTypesLoad(state, payload) {
            state.allSources = payload.sources;
            state.allStatuses = payload.statuses;
            state.allTypes = payload.types;
        }
    }
})
