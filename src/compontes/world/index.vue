<!-- 组件说明 -->
<template>
  <div class="world">
    <castle v-for="(player, index) in players" :player="player" :index="index" :key="index" />
    <div class="land" />
    <div class="clouds">
      <cloud v-for="index in 10" :type="(index - 1) % 5 + 1" :key="index" />
    </div>
  </div>
</template>

<script>
  import castle from './castle';
  import cloud from './cloud';
  export default {
    name: 'world',
    components: {
      castle,
      cloud
    },
    computed: {
      players() {
        return this.$store.getters.players;
      }
    }
  };

</script>
