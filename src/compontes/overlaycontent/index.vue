<!-- 组件说明 -->
<template>
  <overlay :key="activeOverlay" @close="handleOverlayClose">
    <component :is="'overlay-content-' + activeOverlay" :players="players" :player="currentPlayer"
      :opponent="currentOpponent" />
  </overlay>
</template>

<script>
  import overlay from './overlay';
  import overlayContentPlayerTurn from './player-turn';
  import overlayContentLastPlay from './last-play';
  import overlayContentGameOver from './game-over';
  import overlayContentWaiting from './waiting';
  export default {
    components: {
      overlay,
      overlayContentPlayerTurn,
      overlayContentLastPlay,
      overlayContentGameOver,
      overlayContentWaiting
    },
    data() {
      return {
        currentOpponent: null,
        currentPlayer: null
      };
    },
    computed: {
      players() {
        return this.$store.getters.players;
      },
      activeOverlay() {
        return this.$store.state.activeOverlay;
      }
    }
  };

</script>
