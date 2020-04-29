<!-- 组件说明 -->
<template>
  <div>
    <div class="big" v-if="opponent.skippedTurn">{{opponent.name}} turn was skipped!</div>
    <template v-else>
      <div>{{opponent.name}} just played:</div>
      <card :def="lastPlayedCard" />
    </template>
  </div>
</template>

<script>
  import {
    getLastPlayedCard
  } from '../../assets/js/utils';

  export default {
    name: 'overlay-content-last-play',
    props: ['opponent'],
    computed: {
      lastPlayedCard() {
        return getLastPlayedCard(this.opponent);
      }
    }
  };

</script>
