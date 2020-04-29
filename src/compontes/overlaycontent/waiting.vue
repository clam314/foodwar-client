<!-- 组件说明 -->
<template>
  <div class='waiting'>
    <SmartForm class="form" :title="title" :operation="operation" :valid="true">
      <FormInput name="number" type="number" v-model="number" placeholder="room bumber" />

      <template slot="actions">
        <button type="submit" class="secondary" @click="robot = true">robot?</button>
        <button type="submit" :disabled="!valid" @click="robot = false">Go!</button>
      </template>
    </SmartForm>
  </div>
</template>

<script>
  import SmartForm from '../form/SmartForm';
  import FormInput from '../form/FormInput';
  export default {
    name: 'overlay-content-waiting',
    components: {
      SmartForm,
      FormInput
    },
    data() {
      return {
        title: 'Join the game',
        robot: false,
        number: null
      };
    },
    computed: {
      valid() {
        return this.number;
      }
    },
    methods: {
      async operation() {
        await this.login();
      },
      async login() {
        console.log(this.number, this.robot);

        this.$state.user = await this.$fetch('login', {
          method: 'POST',
          body: JSON.stringify({
            room: this.number,
            robot: this.robot
          })
        });
      }
    }
  };

</script>
<style lang="scss" scoped>
  .waiting>.form {
    background-color: rgba($color: #fff, $alpha: 0.6);

    >>>h2::after {
      width: 100%;
    }
  }

</style>
