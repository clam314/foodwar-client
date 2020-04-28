<!-- 组件说明 -->
<template>
  <div class="banners">
    <img class="food-icon" src="../svg/food-icon.svg" />
    <bubble type="food" :value="player.food" :ratio="foodRatio" />
    <banner-bar class="food-bar" color="#288339" :ratio="foodRatio" />
    <img class="health-icon" src="../svg/health-icon.svg" />
    <bubble type="health" :value="player.health" :ratio="healthRatio" />
    <banner-bar class="health-bar" color="#9b2e2e" :ratio="healthRatio" />
  </div>
</template>

<script>
  import {
    maxHealth,
    maxFood
  } from '../..assets/js/config';

  export default {
    name: 'castle',
    props: ['player'],
    computed: {
      foodRatio() {
        return this.player.food / maxFood;
      },
      healthRatio() {
        return this.player.health / maxHealth;
      }
    }
  };

</script>

<style lang='scss' scoped>
  //@import url()

</style>
