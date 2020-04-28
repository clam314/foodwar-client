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
  import overlayContentPlayerTurn from '../../compontes/ui/overlaycontentplayerturn';
  import overlayContentLastPlay from '../../compontes/ui/overlaycontentlastplay';
  import overlayContentGameOver from '../../compontes/ui/overlaycontentgameover';
  import {
    state
  } from '../../assets/api/gameApi';
  import {
    cards
  } from '../../assets/api/cards';
  import {
    drawInitialHand,
    drawCard,
    isOnePlayerDead,
    checkPlayerLost
  } from '../../assets/js/utils';
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
    data: {
      state,
      currentPlayingCard: null
    },
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
      handlePlayCard(card) {
        this.playCard(card);
      },
      handleCardLeaveEnd() {
        this.applyCard();
      },
      handleOverlayClose() {
        this.overlayCloseHandlers[this.activeOverlay]();
      },
      beginGame() {
        state.players.forEach(drawInitialHand);
      },
      playCard(card) {
        if (state.canPlay) {
          state.canPlay = false;
          this.currentPlayingCard = card;
          const index = state.currentPlayer.hand.indexOf(card);
          state.currentPlayer.hand.splice(index, 1);
          this.addCardToPile(state.discardPile, card.id);
        }
      },
      applyCard() {
        const card = this.currentPlayingCard;
        this.applyCardEffect(card);
        setTimeout(() => {
          state.players.forEach(checkPlayerLost);
          if (isOnePlayerDead()) {
            this.endGame();
          } else {
            this.nextTurn();
          }
        }, 700);
      },
      nextTurn() {
        state.turn++;
        state.currentPlayerIndex = state.currentOpponentId;
        state.activeOverlay = 'player-turn';
      },
      newTurn() {
        state.activeOverlay = null;
        if (state.currentPlayer.skipTurn) {
          this.skipTurn();
        } else {
          this.startTurn();
        }
      },
      skipTurn() {
        state.currentPlayer.skippedTurn = true;
        state.currentPlayer.skipTurn = false;
        this.nextTurn();
      },
      startTurn() {
        state.currentPlayer.skippedTurn = false;
        if (state.turn > 2) {
          // Draw new card
          setTimeout(() => {
            state.currentPlayer.hand.push(drawCard());
            state.canPlay = true;
          }, 800);
        } else {
          state.canPlay = true;
        }
      },
      endGame() {
        state.activeOverlay = 'game-over';
      }
    },
    mounted() {
      this.beginGame();
    },
    create() {
      state.activeOverlay = 'player-turn';
      this.overlayCloseHandlers = {
        'player-turn'() {
          if (state.turn > 1) {
            state.activeOverlay = 'last-play';
          } else {
            this.newTurn();
          }
        },
        'last-play'() {
          this.newTurn();
        },
        'game-over'() {
          document.location.reload();
        }
      };
    }
  };

</script>

<style lang='scss' scoped>
  //@import url()

</style>
