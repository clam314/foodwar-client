<!-- 组件说明 -->
<template>
  <div class='waiting'>
    <SmartForm class="form" :title="title" :operation="operation" :valid="valid">
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
      operation() {
        this.login();
      },
      async login() {
        console.log(this.number, this.robot);

        this.$state.user = await this.$fetch('addRoom', {
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
