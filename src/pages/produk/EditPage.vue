<template>
  <div class="mt-5">
    <h4>Edit Produk</h4>
  </div>
  <form v-on:submit.prevent="edit">
    <div class="mb-2">
      <label for="name">Name</label>
      <input type="text" class="form-control" v-model="name" required />
    </div>
    <div class="mb-2">
      <label for="kategori">Kategori</label>
      <select id="kategori" class="form-select" v-model="kategori_id" required>
        <option
          v-for="kategori in kategoris"
          :value="kategori.id"
          :key="kategori.id"
        >
          {{ kategori.name }}
        </option>
      </select>
    </div>
    <div class="mb-2">
      <label for="name">Deskripsi</label>
      <textarea
        type="text"
        class="form-control"
        v-model="deskripsi"
        required
      ></textarea>
    </div>
    <div class="mb-2 clearfix">
      <button class="btn btn-primary float-right">Edit</button>
    </div>
  </form>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const name = ref();
    const deskripsi = ref();
    const kategori_id = ref();
    const kategoris = ref();

    const produk_id = route.params.id

    store.dispatch(`produk/show`, produk_id).then(data => {
        name.value = data.name
        deskripsi.value = data.deskripsi
        kategori_id.value = data.kategori_id
    })

    store.dispatch("kategori/index").then((data) => {
      kategoris.value = data;
    });

    async function edit() {
      let status = store.dispatch("produk/edit", {
        id: produk_id,
        data: {
          name: name.value,
          deskripsi: deskripsi.value,
          kategori_id: kategori_id.value,
        },
      });

      if (status) {
        router.push("/");
      } else {
        alert("Gagal mengedit produk");
      }
    }

    return {
      name,
      deskripsi,
      kategori_id,
      kategoris,
      edit,
    };
  },
};
</script>