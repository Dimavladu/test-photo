<template>
  <div class="view_image" ref="parent">
    <div class="image">
      <canvas ref="myCanvas"></canvas>
      <div class="btn left" @click="$store.commit('prevPhoto')">
        <arrow-svg :rotate="180" />
      </div>
      <div class="btn right" @click="$store.commit('nextPhoto')">
        <arrow-svg />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { calculatingSize } from "../service";

import arrowSvg from "./svg/arrow.vue";

export default {
  components: { arrowSvg },
  setup() {
    const store = useStore();
    const myCanvas = ref(null);
    const myContext = ref(null);
    const parent = ref(null);

    onMounted(async () => {
      myContext.value = myCanvas.value.getContext("2d");
    });
    const drawImage = async () => {
      const img = new Image();
      img.src = store.getters["imgUrl"];
      img.onload = async () => {
        let width = await img.width;
        let height = await img.height;

        let sizeObj = calculatingSize(
          width,
          height,
          parent.value.clientWidth,
          parent.value.clientHeight,
          typeImage.value
        );
        myCanvas.value.height = sizeObj.canvasHeight;
        myCanvas.value.width = sizeObj.canvasWidth;
        await myContext.value.drawImage(img, ...Object.values(sizeObj));
      };
    };

    const selectedPhoto = computed(() => store.state.selectedPhoto);
    watch(selectedPhoto, () => drawImage());
    const typeImage = computed(() => store.state.typeImage);
    watch(typeImage, () => drawImage());
    const activePhotos = computed(() => store.state.activePhotos);

    return { selectedPhoto, activePhotos, myCanvas, myContext, parent };
  },
};
</script>

<style lang="scss" scoped>
.view_image {
  overflow-x: hidden;
  margin: 0 auto;
  width: 100%;
  height: 100vh;
  background: rgb(255, 255, 255);
}
.image {
  position: relative;

  display: flex;
  align-items: center;
  justify-content: space-around;

  .btn {
    position: absolute;
    top: 50%;
  }
  .left {
    left: 20%;
  }
  .right {
    right: 20%;
  }
}
</style>