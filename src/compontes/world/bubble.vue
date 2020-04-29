<!-- 组件说明 -->
<template>
  <div class="stat-bubble" :class="type+'-bubble'" :style="bubbleStyle">
    <img :src="require('../svg/'+type+'-bubble.svg')" />
    <div class="counter">{{value}}</div>
  </div>
</template>

<script>
  export default {
    name: 'bubble',
    props: ['type', 'value', 'ratio'],
    data() {
      return {
        screenWidth: window.innerWidth
      };
    },
    computed: {
      bubbleStyle() {
        return {
          top: (this.ratio * 220 + 40) * 1 / 1920 * this.screenWidth + 'px'
        };
      }
    },
    mounted() {
      const that = this;
      window.addEventListener('resize', () => {
        that.screenWidth = window.innerWidth;
      });
    }
  };

</script>
