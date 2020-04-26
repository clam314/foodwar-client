<!-- 组件说明 -->
<template>
  <div class='login-page'>
    <login></login>
  </div>
</template>

<script>
  import Login from './Login';

  export default {
    name: 'LoginPage',
    components: {
      Login
    },
    data() {
      return {

      };
    },
    computed: {

    },
    methods: {

    }
  };

</script>

<style lang="scss" scoped>
  .login-page {
    width: 100%;
    height: 100%;
  }

</style>
