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
    // watch: {
    //   screenWidth(val) {
    //     if (!this.timer) {
    //       // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
    //       this.screenWidth = val
    //       this.timer = true
    //       let that = this
    //       setTimeout(function () {
    //         // 打印screenWidth变化的值
    //         console.log(that.screenWidth)
    //         that.timer = false
    //       }, 400)
    //     }
    //   }
    // },
    mounted() {
      console.log('ddddddd');

      const that = this;
      window.addEventListener('resize', () => {
        that.screenWidth = window.innerWidth;
      });
    }
  };

</script>
