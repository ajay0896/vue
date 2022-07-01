<template>
    <div class="mt-5">
        <h4>Tambah Kategori</h4>
    </div>
    <form v-on:submit.prevent="create">
        <div class="mb-2">
            <label for="name">Name</label>
            <input type="text" class="form-control" v-model="name" required>
        </div>
        <div class="mb-2 clearfix">
            <button class="btn btn-primary float-right" v-on:click="create">Tambah</button>
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

        async function create() {
            let status = store.dispatch('kategori/create', {
                name: name.value,
            })

            if (status) {
                router.push('/kategori')
            } else {
                alert('Gagal menambah kategori')
            }
        }

        return {
            name,
            create
        }
    },
}
</script>