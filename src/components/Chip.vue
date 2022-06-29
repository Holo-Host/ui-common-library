<template>
  <div>      
    <div class="add-chip-textbox-container">
        <VueSelect class="select-items" multiple v-model="modelChips"
            :options="unusedAvailableChips"
            :placeholder="placeHolderText"
            :autocomplete="'on'"
            @option:selected="onAddChip"
            @option:deselected="onRemoveChip ">
        </VueSelect>
    </div>      
  </div>
</template>

<script>

import VueSelect from 'vue-select' // 3rd party selection tool: https://vue-select.org/

export default {
    name: "Chip",
    components: {VueSelect},
    props: {
        availableChips: Array,
        chips: Array,
        placeHolderText: String,
        handleAddChip: { type: Function, required: true },
        handleRemoveChip: { type: Function, required: true },
    },
    data () {
        return {
            modelChips: [],
        }
    },
    watch: {
        chips: {
            immediate: true,
            handler (newVal) {
                this.modelChips = newVal;
            }
        },
    },        
    methods: {
        onAddChip(chips) {
            this.handleAddChip(chips);
        },
        onRemoveChip(chip) {
            this.handleRemoveChip(chip);
        }
    },
    computed: {
        unusedAvailableChips () {
            return this.availableChips.filter(chip => !this.chips.includes(chip));
        }
    },    
}
</script>

<style scoped>
@import '/node_modules/vue-select/dist/vue-select.css';

.select-items {
    width: 100%;
}

.select-items .vs__dropdown-menu {
  font-family: "Nunito Sans", sans-serif;
}

.add-chip-textbox-container {
    display: flex;
    flex: 0 1 auto;
    width: 100%;
    position: relative;
    align-items: flex-start;
    margin: 0.5rem 0 0.5rem 0rem;
    --vs-search-input-color: rgb(0,0,0, 0.65);
}

</style>