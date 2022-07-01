<template>
    <div class="mt-5">
        <h4>Tambah Produk</h4>
    </div>
    <form v-on:submit.prevent="create">
        <div class="mb-2">
            <label for="name">Name</label>
            <input type="text" class="form-control" v-model="name" required>
        </div>
        <div class="mb-2">
            <label for="kategori">Kategori</label>
            <select id="kategori" class="form-select" v-model="kategori_id" required>
                <option v-for="kategori in kategoris" :value="kategori.id" :key="kategori.id">
                    {{ kategori.name }}
                </option>
            </select>
        </div>
        <div class="mb-2">
            <label for="name">Deskripsi</label>
            <textarea type="text" class="form-control" v-model="deskripsi" required></textarea>
        </div>
        <div class="mb-2 clearfix">
            <button class="btn btn-primary float-right">Tambah</button>
        </div>
    </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
    setup() {
        const store = useStore()
        const router = useRouter()

        const name = ref()
        const deskripsi = ref()
        const kategori_id = ref()
        const kategoris = ref()

        store.dispatch('kategori/index').then(data => {
            kategoris.value = data
        })

        async function create() {
            let status = store.dispatch('produk/create', {
                name: name.value,
                deskripsi: deskripsi.value,
                kategori_id: kategori_id.value,
            })

            if (status) {
                router.push('/')
            } else {
                alert('Gagal menambah produk')
            }
        }

        return {
            name,
            deskripsi,
            kategori_id,
            kategoris,
            create
        }
    },
}
</script>