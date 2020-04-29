<!-- 组件说明 -->
<template>
  <div class="top-bar" :class="'player-'+currentPlayerIndex">
    <div class="player p0">{{players[0].name}}</div>
    <div class="turn-counter">
      <img class="arrow" src="./svg/turn.svg" />
      <div class="turn">{{title}}</div>
    </div>
    <div class="player p1">{{players[1].name}}</div>
  </div>
</template>

<script>
  export default {
    name: 'topBar',
    computed: {
      players() {
        return this.$store.getters.players;
      },
      currentPlayerIndex() {
        return this.$store.state.currentPlayerIndex;
      },
      title() {
        let turn = this.$store.state.turn;
        return turn === 0 ? 'VS' : `Turn${turn}`;
      }
    },
    created() {
      console.log(this.players);
    }
  };

</script>

<style lang="scss" scoped>
  .top-bar {
    height: 1.5em;
  }

  .turn {
    font-size: 1.3em;
  }

</style>
