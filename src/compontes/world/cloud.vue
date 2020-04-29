<!-- 组件说明 -->
<template>
  <div class="cloud" :class="'cloud-'+type" :style="style">
    <img :src="require('../svg/cloud'+type+'.svg')" @load="initPosition" />
  </div>
</template>

<script>
  import {
    TWEEN
  } from '../../assets/js/Tween';

  const cloudAnimationDurations = {
    min: 10000,
    max: 50000
  };
  export default {
    name: 'cloud',
    props: ['type'],
    data() {
      return {
        style: {
          transform: 'none',
          zIndex: 0
        }
      };
    },
    methods: {
      setPosition(left, top) {
        this.style.transform = `translate(${left}px,${top}px)`;
      },
      initPosition() {
        const width = this.$el.clientWidth;
        this.setPosition(-width, 0);
      },
      startAnimation(delay = 0) {
        const vm = this;
        const width = this.$el.clientWidth;
        const {
          min,
          max
        } = cloudAnimationDurations;
        const animationDuration = Math.random() * (max - min) + min;
        this.style.zIndex = Math.round(max - animationDuration);
        const top = Math.random() * (window.innerHeight * 0.3);
        new TWEEN.Tween({
          value: -width
        })
          .to({
            value: window.innerWidth
          }, animationDuration)
          .delay(delay)
          .onUpdate(function () {
            vm.setPosition(this.value, top);
          })
          .onComplete(() => {
            this.startAnimation(Math.random() * 10000);
          })
          .start();
      }
    },
    mounted() {
      window.requestAnimationFrame(animate);

      function animate(time) {
        window.requestAnimationFrame(animate);
        TWEEN.update(time);
      }
      this.startAnimation(-Math.random() * cloudAnimationDurations.min);
    }
  };

</script>
