import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { AppBar, Box, Grid, Toolbar, Typography } from '@mui/material'
import { Router } from './routes/router'
import './App.css'

export const App = () => {
  return (
    <BrowserRouter>
      <Box
        sx={{
          padding: { xs: 1, sm: 2, md: 3, lg: 4 },
          background: '#f7f7f7',
          minHeight: '100dvh',
        }}
      >
        <Grid container>
          <Grid item xs={12}>
            <AppBar position="fixed" sx={{ background: '#131921' }}>
              <Toolbar>
                <Typography variant="h6" color="#f7f7f7" noWrap>
                  My Finances
                </Typography>
              </Toolbar>
            </AppBar>
          </Grid>
          <Grid item xs={12}>
            <ToastContainer theme="colored" />
            <Toolbar />
            <Router />
          </Grid>
        </Grid>
      </Box>
    </BrowserRouter>
  )
}
