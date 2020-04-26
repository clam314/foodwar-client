<template>
  <div class="loading">
    <div></div>
  </div>
</template>

<style lang="scss" scoped>
  @import '../../assets/scss/mixins';

  .loading {
    $size: 32px;
    @include flex-box();
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

  }

  @keyframes loading {
    0% {
      transform: rotate(0);
    }

    100% {
      transform: rotate(360deg);
    }
  }

</style>
