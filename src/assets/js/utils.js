import {
  state
} from '../api/gameApi';
import {
  maxHealth,
  maxFood,
  handSize
} from './config';

import {
  cards
} from '../api/cards';
// WORLD

let cardUid = 0;

// GAME

// Pile

export function drawCard() {
  if (getDrawPileCount() === 0) {
    refillPile();
  }

  const choice = Math.round(Math.random() * (getDrawPileCount() - 1)) + 1;

  let accumulation = 0;
  for (let k in state.drawPile) {
    accumulation += state.drawPile[k];
    if (choice <= accumulation) {
      // Draw the card from the pile
      state.drawPile[k]--;
      return {
        id: k,
        uid: cardUid++,
        def: cards[k]
      };
    }
  }
}

export function drawInitialHand(player) {
  for (let i = 0; i < handSize; i++) {
    player.hand.push(drawCard());
  }
}

export function addCardToPile(pile, cardId) {
  if (typeof pile[cardId] === 'number') {
    pile[cardId]++;
  } else {
    pile[cardId] = 1;
  }
}

export function refillPile() {
  Object.assign(state.drawPile, state.discardPile);
  state.discardPile = {};
}

export function getDrawPileCount() {
  let result = 0;
  for (let k in state.drawPile) {
    result += state.drawPile[k];
  }
  return result;
}

// Card play

export function applyCardEffect(card) {
  state.currentPlayer.lastPlayedCardId = card.id;
  card.def.play(state.currentPlayer, state.currentOpponent);
  // Check if the stats (health, food) are not outside the boundaries
  state.players.forEach(checkStatsBounds);
}

export function getLastPlayedCard(player) {
  return cards[player.lastPlayedCardId];
}

// Player

export function checkStatsBounds(player) {
  // Health
  if (player.health < 0) {
    player.health = 0;
  } else if (player.health > maxHealth) {
    player.health = maxHealth;
  }

  // Food
  if (player.food < 0) {
    player.food = 0;
  } else if (player.food > maxFood) {
    player.food = maxFood;
  }
}

export function checkPlayerLost(player) {
  player.dead = (player.health === 0 || player.food === 0);
}

export function isOnePlayerDead() {
  return state.players.some(p => p.dead);
}
