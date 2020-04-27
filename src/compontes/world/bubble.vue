<!-- 组件说明 -->
<template>
  <div class="stat-bubble" :class="type+'-bubble'" :style="bubbleStyle">
    <img :src="'../svg/'+type+'-bubble.svg'" />
    <div class="counter">{{value}}</div>
  </div>
</template>

<script>
  //import x from ''
  export default {
    name: 'bubble',
    props: ['type', 'value', 'ratio'],
    computed: {
      bubbleStyle() {
        return {
          top: (this.ratio * 220 + 40) * state.worldRatio + 'px'
        }
      }
    }
  }

</script>

<style lang='scss' scoped>
  //@import url()

</style>
