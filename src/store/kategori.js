import axios from "axios"

export default {
    namespaced: true,
    actions: {
        async index() {
            let response = await axios.get('/kategori')

            if (response.status == 200) {
                return response.data.data
            }

            return response.data
        },
        async create(_, data) {
            let response = await axios.post('/kategori', data)

            if (response.status == 201) {
                return true
            }

            return false
        },
        async show(_, id) {
            let response = await axios.get(`/kategori/${id}`)

            if (response.status == 200) {
                return response.data
            }

            return {}
        },
        async edit(_, { id, data }) {
            let response = await axios.put(`/kategori/${id}`, data)

            if (response.status == 201) {
                return true
            }

            return false
        },
        async delete(_, id) {
            let response = await axios.delete(`/kategori/${id}`)

            if (response.status == 201) {
                return true
            }

            return false
        },
    }
}