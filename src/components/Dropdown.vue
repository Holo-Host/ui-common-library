<template>
  <div>
    <div class="label" v-if="label && label.length > 0">{{ label }}:</div>
    <select v-model="selectedOption" :disabled="disabled" class="drop-down" @change="$emit('optionChanged', selectedOption)">
      <option v-for="option in options" :value="option" :key="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'DropDown',
  emits: ['optionChanged'],
  props: {
    disabled: Boolean,
    label: String,
    options: Array,
    selectedOption: String
  }
}
</script>

<style scoped>
.label {
  font-weight: bold;
  color: #606c8b;
  flex-shrink: 0;
  flex-basis: 100px;
}

.drop-down {
  flex-shrink: 0;
  flex-basis: 200px;
  margin-right: 10px;
  font-weight: bold;
  font-size: 14px;
  font-family: "Nunito Sans", sans-serif;
  line-height: 19px;
  color: #606c8b;
  height: 2.1rem;
}
</style>
