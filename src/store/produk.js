import axios from "axios"

export default {
    namespaced: true,
    actions: {
        async index() {
            let response = await axios.get('/produk')

            if (response.status == 200) {
                return response.data.data
            }

            return []
        },
        async create(_, data) {
            let response = await axios.post('/produk', data)

            if (response.status == 201) {
                return true
            }

            return false
        },
        async show(_, id) {
            let response = await axios.get(`/produk/${id}`)

            if (response.status == 200) {
                return response.data
            }

            return {}
        },
        async edit(_, { id, data }) {
            let response = await axios.put(`/produk/${id}`, data)

            if (response.status == 201) {
                return true
            }

            return false
        },
        async delete(_, id) {
            let response = await axios.delete(`/produk/${id}`)

            if (response.status == 201) {
                return true
            }

            return false
        },
    }
}