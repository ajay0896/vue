import axios from "axios";
import { createStore } from "vuex";
import produk from "./produk"
import kategori from "./kategori";

function initialState() {
    const token = localStorage.getItem('token')
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token

    return {
        token: token
    }
}

var store = createStore({
    state: initialState(),
    getters: {
        isLoggedIn(state) {
            return state.token != null
        },
    },
    actions: {
        async login({ commit }, payload) {
            let response = await axios.post('/login', payload)

            if (response.status == 200) {
                commit('SET_TOKEN', response.data.token)

                return true
            }

            return false
        },
        async logout({ commit }) {
            let response = await axios.post('/logout')

            if (response.status == 200) {
                commit('CLEAR_TOKEN')

                return true
            }

            return false
        }
    },
    modules: {
        produk,
        kategori
    },
    mutations: {
        SET_TOKEN(state, payload) {
            state.token = payload

            localStorage.setItem("token", payload)

            axios.defaults.headers.common['Authorization'] = 'Bearer ' + state.token
        },
        CLEAR_TOKEN(state) {
            state.token = null

            localStorage.removeItem("token")

            delete axios.defaults.headers.common['Authorization']
        }
    },
})

export default store