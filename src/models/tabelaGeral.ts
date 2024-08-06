export interface Financa {
  id: number
  data: string
  categoria: string
  descricao: string
  tipo: 'Despesa' | 'Receita'
  valor: number
  fixoVariavel: 'Fixo' | 'Variável' | 'Parcela'
  parcelas?: number
  observacoes: string | null
}

export interface FinancaAdd {
  data: string
  categoria: string
  descricao: string
  tipo: 'Despesa' | 'Receita'
  valor: number | null
  fixoVariavel: 'Fixo' | 'Variável' | 'Parcela'
  parcelas?: number
  observacoes?: string
}
