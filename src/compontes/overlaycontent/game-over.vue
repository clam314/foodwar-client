<!-- 组件说明 -->
<template>
  <div>
    <div class="big">Game Over</div>
    <player-result v-for="(player,index) in players" :player="player" :key="index" />
  </div>
</template>

<script>
  import playerResult from './playerresult';
  export default {
    name: 'overlay-content-game-over',
    components: {
      playerResult
    },
    props: ['players']
  };

</script>
