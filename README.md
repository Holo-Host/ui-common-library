# ui-common-library

A collection of components, stores and other javascript code for use in holo happ uis.

### Run tests
```
npm run test
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

## Stores
`src/stores` contains a number of pinia stores ([overview of pinia](https://pinia.vuejs.org/getting-started.html)) for making connections, app info calls and zome calls in Holo and hybrid holo/holochain apps.

The hybrid case is the most complete, so I'll describe it here.

At a high level, you use a `clientStore` to provide an agnostic interface for your ui, which 
* tells your ui if your connection is ready to make zome calls
* lets you make zome calls
* lets you make app info calls

When creating your `clientStore` you pass it an `interfaceStore`, which is either a `holoStore` or a `holochainStore` (depending on which 
context your in), which actually provides implementations of the above functionality. These two stores share a common interface.

`useClientStore.js`, `useHoloStore.js`, and `useHolochainStore.js` each export a factory function, (`makeUse[X]Store`) that take extra configuration args.

### useSignalStore
`signalStore` allows you to subscribe to signals from your holo or holochain connection. Pass a callback to the store to be called whenever you get a signal from either holo or holochain
```
useSignalStore().addCallback(signal => console.log('got signal', signal))
```

Note: signals are of the form
```
type Signal = {
  // The payload of the signal as provided by the DNA
  data: unknown
  // The hash of the DNA that emitted this signal
  // (Helpful to disambiguate if the hApp has multiple DNAs)
  dna_hash: Uint8Array
}
```

### useIsLoadingStore
`isLoadingStore` allows you to check the loading status of a particular zomeName, fnName pair. calling
```
useIsLoadingStore().isLoading({ zomeName, fnName })
```
will return a bool

### Example

```
import makeUseClientStore from "@uicommon/stores/useClientStore"
import makeUseHolochainStore from "@uicommon/stores/useHolochainStore"
import useSignalStore from "@uicommon/stores/useSignalStore"
import makeUseHoloStore from "@uicommon/stores/useHoloStore"
import makeUseYourCustomDnaStore from "./useYourCustomDnaStore"

// This is just so that we have a consistent pattern of importing stores from src/stores, not individual store files
export const useUiStore = useUiStoreRaw

export const useHolochainStore = makeUseHolochainStore({
  installed_app_id: 'your-local-installed-app-id',
  app_ws_url: 'http://localhost:8888', // path to your local hc app websocket
})

const CHAPERONE_URL = process.env.VUE_APP_CHAPERONE_SERVER_URL
  ? process.env.VUE_APP_CHAPERONE_SERVER_URL
  : "http://localhost:24274"

export const useHoloStore = makeUseHoloStore({
  // Connection args is passed directly to WebSdkApi.connect, see here for details: https://github.com/Holo-Host/web-sdk
  connectionArgs: {
    chaperoneUrl: CHAPERONE_URL,
  }
})

export const useClientStore = makeUseClientStore({
  useInterfaceStore: IS_HOLO_HOSTED ? useHoloStore : useHolochainStore,
  onInit: () => {
    useSignalStore().addCallback(signal => useYourCustomDnaStore().handleSignal(signal))
  }
 })

export const useYourCustomDnaStore = makeUseYourCustomDnaStore({ 
  useClientStore
})

```

From here, you can check if the client store is ready to make zome calls, and make zome calls and app info calls
```
const clientStore = useClientStore()

if (clientStore.isReady) {
  console.log(await clientStore.appInfo()) 
  clientStore.callZome({
    roleId: 'your-dna-role',
    zomeName: 'a-zome',
    fnName: 'a-fn',
    payload: null
  })
}
```





### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
