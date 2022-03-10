import { createStore } from 'vuex'
import axios from "axios";

const store = createStore({
    state () {
        return {
            products: [],
            total_count: 0,
        }
    },
    mutations: {
        SET_PRODUCTS_TO_STATE(state, products) {
            state.products = products
        },
        SET_TOTAL_COUNT_PRODUCT(state, count) {
            state.total_count = count
        }
    },
    actions: {
        GET_PRODUCTS_FROM_API({commit}, current_page) {
            return axios(`http://testtask.alto.codes/front-products.php?skip=${(current_page * 4) - 4}`, {
                method: "GET"
            })
                .then((response) => {
                    commit('SET_PRODUCTS_TO_STATE', response.data.products)
                    commit('SET_TOTAL_COUNT_PRODUCT', response.data.totalCount)
                    return response.data;
                })
                .catch((error) => {
                    console.log(error)
                    return error;
                })
        }
    }
})

export default store
