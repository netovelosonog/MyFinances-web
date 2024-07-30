import { Button, Card, Grid, Typography } from '@mui/material'
import TextField from '@mui/material/TextField'
import * as React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function NewAcout() {
  const router = useNavigate()
  const [values, setValues] = useState({
    usernameOrEmail: '',
    password: '',
  })

  const [errors, setErrors] = useState({
    usernameOrEmail: false,
    password: false,
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setValues({ ...values, [name]: value })
  }

  const validateFields = () => {
    const newErrors = {
      usernameOrEmail: !values.usernameOrEmail,
      password: !values.password,
    }
    setErrors(newErrors)
    return Object.values(newErrors).every((error) => !error)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (validateFields()) {
      console.log('Formulário válido', values)
      router('/')
      // Envie os dados aqui
    } else {
      console.log('Formulário inválido')
    }
  }

  return (
    <Grid
      container
      minHeight="90dvh"
      component="form"
      justifyContent="center"
      alignItems="center"
      onSubmit={handleSubmit}
    >
      <Card sx={{ maxWidth: '40rem' }}>
        <Grid container p={3} spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h5" textAlign="center">
              Criar Conta
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              error={errors.usernameOrEmail}
              id="outlined-nome"
              name="usernameOrEmail"
              label="Nome de usuario ou email"
              value={values.usernameOrEmail}
              onChange={handleChange}
              helperText={
                errors.usernameOrEmail
                  ? 'Nome de usuario ou email obrigatórios.'
                  : ''
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              error={errors.password}
              type="password"
              id="filled-email"
              name="password"
              label="Senha"
              value={values.password}
              onChange={handleChange}
              helperText={errors.password ? 'Senha é obrigatória.' : ''}
            />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth type="submit" variant="contained" sx={{ m: 1 }}>
              Enviar
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  )
}
