<template>
  <div id="app">
    <hello-world :count="dataCountObj.count"  />

    <hr />
    <!-- <element-test /> -->
    <ul>
      <li  v-for="(item,idx) in inputtt" :key={idx}>
        {{item}}
      </li>  
    </ul>

    <h1 @click="changeDatafromAppVue">
      change provide data from app.vue
      {{checkout_info}}
    </h1>
    <parent-component ref="parentRef" @child-click="childClick"></parent-component>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld";
// import ElementTest from './components/element-test';
import ParentComponent from './components/ParentComponent';

export default {
  name: 'App',
  components: {
    HelloWorld,
    // ElementTest,
    ParentComponent,
  },
  data() {
    return {
      inputtt: 'thisisatentcent',
      dataCountObj:{
        count:0,
      },
      checkout_info: 'checkout_info',
    };
  },
  provide() {
    return {
        fatherApp: this
    }
  },
  watch: {
    inputtt(newValue) {
      console.log('inputtt = newValue: ', newValue);
    },
  },
  methods: {
    changeDatafromAppVue(){
      console.log('this.dataCountObj.count: ', this.dataCountObj.count);


      this.dataCountObj.count = this.dataCountObj.count + 1;
      this.$refs.parentRef.message =  'Hello from app component'
      this.checkout_info = "changeDatafromAppVue form root app"
    },
    inputEvent(newValue) {
      console.log('inputEvent - newValue: ', newValue);
    },
    childClick(childValue) {
      console.log('childValue: ', childValue);
    },

  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
