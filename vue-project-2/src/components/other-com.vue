<template>
  <h1 @click="click">{{ count }}</h1>
</template>
<script >
import { useCounterStore } from '../store/counter.js';
import { observable } from '../observables/index.js';

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
    observable.subscribe({
      next: (x) => {
        console.log('>>>> ' + x);
      },
    });
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