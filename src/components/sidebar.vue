<template>
  <div class="side_bar">
    <main class="side_bar__main">
      <div class="btns">
        <size-svg
          :class="{ active: typeImage === 'x' }"
          @click="changeTypeImage('x')"
          style="transform: rotate(90deg)"
        />
        <size-svg
          :class="{ active: typeImage === 'y' }"
          @click="changeTypeImage('y')"
        />
        <box-svg
          :class="{ active: typeImage === '1x1' }"
          @click="changeTypeImage('1x1')"
        />
        <full-screen-svg
          :class="{ active: typeImage === 'xy' }"
          @click="changeTypeImage('xy')"
        />
      </div>
      <div class="main__items">
        <file-item v-for="file in files" :key="file.id" :dataFile="file" />
      </div>
    </main>
  </div>
</template>

<script>
import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";

import sizeSvg from "./svg/size.vue";
import boxSvg from "./svg/box.vue";
import fullScreenSvg from "./svg/fullscreen.vue";

import fileItem from "./fileItem.vue";
export default {
  components: { fileItem, sizeSvg, boxSvg, fullScreenSvg },
  setup() {
    const store = useStore();
    const parentId = ref(0);

    const files = computed(() => store.state.files[parentId.value]);
    const typeImage = computed(() => store.state.typeImage);

    const changeTypeImage = (type) => {
      if (type === typeImage.value) return;
      store.commit("changeTypeImage", type);
    };
    return { files, typeImage, changeTypeImage, parentId };
  },
};
</script>

<style lang="scss" scoped>
.active {
  opacity: 0.5;
}
.side_bar {
  // width: 20%;
  padding-top: 30px;
  height: 100vh;
  background: rgb(231, 231, 231);
  &__header {
    margin: 20px;
    padding: 10px;
    .header__title {
      font-size: 32px;
    }
  }
  &__main {
    margin: 20px;
    .btns {
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin: 10px 0;
      gap: 5px;
      & > svg {
        cursor: pointer;
        padding: 5px;
        background: rgb(194, 194, 194);
        border-radius: 14px;
        transition: 0.3s all ease;
        &:hover {
          opacity: 0.6;
        }
      }
    }
  }
}
</style>