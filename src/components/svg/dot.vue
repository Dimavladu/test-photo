<template>
  <svg
    width="6"
    height="6"
    viewBox="0 0 6 6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="3" cy="3" r="3" :fill="color || 'white'" />
  </svg>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      required: false,
      default: () => "",
    },
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
</style>