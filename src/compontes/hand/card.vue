<!-- 组件说明 -->
<template>
  <div class="card" :class="'type-'+def.type" @click="play">
    <div class="title">{{def.title}}</div>
    <img class="separator" src="../svg/card-separator.svg" />
    <div class="description">
      <div v-html="def.description"></div>
    </div>
    <div class="note" v-if="def.note">
      <div v-html="def.note"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'card',
    props: ['def'],
    methods: {
      play() {
        console.log('play');
        this.$emit('play');
      }
    }
  };

</script>
