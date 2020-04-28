<!-- 组件说明 -->
<template>
  <div class="overlay" @click="handleClick">
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'overlay',
    methods: {
      handleClick() {
        this.$emit('close');
      }
    }
  };

</script>
