<!-- 组件说明 -->
<template>
  <div>
    <div class="big" v-if="player.skipTurn">{{player.name}},<br>your turn is skipped!</div>
    <div class="big" v-else>{{player.name}},<br>your turn has come!</div>
    <div>Tap to continue</div>
  </div>
</template>

<script>
  export default {
    name: 'overlay-content-player-turn',
    props: ['player']
  };

</script>
