<template>
  <div class="hello">
    <h1>
      {{count}}
    </h1>
    
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    count: Number,
  },
  data() {
    return {
      name: "ff",
      love: "Hello",
    }
  },
  methods:{
    mixinEvent(params) { // 事件集合
      this.$emit('event', params)
    },
    testMethod(val){
      console.log('val: ', val);
    },
    change(val) {
      this.mixinEvent({
        type: 'change',
        prop: this.prop,
        value: val
      })
    },
    blur(event) {
      this.mixinEvent({
        type: 'blur',
        prop: this.prop,
        value: this.defaultValue,
        event
      })
    },
    focus(event) {
      this.mixinEvent({
        type: 'focus',
        prop: this.prop,
        value: this.defaultValue,
        event
      })
    },
    inputEvent(val) {
      this.$emit('input', val);
      // this.mixinEvent({
      //   type: 'input',
      //   prop: this.prop,
      //   value: val
      // })
    },
    clear() {
      this.mixinEvent({
        type: 'clear',
        prop: this.prop,
        value: this.defaultValue
      })
    }
  },
  mounted() {
    // this.fz
    // console.log('this.fz: ', this.fz);
  },
  watch: {
    name: {
      deep: true,
      handler() {
        // console.log('val: ', val);
        // this.defaultValue = val
      },
      immediate: true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}</style>
