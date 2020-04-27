<!-- 组件说明 -->
<template>
  <div :class="cssClass">
    <top-bar :turn="turn" :current-player-index="currentPlayerIndex" :players="players" />
    <div class="world">
      <castle v-for="(player,index) in players" :key="index" :player="player" :index="index" />
      <div class="land" />
      <div class="clouds">
        <cloud v-for="index in 10" :key="index" :type="(index-1)%5+1" />
      </div>
    </div>
    <transition name="hand">
      <hand :cards="currentHand" v-if="!activeOverlay" @card-play="handlePlayCard"
        @card-leave-end="handleCardLeaveEnd" />
    </transition>
    <transition name="zoom">
      <overlay v-if="activeOverlay" :key="activeOverlay" @close="handleOverlayClose">
        <component :is="'overlay-content-' + activeOverlay" :player="currentPlayer" :opponent="currentOpponent"
          :players="players" />
      </overlay>
    </transition>
    <transition name="fade">
      <div class="overlay-background" v-if="activeOverlay" />
    </transition>
  </div>
</template>

<script>
  import topBar from '../../compontes/ui/topbar';
  import castle from '../../compontes/world/castle';
  import cloud from '../../compontes/world/cloud';
  import hand from '../../compontes/ui/hand';
  import overlay from '../../compontes/ui/overlay';
  import overlayContentPlayerTurn from '../../compontes/ui/overlaycontentgameover';
  import overlayContentLastPlay from '../../compontes/ui/overlaycontentlastplay';
  import overlayContentGameOver from '../../compontes/ui/overlaycontentgameover';

  export default {
    components: {
      topBar,
      castle,
      cloud,
      hand,
      overlay,
      overlayContentPlayerTurn,
      overlayContentLastPlay,
      overlayContentGameOver
    },
    data: state,
    computed: {
      testCard() {
        return cards.archers;
      },
      cssClass() {
        return {
          'can-play': this.canPlay
        };
      }
    },
    methods: {
      handlePlay() {
        console.log('you played a card!');
      },
      testDrawCard() {
        const ids = Object.keys(cards);
        const randomId = ids[Math.floor(Math.random() * ids.length)];
        return {
          uid: cardUid++,
          id: randomId,
          def: cards[randomId]
        };
      },
      handlePlayCard(card) {
        playCard(card);
      },
      handleCardLeaveEnd() {
        applyCard();
      },
      handleOverlayClose() {
        overlayCloseHandlers[this.activeOverlay]();
      }
    },
    mounted() {
      beginGame();
    }
  };

</script>

<style lang='scss' scoped>
  //@import url()

</style>
