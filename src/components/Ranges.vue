<template>
  <div class='ranges'>
    <div v-for="(pStyle, i) in partitionStyles" class="partition" :key="i" :style="pStyle" />
  </div>
</template>

<script>

export default {
  name: 'Ranges',
  props: {
    numbers: Array,
    value: Number,
    min: Number,
    max: Number,
    numPartitions: {
      type: Number,
      default: 20
    }
  },
  computed: {
    partitionStyles () {
      const stepSize = Math.ceil((this.max - this.min) / this.numPartitions)

      let partitions = [... new Array(this.numPartitions)].map(() => 0)

      this.numbers.forEach(number => {
        const partitionIndex = Math.floor((( number - this.min)/stepSize))
        partitions[partitionIndex]++
      })

      const max = Math.max(...partitions)

      const highestHighlightIndex =  Math.floor((this.value/stepSize))

      const styles = partitions.map((partition, i) => {
        const isHighlight = i <= highestHighlightIndex
        const color = isHighlight ? '#606C8B' : `#AEB7CC`
        const height = `${Math.floor((partition/max) * 100)}%`
        return {
          height,
          'background-color': color
        }
      })

      return styles
    }
  }
}
</script>


<style>
.ranges {
  height: 78px;
  display: flex;
  align-items: flex-end;
}

.partition {
  border-radius: 3px 3px 0px 0px;
  flex-grow: 1;
  margin: 0 1px;
}
</style>
