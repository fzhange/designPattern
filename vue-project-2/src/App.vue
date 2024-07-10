<template>
  <div id="app">
    <!-- <el-time-picker is-range :picker-options="{}" v-model="time"></el-time-picker> -->

    <el-time-picker
      is-range
      v-model="value1"
      range-separator="至"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
      placeholder="选择时间范围"
      @change="handleChange"
    >
    </el-time-picker>
  </div>
</template>

<script>
import EditableCell from './components/EditableCell.vue';

export default {
  name: 'App',
  components: {
    EditableCell,
  },
  data() {
    return {
      value1: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
      data: [
        {
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 4,
              label: '二级 1-1',
              children: [
                {
                  id: 9,
                  label: '三级 1-1-1',
                },
                {
                  id: 10,
                  label: '三级 1-1-2',
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: '一级 2',
          children: [
            {
              id: 5,
              label: '二级 2-1',
            },
            {
              id: 6,
              label: '二级 2-2',
            },
          ],
        },
        {
          id: 3,
          label: '一级 3',
          children: [
            {
              id: 7,
              label: '二级 3-1',
            },
            {
              id: 8,
              label: '二级 3-2',
            },
          ],
        },
      ],
      defaultProps: {
        children: 'children',
        label: 'label',
      },
    };
  },
  methods: {
    handleChange(value) {
      // 这里可以放宽松对时间范围的验证逻辑，允许结束时间早于开始时间
      // 但请注意，这样做可能会影响后续业务逻辑的处理
      // 在此不做实际的验证处理，直接赋值
      this.value1 = value;
    },
    ttt() {
      console.log('this.$refs.tree: ', this.$refs.tree);
      this.$nextTick(() => {
        // 假设你要设置的节点 key 为 'yourDesiredNodeId'
        // this.$refs.tree.setCurrentKey('yourDesiredNodeId');
        this.$refs.tree.setChecked(this.data[0].id, true);
      });
    },
  },
  computed: {},
  mounted() {},
  watch: {},
};
</script>

<style>
.edit-cell {
  min-height: 35px;
  cursor: pointer;
}
</style>
