<template>
    <form v-on:submit.prevent="login" class="vh-100 d-flex align-items-center justify-content-center">
        <div class="col-lg-6">
            <div class="mb-2">
                <label for="username" class="form-label">Username</label>
                <input type="text" class="form-control" id="username" v-model="username" required>
            </div>
            <div class="mb-2">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" v-model="password" required>
            </div>
            <div class="mb-2 clearfix">
                <button type="submit" class="btn btn-primary float-right">Login</button>
            </div>
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

        const username = ref()
        const password = ref()

        async function login() {
            let status = await store.dispatch('login', {
                username: username.value,
                password: password.value,
            })

            if (status) {
                router.push('/')
            } else {
                alert('Username atau password salah')
            }
        }

        return {
            username,
            password,
            login
        }
    },
}
</script>