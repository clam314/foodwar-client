<template>
  <form @submit.prevent="submit">
    <section class="content">
      <h2>{{ title }}</h2>
      <slot />

      <div class="actions">
        <slot name="actions" />
      </div>

      <div class="error" v-if="error">{{ error }}</div>
    </section>

    <transition name="fade">
      <Loading v-if="busy" class="overlay" />
    </transition>
  </form>
</template>

<script>
  import Loading from "./Loading";
  export default {
    components: {
      Loading
    },
    props: {
      title: {
        type: String,
        required: true
      },
      operation: {
        type: Function,
        required: true
      },
      valid: {
        type: Boolean,
        required: true
      }
    },

    data() {
      return {
        error: null,
        busy: false
      };
    },

    methods: {
      async submit() {
        if (this.valid && !this.busy) {
          this.error = null;
          this.busy = true;
          try {
            await this.operation();
          } catch (e) {
            this.error = e.message;
          }
          this.busy = false;
        }
      }
    }
  };

</script>

<style lang="scss" scoped>
  @import '../../assets/scss/mixins';

  h2 {
    color: darken($primary-color, 5%);
    font-size: 1.5em;
    margin: 16px 0;

    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }

    &::after {
      display: block;
      content: '';
      width: 80px;
      border-bottom: 2px dashed rgba($primary-color, .3);
      margin: 8px 0 16px;
    }
  }

  .actions {
    text-align: center;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .15s linear;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

</style>
