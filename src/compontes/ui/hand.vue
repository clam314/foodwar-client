<!-- 组件说明 -->
<template>
  <div class="hand">
    <div class="wrapper">
      <transition-group name="card" tag="div" class="cards" @after-leave="handleLeaveTransitionEnd">
        <card v-for="card in cards" :key="card.uid" :def=card.def @play="handlePlay(card)" />
      </transition-group>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'hand',
    props: ["cards"],
    methods: {
      handlePlay(card) {
        console.log("card-play")
        this.$emit('card-play', card)
      },
      handleLeaveTransitionEnd() {
        this.$emit('card-leave-end')
      }
    }
  }

</script>

<style lang='scss' scoped>
  //@import url()

</style>
