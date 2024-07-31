import {
  Box,
  Grid,
  TablePagination,
  IconButton,
  Icon,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
} from '@mui/material'
import { ProductsList } from './style'
import { useState } from 'react'
import { Financa } from '../../models/tabelaGeral'

const finance: Financa[] = [
  {
    id: 1,
    data: '2024-07-01',
    categoria: 'Alimentação',
    descricao: 'Supermercado XYZ',
    tipo: 'Despesa',
    valor: 150.0,
    fixoVariavel: 'Variável',
    parcelas: null,
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
    parcelas: null,
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
    parcelas: null,
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
    parcelas: null,
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
    parcelas: null,
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
    parcelas: null,
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
    parcelas: null,
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
    parcelas: null,
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
    parcelas: null,
    observacoes: 'Viagem de trabalho',
  },
]

export function TabelaDeValores() {
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [edit, setEdit] = useState(false)
  const [myFinances, setFinances] = useState<Financa>()

  // const [totalElements, setTotalElements] = useState(5)
  // const [isLoading, setIsLoading] = useState(false)

  // async function dadosCTE() {
  //   setIsLoading(true)
  //   try {
  //     const response = await axios.get(
  //       `/consulta-cte-geral/?page=${page}&size=${pageSize}`,
  //     )
  //     setTotalElements(response.data.totalElements)
  //     setfinance(response.data.list)
  //   } catch (error) {
  //     console.error('Erro na requisição GET:', error)
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  const handelEdit = (item: Financa) => {
    setFinances(item)
    setEdit(true)
  }
  const handelDelete = (item: number) => {
    console.log(item)
  }

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPageSize(parseInt(event.target.value, 10))
    setPage(0)
  }

  // useEffect(() => {
  //   dadosCTE()
  // }, [page, pageSize])

  return (
    <Box sx={{ margin: '1rem 0 1rem 0' }}>
      {finance && (
        <Box>
          <ProductsList>
            <table>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Categoria</th>
                  <th>Descrição</th>
                  <th>Tipo</th>
                  <th>Valor (R$)</th>
                  <th>Categoria Despesa</th>
                  <th>Parcelas</th>
                  <th>Observações</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {finance.map((item: Financa) => (
                  <tr key={item.id}>
                    <td>{item.data}</td>
                    <td>{item.categoria}</td>
                    <td>{item.descricao}</td>
                    <td>{item.tipo}</td>
                    <td>{item.valor}</td>
                    <td>{item.fixoVariavel}</td>
                    <td>{item.parcelas}</td>
                    <td>{item.observacoes}</td>
                    <td>
                      <Grid container spacing={1}>
                        <Grid item xs={6}>
                          <IconButton
                            color="info"
                            onClick={() => handelEdit(item)}
                            aria-label="edit"
                          >
                            <Icon>edit</Icon>
                          </IconButton>
                        </Grid>
                        <Grid item xs={6}>
                          <IconButton
                            color="error"
                            onClick={() => handelDelete(item.id)}
                            aria-label="delete"
                          >
                            <Icon>delete</Icon>
                          </IconButton>
                        </Grid>
                      </Grid>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ProductsList>
          <TablePagination
            sx={{
              background: '#232f3e',
              marginTop: '0.2rem',
              color: '#f7f7f7',
              borderBottomLeftRadius: '8px',
              borderBottomRightRadius: '8px',
            }}
            component="div"
            count={finance.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={pageSize}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      )}
      <Box>
        <Dialog open={edit}>
          <DialogTitle
            sx={{ background: '#232f3e', color: '#f7f7f7' }}
            textAlign="center"
          >
            Editar Finance
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Grid container spacing={1} mt={3}>
                <Grid item xs={12}>
                  <TextField
                    label="Data"
                    type="date"
                    value={myFinances?.data}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Categoria"
                    fullWidth
                    value={myFinances?.categoria}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Descrição"
                    fullWidth
                    value={myFinances?.descricao}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField label="Tipo" fullWidth value={myFinances?.tipo} />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Valor (R$)"
                    fullWidth
                    value={myFinances?.valor}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Categoria Despesas"
                    fullWidth
                    value={myFinances?.fixoVariavel}
                  />
                </Grid>
                {myFinances?.parcelas && (
                  <Grid item xs={12}>
                    <TextField
                      label="Parcelas"
                      fullWidth
                      value={myFinances?.parcelas}
                    />
                  </Grid>
                )}
                <Grid item xs={12}>
                  <TextField
                    label="Observações"
                    fullWidth
                    value={myFinances?.observacoes}
                  />
                </Grid>
              </Grid>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Grid container justifyContent="end" spacing={1} mr={2}>
              <Grid item xs={3}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => setEdit(false)}
                  color="primary"
                >
                  Salvar
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => setEdit(false)}
                  color="warning"
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  )
}
