<template>
  <body>
    <div class="container">
      <side-bar />
      <view-image />
    </div>
  </body>
</template>

<script>
import sideBar from "./components/sidebar.vue";
import viewImage from "./components/viewImage.vue";

import { onMounted } from "vue";
import { useStore } from "vuex";
import "./css/reset.scss";
export default {
  name: "App",
  components: { sideBar, viewImage },
  setup() {
    const store = useStore();

    const localStorageArray = [
      "activePhotos",
      "selectedPhotoIdx",
      "selectedPhoto",
      "typeImage",
    ];
    onMounted(async () => {
      await store.dispatch("loadFilesById", 0);
      localStorageArray.map((elem) => {
        store.commit("getLocalStorageItem", elem);
      });
    });
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap");
body {
  margin: 0;
  font-family: "Inter", sans-serif;
  font-weight: 400;
  background: rgb(204, 204, 204);
}
.container {
  display: flex;
}
</style>
