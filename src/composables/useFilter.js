import { computed, ref } from 'vue'

export const EFilterTypes = {
  string: 0,
  number: 1
}

export function useFilter({ data, criteria }) {
  const filterValue = ref('')
  const filterIsActive = ref(false)

  function setFilter({ value, isActive }) {
    filterIsActive.value = isActive
    filterValue.value = value
  }

  const activeFilterCriteria = computed(() => {
    return criteria.filter((criterion) => criterion.minLength <= filterValue.value.length)
  })

  const filteredData = computed(() => {
    if (filterIsActive.value && filterValue.value) {
      // Use set to auto-remove duplicates
      let filteredData = new Set([])

      activeFilterCriteria.value.forEach((criterion) => {
        filteredData = new Set([
          ...filteredData,
          ...data.value.filter((item) => {
            // If the filter is a number, we need to convert the value to a number,
            // remove possible `,` in case user inputs 123,456.00
            // and do not include decimals
            if (criterion.type === EFilterTypes.number) {
              return (
                Number(`${item[criterion.key]}`.split('.')[0]) ===
                Number(filterValue.value.replace(/,/g, '').split('.')[0])
              )
            } else {
              if (criterion.exact) {
                // If exact compare the whole value
                return item[criterion.key] === filterValue.value
              } else {
                // If not exact, check if the value includes the filter value
                return item[criterion.key].toLowerCase().includes(filterValue.value.toLowerCase())
              }
            }
          })
        ])
      })

      return [...filteredData]
    } else {
      // Just return the data if there filter is not active or no value is set
      return data.value
    }
  })

  return {
    setFilter,
    filterValue,
    filteredData
  }
}
