<template>
  <div @click="click">{{ count }}</div>
</template>
<script >
import { useCounterStore } from '../store/counter.js';

import { mapStores, mapState, mapActions } from 'pinia';

export default {
  props: ['configObj'],
  // watch: {
  //   configObj: {
  //     handler() {
  //       this.doSomethingWhenConfigChanged();
  //     },
  //   },
  // },
  computed: {
    // 其他计算属性
    // ...
    // 允许访问 this.counterStore 和 this.userStore
    ...mapStores(useCounterStore),
    // 允许读取 this.count 和 this.double
    ...mapState(useCounterStore, ['count']),
  },
  mounted() {
    // this.doSomethingWhenConfigChanged();
  },
  methods: {
    ...mapActions(useCounterStore, ['increment']),
    click() {
      this.increment();
      // this.$emit('change');
    },
  },
};
</script>../store/counter