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

export interface FinancaAdd {
  data: string
  categoria: string
  descricao: string
  tipo: 'Despesa' | 'Receita'
  valor: number | undefined
  fixoVariavel: 'Fixo' | 'Variável' | 'Parcela'
  parcelas: number | undefined
  observacoes: string
}
