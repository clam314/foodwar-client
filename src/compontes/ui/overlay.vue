<!-- 组件说明 -->
<template>
  <div class="overlay" @click="handleClick">
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script>
  // import x from ''
  export default {
    name: 'overlay',
    methods: {
      handleClick() {
        this.$emit('close');
      }
    }
  };

</script>

<style lang='scss' scoped>
  //@import url()

</style>
