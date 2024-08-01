import { Box, Grid, Typography } from '@mui/material'
import { useState } from 'react'
import { TabelaDeValores } from '../../components/TabelaDeValores'
import { formatCurrency } from '../../functions'

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
      </Grid>
    </Box>
  )
}
