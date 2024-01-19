const kCurrencyDecimals = 2

export function formatCurrency(value, decimals = kCurrencyDecimals) {
  return decimals
    ? value.toFixed(decimals).replace(/\d(?=(\d{3})+\.)/gu, '$&,')
    : value.toLocaleString()
}

export const presentBytes = (bytes) => {
  if (isNaN(bytes)) {
    return '-- GB'
  }

  if (bytes === 0) {
    return '0 GB'
  }

  const k = 1024
  const sizes = ['Bytes', 'kB', 'MB', 'GB', 'TB']

  // eslint-disable-next-line no-magic-numbers
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(k)), 4)

  // eslint-disable-next-line no-magic-numbers
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}

export const presentMicroSeconds = (ms) => {
  if (isNaN(ms)) {
    return '-- ms'
  }

  if (ms === 0) {
    return '0 ms'
  }

  const k = 1000
  const sizes = ['μs', 'ms', 's']

  // eslint-disable-next-line no-magic-numbers
  const i = Math.min(Math.floor(Math.log(ms) / Math.log(k)), 2)

  // eslint-disable-next-line no-magic-numbers
  return `${parseFloat((ms / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}

export const presentHolofuelAmount = amountString => {
  if (!amountString) {
    return '--'
  }
  const { integerPart, decimalPart } = parseHolofuelAmount(amountString)
  return insertCommas(integerPart) + decimalPart.slice(0, 5)
}

const parseHolofuelAmount = amountString => {
  const dotIndex = amountString.search(/\./)
  const integerPart = amountString.slice(0, dotIndex === -1 ? amountString.length : dotIndex)
  const decimalPart = amountString.slice(integerPart.length)
  return { integerPart, decimalPart }
}

const insertCommas = numberString => {
  let result = ''
  let i = numberString.length
  while (/\d{4}/.test(numberString.slice(i - 4, i))) {
    result = `,${numberString.slice(i - 3, i)}${result}`
    i -= 3
  }
  return numberString.slice(0, i) + result
}
