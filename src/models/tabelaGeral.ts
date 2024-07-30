export interface Financa {
  id: number
  data: string
  categoria: string
  descricao: string
  tipo: 'Despesa' | 'Receita'
  valor: number
  fixoVariavel: 'Fixo' | 'Variável' | 'Parcela'
  parcelas: number | null
  observacoes: string | null
}
