<template>
  <VueSlider
    v-model="sliderValue"
    :tooltip-placement="'bottom'"
    :tooltip-formatter="formatter"
    :tooltip="'always'"
    :drag-on-click="true"
    :min="computedMin"
    :max="computedMax"
  />
</template>

<script>
import VueSlider from 'vue-slider-component'

export default {
  name: 'Slider',
  components: {
    VueSlider
  },
  data () {
    return {
      sliderValue: null
    }
  },
  props: {
    value: null,
    min: Number,
    max: Number,
    logarithmic: Boolean,
    tooltipFormatter: Function
  },
  mounted () {
    this.updateSliderValue()
  },
  methods: {
    formatter (val) {
      const transformedVal = this.transformVal(val)

      if (this.tooltipFormatter) {
        return this.tooltipFormatter(transformedVal)
      } else {
        return transformedVal && transformedVal.toLocaleString()
      }
    },
    transformVal (val) {
      return this.logarithmic ? this.getLogVal(val) : val
    },
    getLogVal (val) {
      const logMinVal = Math.log2(this.min)
      const logMaxVal = Math.log2(this.max + 1)

      const scale = (logMaxVal - logMinVal) / (this.computedMax - this.computedMin)
      return Math.floor(Math.pow(2, logMinVal + (scale * (val - this.computedMin))))
    },
    getExpVal (val) {
      const logMinVal = Math.log2(this.min)
      const logMaxVal = Math.log2(this.max + 1)

      const scale = (logMaxVal - logMinVal) / (this.computedMax - this.computedMin)
      const result = Math.floor((Math.log2(val) - logMinVal) / (scale + this.computedMin))

      return result
    },
    updateSliderValue () {
      this.sliderValue = this.logarithmic ? this.getExpVal(this.value) : this.value
    }
  },
  computed: {
    computedMin () {
      if (this.logarithmic) {
        return 1
      } else {
        return this.min
      }
    },
    computedMax () {
      if (this.logarithmic) {
        return 30_000
      } else {
        return this.max
      }
    },
    computedValue () {
      return this.logarithmic ? this.getLogVal(this.value) : this.value
    }
  },
  watch: {
    sliderValue (val) {
      this.$emit('input', this.transformVal(val))
    }
  }
}
</script>


<style>
.vue-slider {
  flex-grow: 1;
}

.vue-slider-rail {
  border-top: 2px solid #606C8B;
}

.vue-slider-dot-handle {
  width: 21px;
  height: 21px;
  background: url(/images/sliderthumb.svg);
  cursor: pointer;
  top: -6px;
  right: 3px;
  position: relative;
}

.vue-slider-dot-tooltip-bottom {
  bottom: -5px;
  background: #FFFFFF;
  border: 1px solid #606C8B;
  box-sizing: border-box;
  border-radius: 5px;
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  height: 20px;
  padding: 0 10px;
  color: #313C59;
}
</style>
