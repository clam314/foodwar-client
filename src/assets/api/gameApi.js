let pile = {
  pikemen: 4,
  catapult: 4,
  trebuchet: 3,
  archers: 3,
  knighthood: 3,
  'quick-repair': 4,
  granary: 4,
  repair: 3,
  farm: 3,
  poison: 2,
  fireball: 2,
  chapel: 2,
  curse: 1,
  miracle: 1
};

export let state = {
  // UI
  activeOverlay: null,

  // Game
  turn: 1,
  players: [{
              name: 'Anne of Cleves',
              food: 10,
              health: 10,
              skipTurn: false,
              skippedTurn: false,
              hand: [],
              lastPlayedCardId: null,
              dead: false
            },
            {
              name: 'William the Bald',
              food: 10,
              health: 10,
              skipTurn: false,
              skippedTurn: false,
              hand: [],
              lastPlayedCardId: null,
              dead: false
            }
  ],
  currentPlayerIndex: Math.round(Math.random()),
  get currentPlayer() {
    return state.players[state.currentPlayerIndex];
  },
  get currentOpponentId() {
    return state.currentPlayerIndex === 0 ? 1 : 0;
  },
  get currentOpponent() {
    return state.players[state.currentOpponentId];
  },
  get currentHand() {
    return state.currentPlayer.hand;
  },
  drawPile: pile,
  discardPile: {},
  canPlay: false
};
