<template>
  <div @click="onFieldClick" class="edit-cell">
    <el-tooltip
      v-if="!editMode && !showInput"
      :placement="toolTipPlacement"
      :open-delay="toolTipDelay"
      :content="toolTipContent"
    >
      <div tabindex="0" @keyup.enter="onFieldClick">
        <slot name="content"></slot>
      </div>
    </el-tooltip>
    <component
      :is="editableComponent"
      v-if="editMode || showInput"
      ref="input"
      @focus="onFieldClick"
      @keyup.enter.native="onInputExit"
      v-on="listeners"
      v-bind="$attrs"
      v-model="model"
    >
      <slot name="edit-component-slot"></slot>
    </component>
  </div>
</template>
<script>
export default {
  name: 'editable-cell',
  inheritAttrs: false,
  props: {
    metaInfoOfRow: {
      type: Object,
      default: () => {
        return {};
      },
    },
    value: {
      type: String,
      default: '',
    },
    toolTipContent: {
      type: String,
      default: 'Click to edit',
    },
    toolTipDelay: {
      type: Number,
      default: 500,
    },
    toolTipPlacement: {
      type: String,
      default: 'top-start',
    },
    showInput: {
      type: Boolean,
      default: false,
    },
    editableComponent: {
      type: String,
      default: 'el-input',
    },
    closeEvent: {
      type: String,
      default: 'blur',
    },
  },
  data() {
    return {
      editMode: false,
    };
  },
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
    listeners() {
      return {
        [this.closeEvent]: this.onInputExit,
        ...this.$listeners,
      };
    },
  },
  methods: {
    onFieldClick() {
      this.editMode = true;
      this.$nextTick(() => {
        let inputRef = this.$refs.input;
        if (inputRef) {
          inputRef.focus();
        }
      });
    },
    onInputExit() {
      this.$emit('onInputExit', this.metaInfoOfRow, this.model);
      this.editMode = false;
    },
  },
};
</script>
<style></style>
