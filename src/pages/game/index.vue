<!-- 组件说明 -->
<template>
  <div id="game-body" :class="cssClass">
    <top-bar />
    <world />
    <transition name="hand">
      <hand v-if="!activeOverlay" :cards="currentHand" @card-play="handlePlayCard"
        @card-leave-end="handleCardLeaveEnd" />
    </transition>
    <transition name="fade">
      <div class="overlay-background" v-if="activeOverlay" />
    </transition>
    <transition name="zoom">
      <overlay-content v-if="activeOverlay" />
    </transition>
  </div>
</template>

<script>
  import topBar from '../../compontes/topbar';
  import world from '../../compontes/world';
  import hand from '../../compontes/hand';
  import overlayContent from '../../compontes/overlaycontent';

  import {
    state
  } from '../../assets/api/gameApi';
  import {
    drawInitialHand,
    drawCard,
    isOnePlayerDead,
    checkPlayerLost
  } from '../../assets/js/utils';
  export default {
    components: {
      topBar,
      world,
      hand,
      overlayContent
    },
    data() {
      return {
        canPlay: false,
        currentPlayer: this.$store.getters.players[0],
        currentOpponent: this.$store.getters.players[1],
        currentHand: state.currentHand
      };
    },
    computed: {
      cssClass() {
        return {
          'can-play': this.canPlay
        };
      },
      players() {
        return this.$store.getters.players;
      },
      activeOverlay() {
        return this.$store.state.activeOverlay;
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
      state.activeOverlay = null;
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
