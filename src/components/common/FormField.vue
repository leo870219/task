<template>
  <div class="form-field" :class="{ 'error': showErrorMessage && fieldData.errorMessage }">
    <label class="form-label" :class="labelClass">
      {{ fieldData.label }}
    </label>
    <div class="p-0" :class="inputClass">
      <input class="form-control" :type="fieldData.type" :value="fieldData.value"
      @input="$emit('input', $event.target.value)">
    </div>
    <span class="text-start p-0">{{ fieldData.errorMessage }}</span>
  </div>
</template>

<script>
export default {
  name: 'FormField',
  props: {
    fieldData: {
      type: Object,
    },
    showErrorMessage: {
      type: Boolean,
      default: false
    },
    labelClass: {
      type: String,
      default: ''
    },
    inputClass: {
      type: String,
      default: ''
    },
  },
}
</script>

<style lang="scss" scoped>
.form-field {
  position: relative;
  transition: 0.3s ease;
  margin-bottom: 20px;

  &.row {
    align-items: center;

    >label {
      margin: 0;
    }
  }

  &.error {
    margin-bottom: 32px;

    input {
      border-color: red;
    }

    >span {
      visibility: visible;
      opacity: 1;
    }
  }

  >span {
    visibility: hidden;
    opacity: 0;
    position: absolute;
    bottom: -28px;
    left: 0;
    color: red;
    transition: 0.3s ease;
  }

  input {
    border: 1px solid gray;
    transition: 0.3s ease;
  }

  >label {
    display: block;
    text-align-last: left;
  }
}
</style>
