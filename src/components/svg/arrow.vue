<template>
  <svg
    class="arrow"
    :style="`transform: rotate(${rotate}deg)`"
    width="22"
    height="42"
    viewBox="0 0 22 42"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 41L21 21L1 1"
      stroke="white"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script>
export default {
  props: {
    rotate: {
      type: Number,
      required: false,
    },
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.arrow {
  cursor: pointer;
  transition: 0.4s all ease;
  &:hover {
    opacity: 0.5;
  }
}
</style>