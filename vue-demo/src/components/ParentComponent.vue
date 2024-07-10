<!-- ParentComponent.vue -->
<template>
  <div>
    {{message}}
    <child-component v-bind="$attrs" v-on="$listeners">
      <template v-slot:default="slotProps">
        <p>{{ slotProps.message }}</p>
      </template>
    </child-component>
  </div>
</template>

<script>
import ChildComponent from './ChildComponent.vue';

export default {
  components: {
    ChildComponent
  },
  methods:{
    inputEvent(newValue) {
      console.log('inputEvent - newValue: ', newValue);
    },
  },
  data() {
    return {
      message: 'Hello from parent component'
    };
  }
}
</script>