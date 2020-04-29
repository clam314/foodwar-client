import Vue from 'vue';
import Vuex from 'vuex';
import {
  maxHealth,
  maxFood
} from '../assets/js/config';

Vue.use(Vuex);

const state = {
  cards: null,
  userInfo: null,
  turn: 0,
  activeOverlay: 'waiting',
  currentPlayerIndex: '',
  currentOpponentId: '',
  status: [{
    'player': {
      'name': 'Self',
      'icon': null,
      'userId': 'Self'
    },
    'gameInfo': {
      'food': maxFood,
      'health': maxHealth,
      'skipTurn': false,
      'skippedTurn': false,
      'hand': [],
      'lastPlayedCardId': null,
      'dead': false
    }
  }, {
    'player': {
      'name': 'Waiting...',
      'icon': null,
      'userId': ''
    },
    'gameInfo': {
      'food': maxFood,
      'health': maxHealth,
      'skipTurn': false,
      'skippedTurn': false,
      'hand': [],
      'lastPlayedCardId': null,
      'dead': false
    }
  }]
};

const getters = {
  players: (state) => {
    return state.status.map(item => {
      return Object.assign(item.player, item.gameInfo);
    });
  }
};

const motations = {
  upDateUserInfo(state, userInfo) {
    if (userInfo) {
      state.userInfo = userInfo;
    }
  },
  upStatus(state, status) {
    if (status) {
      state.status = status;
    }
  }

};

export default new Vuex.Store({
  state,
  getters,
  motations
});
