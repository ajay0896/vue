<template>
  <div class="mt-5">
    <h4>Edit Kategori</h4>
  </div>
  <form v-on:submit.prevent="create">
    <div class="mb-2">
      <label for="name">Name</label>
      <input type="text" class="form-control" v-model="name" required />
    </div>
    <div class="mb-2 clearfix">
      <button class="btn btn-primary float-right" v-on:click="edit">Edit</button>
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
    const kategori_id = route.params.id;


    store.dispatch(`kategori/show`, kategori_id).then(data => {
        name.value = data.name
    })

    async function edit() {
      let status = store.dispatch("kategori/edit", {
        id: kategori_id,
        data: {
          name: name.value,
        },
      })

      if (status) {
        router.push("/kategori")
      } else {
        alert("Gagal mengedit produk");
      }
    }

    return {
      name,
      edit,
    };
  },
};
</script>