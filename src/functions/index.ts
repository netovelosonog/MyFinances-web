export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

export const formatDate = (dateString: string): string => {
  const [year, month, day] = dateString.split('-')
  return `${day}/${month}/${year}`
}

export function transformDate(date: string) {
  if (!/^\d{4}-\d{2}$/.test(date)) {
    throw new Error("Data inválida, o formato deve ser 'YYYY-MM'.")
  }
  const [year, month] = date.split('-')
  return `${month}/${year}`
}
