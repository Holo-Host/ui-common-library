import dayjs from 'dayjs'

const kMsInSecond = 1000

export function createDate(year, month, day) {
  return dayjs(`${year}-${month}-${day}`).valueOf() * kMsInSecond
}

export const headersMap = new Map([
  [
    'happ',
    {
      key: 'happ',
      label: 'hApp',
      isVisibleOnMobile: true,
      isSortable: true
    }
  ],
  [
    'counterparty',
    {
      key: 'counterparty',
      label: 'hApp Manager',
      isVisibleOnMobile: false,
      isSortable: true
    }
  ],
  [
    'completed_date',
    {
      key: 'completed_date',
      label: 'Date Paid',
      isVisibleOnMobile: true,
      isSortable: true
    }
  ],
  [
    'expiration_date',
    {
      key: 'expiration_date',
      label: 'Date Due',
      isVisibleOnMobile: false,
      isSortable: true
    }
  ],
  [
    'formattedId',
    {
      key: 'formattedId',
      label: 'Transaction Hash',
      isVisibleOnMobile: false,
      isSortable: true
    }
  ],
  [
    'amount',
    {
      key: 'amount',
      label: 'Amount',
      isVisibleOnMobile: true,
      isSortable: true,
      align: 'end'
    }
  ],
  [
    'status',
    {
      key: 'payment_status',
      label: 'Payment Status',
      isVisibleOnMobile: true,
      isSortable: false
    }
  ]
])

/* eslint-disable no-magic-numbers */

export const mockPaidInvoicesData = [
  {
    id: 'uhCEkuoMG0RpLkYciC3ZO2ZiedEhDq9yZJLrbjjVmNmXvjpvaAE6H',
    amount: '1234567',
    created_date: createDate(2022, 9, 20),
    completed_date: createDate(2022, 9, 23),
    transaction_type: { Request: null },
    counterparty: 'uhCAki0d39_k2EkZzuUESiw03zuRYoPh05vswcLsi566MC-Nxqtuc',
    direction: { Outgoing: null },
    status: { Completed: null },
    note: 'Holo Hosting Invoice <last 5 char of hha_id>:AAA',
    proof_of_service_token: null,
    url: null,
    expiration_date: createDate(2022, 9, 25)
  },
  {
    id: 'uhCEkuoMG0RpLkYciC3ZO2ZiedEhDq9yZJLrbjjVmNmXvjpvaAE6I',
    amount: '1224567',
    created_date: createDate(2022, 9, 21),
    completed_date: createDate(2022, 9, 23),
    transaction_type: { Request: null },
    counterparty: 'uhCAki0d39_k9ZzuUESiw09zuRYoPh05vswcLsi566MC-Nxqtuz',
    direction: { Outgoing: null },
    status: { Completed: null },
    note: 'Holo Hosting Invoice <last 5 char of hha_id>:AAB',
    proof_of_service_token: null,
    url: null,
    expiration_date: createDate(2022, 9, 27)
  },
  {
    id: 'uhCEkuoMG0RpLkYciC3ZO2ZiedEhDq9yZJLrbjjVmNmXvjpvaAE6J',
    amount: '123469.89',
    created_date: createDate(2022, 9, 20),
    completed_date: createDate(2022, 9, 23),
    transaction_type: { Request: null },
    counterparty: 'uhCAki0d39_k9ZzuUESiw09zuRYoPh05vswcLsi566MC-Nxqtuz',
    direction: { Outgoing: null },
    status: { Completed: null },
    note: 'Holo Hosting Invoice <last 5 char of hha_id>:ABA',
    proof_of_service_token: null,
    url: null,
    expiration_date: createDate(2022, 9, 27)
  },
  {
    id: 'uhCEkuoMG0RpLkYciC3ZO2ZiedEhDq9yZJLrbjjVmNmXvjpvaAE6K',
    amount: '1234565.89',
    created_date: createDate(2022, 9, 25),
    completed_date: createDate(2022, 9, 26),
    transaction_type: { Request: null },
    counterparty: 'uhCAki0d39_k9ZzuUESiw09zuRYoPh05vswcLsi566MC-Nxqtuz',
    direction: { Outgoing: null },
    status: { Completed: null },
    note: 'Holo Hosting Invoice <last 5 char of hha_id>:BAA',
    proof_of_service_token: null,
    url: null,
    expiration_date: 1663999999999999
  },
  {
    id: 'uhCEkuoMG0RpLkYciC3ZO2ZiedEhDq9yZJLrbjjVmNmXvjpvaAE6L',
    amount: '134561.89',
    created_date: createDate(2022, 8, 20),
    completed_date: createDate(2022, 8, 23),
    transaction_type: { Request: null },
    counterparty: 'uhCAki0d39_k9ZzuUESiw09zuRYoPh05vswcLsi566MC-Nxqtuz',
    direction: { Outgoing: null },
    status: { Completed: null },
    note: 'Holo Hosting Invoice <last 5 char of hha_id>:BAB',
    proof_of_service_token: null,
    url: null,
    expiration_date: createDate(2022, 8, 25)
  },
  {
    id: 'uhCEkuoMG0RpLkYciC3ZO2ZiedEhDq9yZJLrbjjVmNmXvjpvaAE6M',
    amount: '1234563.89',
    created_date: createDate(2022, 8, 28),
    completed_date: createDate(2022, 8, 30),
    transaction_type: { Request: null },
    counterparty: 'uhCAki0d39_k9ZzuUESiw09zuRYoPh05vswcLsi566MC-Nxqtuz',
    direction: { Outgoing: null },
    status: { Completed: null },
    note: 'Holo Hosting Invoice <last 5 char of hha_id>:BAB',
    proof_of_service_token: null,
    url: null,
    expiration_date: createDate(2022, 8, 30)
  },
  {
    id: 'uhCEkuoMG0RpLkYciC3ZO2ZiedEhDq9yZJLrbjjVmNmXvjpvaAE6N',
    amount: '124561.93',
    created_date: createDate(2022, 9, 28),
    completed_date: createDate(2022, 9, 29),
    transaction_type: { Request: null },
    counterparty: 'uhCAki0d39_k9ZzuUESiw09zuRYoPh05vswcLsi566MC-Nxqtuz',
    direction: { Outgoing: null },
    status: { Completed: null },
    note: 'Holo Hosting Invoice <last 5 char of hha_id>:BAB',
    proof_of_service_token: null,
    url: null,
    expiration_date: createDate(2022, 9, 30)
  },
  {
    id: 'uhCEkuoMG0RpLkYciC3ZO2ZiedEhDq9yZJLrbjjVmNmXvjpvaAE6O',
    amount: '1234568.89',
    created_date: createDate(2022, 9, 1),
    completed_date: createDate(2022, 9, 3),
    transaction_type: { Request: null },
    counterparty: 'uhCAki0d39_k9ZzuUESiw09zuRYoPh05vswcLsi566MC-Nxqtuz',
    direction: { Outgoing: null },
    status: { Completed: null },
    note: 'Holo Hosting Invoice <last 5 char of hha_id>:BAB',
    proof_of_service_token: null,
    url: null,
    expiration_date: createDate(2022, 9, 25)
  },
  {
    id: 'uhCEkuoMG0RpLkYciC3ZO2ZiedEhDq9yZJLrbjjVmNmXvjpvaAE6P',
    amount: '1234568.89',
    created_date: createDate(2022, 9, 3),
    completed_date: createDate(2022, 9, 4),
    transaction_type: { Request: null },
    counterparty: 'uhCAki0d39_k9ZzuUESiw09zuRYoPh05vswcLsi566MC-Nxqtuz',
    direction: { Outgoing: null },
    status: { Completed: null },
    note: 'Holo Hosting Invoice <last 5 char of hha_id>:BAB',
    proof_of_service_token: null,
    url: null,
    expiration_date: createDate(2022, 9, 5)
  },
  {
    id: 'uhCEkuoMG0RpLkYciC3ZO2ZiedEhDq9yZJLrbjjVmNmXvjpvaAE6R',
    amount: '2234569.89',
    created_date: createDate(2022, 9, 3),
    completed_date: createDate(2022, 9, 4),
    transaction_type: { Request: null },
    counterparty: 'uhCAki0d39_k9ZzuUESiw09zuRYoPh05vswcLsi566MC-Nxqtuz',
    direction: { Outgoing: null },
    status: { Completed: null },
    note: 'Holo Hosting Invoice <last 5 char of hha_id>:BAB',
    proof_of_service_token: null,
    url: null,
    expiration_date: createDate(2022, 9, 9)
  },
  {
    id: 'uhCEkuoMG0RpLkYciC3ZO2ZiedEhDq9yZJLrbjjVmNmXvjpvaAE6S',
    amount: '234563.89',
    created_date: createDate(2022, 9, 3),
    completed_date: createDate(2022, 9, 4),
    transaction_type: { Request: null },
    counterparty: 'uhCAki0d39_k9ZzuUESiw09zuRYoPh05vswcLsi566MC-Nxqtuz',
    direction: { Outgoing: null },
    status: { Completed: null },
    note: 'Holo Hosting Invoice <last 5 char of hha_id>:BAB',
    proof_of_service_token: null,
    url: null,
    expiration_date: createDate(2022, 9, 10)
  },
  {
    id: 'uhCEkuoMG0RpLkYciC3ZO2ZiedEhDq9yZJLrbjjVmNmXvjpvaAE6T',
    amount: '1234565.89',
    created_date: createDate(2022, 9, 7),
    completed_date: createDate(2022, 9, 9),
    transaction_type: { Request: null },
    counterparty: 'uhCAki0d39_k9ZzuUESiw09zuRYoPh05vswcLsi566MC-Nxqtuz',
    direction: { Outgoing: null },
    status: { Completed: null },
    note: 'Holo Hosting Invoice <last 5 char of hha_id>:BAB',
    proof_of_service_token: null,
    url: null,
    expiration_date: createDate(2022, 9, 11)
  }
]

export const hAppMock = {
  id: 'uhCkkfNK_V3PNPqR2EUpxL_YhMux1BFwQ5SxxE4ZG3LjazkK2hlfx',
  name: 'Test-Happ',
  special_installed_app_id: null,
  bundleUrl: 'https://github.com/Holo-Host/dummy-dna/releases/download/v0.5.4/test.happ',
  hostedUrls: ['test.holo.host'],
  logoUrl: null,
  isPaused: false,
  enabled: true,
  sourceChains: 0,
  usage: { bandwidth: 0, cpu: 0 },
  storage: 0
}

/* eslint-enable no-magic-numbers */
