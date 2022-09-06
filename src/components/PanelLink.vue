<template>
  <div class='panel' :class="computedPanelStyle" @click="handlePanelClick">
    <div class="panel-icon">
      <slot></slot>
    </div>
    <div class="panel-text">
      {{panelText}}
    </div>
    <div class="right-chevron-icon">
      <RightChevronIcon class="right-chevron-icon" color='#313C59' :disabled="disabled"/>
    </div>
  </div>
</template>

<script>
import RightChevronIcon from './icons/RightChevronIcon'

export default {
  name: 'PanelLink',
  components: {
    RightChevronIcon
  },
  props: {
    disabled: {type: Boolean, default: false },
    uri: String,
    panelText: String
  },
  methods: {
    handlePanelClick (e) {
      console.log("handlePanelClick", e)
    }
  },
  computed: {
    computedPanelStyle () {
      return this.disabled ? 'panel-disabled' : 'panel-enabled'
    }
  }
}
</script>

<style>
.panel {
  display: flex;
  align-items: center;
  width: 100%;
  height: 52px;
  border-radius: 5px;
  
}

.panel-enabled {
  background-color: var(--medium-highlight-color);
  color: var(--content-color);
  cursor: pointer;
}

.panel-disabled {
  background-color: var(--disabled-highlight-color);
  color: var(--disabled-content-color);
}

.panel-icon {
  margin-left: auto;
  margin-right: 0;
  display: flex;
  align-items: center;
  margin-left: 20px;
  margin-top: 10px;
  width: 40px;
  height: 100%;
}

.panel-text {
  width: 100%;
  margin-left: 10px;
  margin-right: auto;
  font-size: 16px;
  font-weight: 700;
}

.right-chevron-icon {
  display: flex;
  margin-right: 20px;
  align-items: center;
}

</style>