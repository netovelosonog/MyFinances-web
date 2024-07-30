import { Box, Grid, Typography, TextField } from '@mui/material'
import { useState } from 'react'
import { TabelaDeValores } from '../../components/TabelaDeValores'

export function Dashboard() {
  const [valorSalario, setValorSalario] = useState('')

  const addValuePrice = (value: string) => {
    setValorSalario(value)
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
        <Grid item xs={6}>
          <Typography variant="h5">My Finances Dasboard</Typography>
        </Grid>
        <Grid item xs={6} justifyContent="end">
          <TextField
            label="Valor recebido Mensal"
            onChange={(e) => addValuePrice(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TabelaDeValores />
        </Grid>
      </Grid>
    </Box>
  )
}
