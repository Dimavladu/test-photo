<template>
  <div class="main__item" v-if="dataFile.type === 'dir'">
    <div class="main__item_wrapper" :class="{ active: isOpen }">
      <div class="main__item__info" @click="openFolder(dataFile.id)">
        <component :is="isOpen ? 'folder-open-svg' : 'folder-svg'" />
        {{ dataFile.name }}
      </div>
    </div>
    <transition
      name="expand"
      @enter="enter"
      @after-enter="afterEnter"
      @leave="leave"
    >
      <div class="main__items" v-if="isOpen">
        <file-item
          class="subItem"
          v-for="file in files"
          :key="file.id + Date.now()"
          :dataFile="file"
        />
      </div>
    </transition>
  </div>
  <div class="main__item" v-else>
    <div
      class="main__item_wrapper files"
      :class="{ active_photo: dataFile === $store.state.selectedPhoto }"
    >
      <div class="main__item__info" @click="selectPhoto(dataFile)">
        <image-svg />
        {{ dataFile.name }}
      </div>
    </div>
  </div>
</template>

<script>
import folderSvg from "./svg/folder.vue";
import folderOpenSvg from "./svg/folderOpen.vue";
import imageSvg from "./svg/image.vue";

import { ref, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  name: "fileItem",
  props: {
    dataFile: {
      type: Object,
      required: false,
      default: () => {},
    },
  },
  components: { folderSvg, folderOpenSvg, imageSvg },
  setup() {
    const store = useStore();

    const isOpen = ref(false);
    const files = ref([]);
    onMounted(() => {});

    const openFolder = async (id) => {
      if (!isOpen.value) {
        files.value = await store.dispatch("loadFilesById", id);
      }
      return (isOpen.value = !isOpen.value);
    };

    const selectPhoto = (selectedPhoto) => {
      store.commit("selectPhoto", selectedPhoto);
      store.commit("setLocalStoragePhotosItems");
    };

    const enter = (el) => {
      el.style.height = "auto";
      const height = getComputedStyle(el).height;
      el.style.height = 0;
      getComputedStyle(el);
      setTimeout(() => {
        el.style.height = height;
      });
    };
    const afterEnter = (el) => {
      el.style.height = "auto";
    };
    const leave = (el) => {
      el.style.height = getComputedStyle(el).height;
      getComputedStyle(el);
      setTimeout(() => {
        el.style.height = 0;
      });
    };

    return { isOpen, openFolder, files, selectPhoto, enter, afterEnter, leave };
  },
};
</script>

<style lang="scss" scoped>
.expand-enter-active,
.expand-leave-active {
  transition: height 0.5s ease-in-out;
  overflow-y: hidden;
}
.active {
  opacity: 0.7;
}
.active_photo {
  opacity: 0.5;
}
.main {
  &__items {
  }
  &__item {
    &_wrapper {
      background: rgb(209, 209, 209);
      border-radius: 10px;
      display: flex;
      align-items: center;
      gap: 20px;
      padding: 10px;
      justify-content: space-between;
    }
    .subItem {
      margin-left: 10px;
      background: rgb(221, 221, 221);
    }
    .files {
      padding: 7px 10px;
    }
    &__info {
      transition: 0.3s all ease;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 10px;
      &:hover {
        opacity: 0.6;
      }
    }
    &__change {
      display: flex;
      align-items: center;
      gap: 10px;
      & > svg {
        transition: 0.3s all ease;
        cursor: pointer;
      }
      & > svg:hover {
        opacity: 0.6;
      }
    }
  }
}
</style>