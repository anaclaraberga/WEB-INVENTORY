export const StringUtils = {
  formatDocument(str: string) {
    const trimmed = str.trim().replace(/\D/g, '')

    if (trimmed.length == 11) {
      return StringUtils.formatCpf(trimmed)
    }

    return StringUtils.formatCnpj(trimmed)
  },
  formatCpf(str: string) {
    return str.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  },
  formatCnpj(str: string) {
    return str.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
      '$1.$2.$3/$4-$5'
    )
  },
  getNameInitials(str: string) {
    return str
      .split(' ')
      .slice(0, 2)
      .map((word) => word.charAt(0).toUpperCase())
      .join('')
  },
}
