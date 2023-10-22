<!-- ChildComponent.vue -->
<template>
  <div>
    <slot message="this is a message from child compoinent"></slot>
    <div @click="doClick">child</div>
    <div>
      <h1>provider inject</h1>
      <h3 @click="changeDataFromStuffComponents">{{this.fatherApp.checkout_info}}</h3>


    </div>
  </div>
</template>

<script>
export default {
  props: ['message'],
  inject: ['fatherApp'],
  methods:{
    doClick(){
      this.$emit('child-click','DoClick');
    },
    changeDataFromStuffComponents(){
      this.fatherApp.checkout_info = 'changeDataFromStuffComponents'
    }
  },
}
</script>