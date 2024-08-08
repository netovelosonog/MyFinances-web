import { Box, Grid, Typography } from '@mui/material'
import { useState } from 'react'
import { TabelaDeValores } from '../../components/TabelaDeValores'
import { formatCurrency } from '../../functions'
import { Financa } from '../../models/tabelaGeral'
import { FinanceCharts } from '../../components/Graficos'

const finance: Financa[] = [
  {
    id: 1,
    data: '2024-07-01',
    categoria: 'Alimentação',
    descricao: 'Supermercado XYZ',
    tipo: 'Despesa',
    valor: 650.0,
    fixoVariavel: 'Variável',
    observacoes: 'Compra mensal',
  },
  {
    id: 2,
    data: '2024-07-02',
    categoria: 'Transporte',
    descricao: 'Abastecimento carro',
    tipo: 'Despesa',
    valor: 200.0,
    fixoVariavel: 'Variável',
    observacoes: null,
  },
  {
    id: 3,
    data: '2024-07-03',
    categoria: 'Lazer',
    descricao: 'Cinema',
    tipo: 'Despesa',
    valor: 50.0,
    fixoVariavel: 'Variável',
    observacoes: null,
  },
  {
    id: 4,
    data: '2024-07-05',
    categoria: 'Saúde',
    descricao: 'Consulta médica',
    tipo: 'Despesa',
    valor: 100.0,
    fixoVariavel: 'Variável',
    observacoes: 'Plano de saúde',
  },
  {
    id: 5,
    data: '2024-07-07',
    categoria: 'Salário',
    descricao: 'Salário mensal',
    tipo: 'Receita',
    valor: 3000.0,
    fixoVariavel: 'Fixo',
    observacoes: null,
  },
  {
    id: 6,
    data: '2024-07-10',
    categoria: 'Educação',
    descricao: 'Curso online',
    tipo: 'Despesa',
    valor: 1000.0,
    fixoVariavel: 'Parcela',
    parcelas: 10,
    observacoes: '10x de 100,00',
  },
  {
    id: 7,
    data: '2024-07-15',
    categoria: 'Moradia',
    descricao: 'Aluguel',
    tipo: 'Despesa',
    valor: 1200.0,
    fixoVariavel: 'Fixo',
    observacoes: null,
  },
  {
    id: 8,
    data: '2024-07-20',
    categoria: 'Investimentos',
    descricao: 'Aplicação em ações',
    tipo: 'Receita',
    valor: 500.0,
    fixoVariavel: 'Variável',
    observacoes: null,
  },
  {
    id: 9,
    data: '2024-07-22',
    categoria: 'Alimentação',
    descricao: 'Restaurante ABC',
    tipo: 'Despesa',
    valor: 80.0,
    fixoVariavel: 'Variável',
    observacoes: 'Almoço com amigos',
  },
  {
    id: 10,
    data: '2024-07-25',
    categoria: 'Transporte',
    descricao: 'Uber',
    tipo: 'Despesa',
    valor: 30.0,
    fixoVariavel: 'Variável',
    observacoes: 'Viagem de trabalho',
  },
  {
    id: 11,
    data: '2024-08-01',
    categoria: 'Alimentação',
    descricao: 'Supermercado XYZ',
    tipo: 'Despesa',
    valor: 150.0,
    fixoVariavel: 'Variável',
    observacoes: 'Compra mensal',
  },
  {
    id: 12,
    data: '2024-08-02',
    categoria: 'Transporte',
    descricao: 'Abastecimento carro',
    tipo: 'Despesa',
    valor: 200.0,
    fixoVariavel: 'Variável',
    observacoes: null,
  },
  {
    id: 13,
    data: '2024-08-03',
    categoria: 'Lazer',
    descricao: 'Cinema',
    tipo: 'Despesa',
    valor: 50.0,
    fixoVariavel: 'Variável',
    observacoes: null,
  },
  {
    id: 14,
    data: '2024-08-05',
    categoria: 'Saúde',
    descricao: 'Consulta médica',
    tipo: 'Despesa',
    valor: 100.0,
    fixoVariavel: 'Variável',
    observacoes: 'Plano de saúde',
  },
  {
    id: 15,
    data: '2024-08-08',
    categoria: 'Salário',
    descricao: 'Salário mensal',
    tipo: 'Receita',
    valor: 3000.0,
    fixoVariavel: 'Fixo',
    observacoes: null,
  },
  {
    id: 16,
    data: '2024-08-10',
    categoria: 'Educação',
    descricao: 'Curso online',
    tipo: 'Despesa',
    valor: 1000.0,
    fixoVariavel: 'Parcela',
    parcelas: 10,
    observacoes: '10x de 100,00',
  },
  {
    id: 17,
    data: '2024-08-15',
    categoria: 'Moradia',
    descricao: 'Aluguel',
    tipo: 'Despesa',
    valor: 800.0,
    fixoVariavel: 'Fixo',
    observacoes: null,
  },
  {
    id: 18,
    data: '2024-08-20',
    categoria: 'Investimentos',
    descricao: 'Aplicação em ações',
    tipo: 'Receita',
    valor: 1000.0,
    fixoVariavel: 'Variável',
    observacoes: null,
  },
  {
    id: 19,
    data: '2024-08-22',
    categoria: 'Alimentação',
    descricao: 'Restaurante ABC',
    tipo: 'Despesa',
    valor: 180.0,
    fixoVariavel: 'Variável',
    observacoes: 'Almoço com amigos',
  },
  {
    id: 20,
    data: '2024-08-25',
    categoria: 'Transporte',
    descricao: 'Uber',
    tipo: 'Despesa',
    valor: 130.0,
    fixoVariavel: 'Variável',
    observacoes: 'Viagem de trabalho',
  },
]

export function Dashboard() {
  const [total, setTotal] = useState(0)

  const handleTotalChange = (newTotal: number) => {
    setTotal(newTotal)
  }

  return (
    <Box>
      <Grid container alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h5" textAlign="center">
            Dashboard
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <hr style={{ margin: '1rem 0 1rem 0' }} />
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h5">My Finances Dasboard</Typography>
        </Grid>
        <Grid item xs={4} justifyContent="end">
          <h3>Saldo/Debito Mensal: {formatCurrency(total)}</h3>
        </Grid>
        <Grid item xs={12}>
          <TabelaDeValores onTotalChange={handleTotalChange} />
        </Grid>
        <Grid item xs={12}>
          <FinanceCharts finance={finance} />
        </Grid>
      </Grid>
    </Box>
  )
}
