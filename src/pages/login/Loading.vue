<template>
  <div class="loading">
    <div></div>
  </div>
</template>

<style lang="scss" scoped>
  @import '../../assets/scss/mixins';

  .loading {
    $size: 32px;
    @include fix-box();
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 128px 0;

    div {
      width: $size;
      height: $size;
      border: solid 2px transparent;
      border-right: solid 2px $primary-color;
      border-radius: 50%;
      animation: loading .5s infinite linear;
    }

    &.overlay,
    &.page {
      margin: 0;
    }

    &.overlay {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(white, .75);
    }

    &.page {
      position: fixed;
      bottom: 64px;
      left: 'calc(50% - %s)'% ($size / 2);
      width: $size;
      height: $size;
      padding: 16px;
      border-radius: 50%;
      background: white;
      box-shadow: 0 4px 15px rgba(black, .1);
      pointer-events: none;
    }
  }

</style>
