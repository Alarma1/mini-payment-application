import {createStore} from 'vuex'
import axios from 'axios';

export default createStore({
    state: {
        url:'https://tests.szapi.ru/ts3/public_html',
        listPayments:[]
    },
    actions: {
        async gettingListPayments({commit, state}) {
            try {
                const response = await axios.get(`${state.url}/payments`);
                commit('listPaymentsLoad', response.data);
            } catch (error) {
                console.error('Ошибка при выполнении запроса:', error);
            }
        }
    },
    mutations: {
        listPaymentsLoad(state,payload) {
            state.listPayments = payload;
        }
    }
})
