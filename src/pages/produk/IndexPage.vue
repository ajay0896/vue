<template>
  <div class="mt-5">
    <div class="d-flex justify-content-between align-items-center">
      <div>
        <router-link
          to="/produk"
          class="text-decoration-none text-black h4"
          active-class="fw-bold"
        >
          Produk
        </router-link>
        |
        <router-link
          to="/kategori"
          class="text-decoration-none text-black h4"
          active-class="fw-bold"
        >
          Kategori
        </router-link>
      </div>

      <div>
        <router-link class="btn btn-primary" to="/produk/create">
          Create
        </router-link>
        <button type="button" v-on:click="logout" class="btn btn-success ms-2">Logout</button>
      </div>
    </div>

    <div class="row mt-5">
      <div class="col-lg-4" v-for="produk in produks" :key="produk.id">
        <div class="card">
          <div class="card-header bg-white">
            <div class="d-flex justify-content-between align-items-center">
              <h5 class="card-title">
                {{ produk.name }}
              </h5>
              <div class="badge bg-danger">
                {{ produk.kategori.name }}
              </div>
            </div>
          </div>
          <div class="card-body">
            <p>{{ produk.deskripsi }}</p>
          </div>
          <div class="card-footer bg-white clearfix">
            <div class="float-end">
              <router-link
                :to="`/produk/edit/${produk.id}`"
                class="btn btn-primary"
              >
                Edit
              </router-link>
              <button
                type="button"
                class="btn btn-danger ms-2"
                v-on:click="hapus(produk.id)"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const store = useStore();

    const produks = ref();

    function load() {
      store.dispatch("produk/index").then((data) => {
        produks.value = data;
      });
    }

    load();

    function hapus(id) {
      store.dispatch("produk/delete", id).then(() => {
        load();
      });
    }

    function logout() {
      store.dispatch("logout").then(() => {
        router.push("/login");
      });
    }

    return {
      produks,
      hapus,
      logout,
    };
  },
};
</script>