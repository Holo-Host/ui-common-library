// Restructure hc signal to match chaperone signal
export const presentHcSignal = hcSignal => {
    return {
      dna_hash: hcSignal.data.cellId[0],
      data: hcSignal.data.payload
    }
  }
  