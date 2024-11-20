export const NumberUtils = {
  formatToBRLCurrency(num: number) {
    const formatter = Intl.NumberFormat('pt-BR', {
      currency: 'BRL',
      currencyDisplay: 'symbol',
      currencySign: 'standard',
      style: 'currency',
      maximumFractionDigits: 2,
    })

    return formatter.format(Number(num))
  },
}
