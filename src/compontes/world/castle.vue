<!-- 组件说明 -->
<template>
  <div class="castle" :class="'player-' + index">
    <img class="building" :src="require('../svg/castle' + index + '.svg')" />
    <img class="ground" :src="require('../svg/ground' + index + '.svg')" />
    <castle-banners :player="player" />
  </div>
</template>

<script>
  import castleBanners from './castlebanners';
  export default {
    name: 'castle',
    components: {
      castleBanners
    },
    props: ['player', 'index']
  };

</script>
