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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Card,
} from '@mui/material'
import { ProductsList } from './style'
import { ChangeEvent, useEffect, useState } from 'react'
import { Financa, FinancaAdd } from '../../models/tabelaGeral'
import { formatCurrency, formatDate } from '../../functions'
import { toast } from 'react-toastify'

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
]

interface TabelaDeValoresProps {
  onTotalChange: (total: number) => void
}

export function TabelaDeValores({ onTotalChange }: TabelaDeValoresProps) {
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [edit, setEdit] = useState(false)
  const [myFinances, setFinances] = useState<Financa | null>(null)
  const [financeDelete, setFinanceDelete] = useState(false)
  const [financeAdd, setFinanceAdd] = useState(false)
  const [formValuesAdd, setFormValuesAdd] = useState<FinancaAdd>({
    data: '',
    categoria: '',
    descricao: '',
    tipo: 'Despesa',
    valor: null,
    fixoVariavel: 'Variável',
    parcelas: 0,
    observacoes: '',
  })

  const [errors, setErrors] = useState<Record<string, boolean>>({
    data: false,
    categoria: false,
    descricao: false,
    tipo: false,
    valor: false,
    fixoVariavel: false,
    parcelas: false,
    observacoes: false,
  })

  const handleInputChangeAdd = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target
    setFormValuesAdd({
      ...formValuesAdd,
      [name]:
        name === 'valor' || name === 'parcelas' ? parseFloat(value) : value,
    })
  }

  const handleSelectChangeAdd = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target
    setFormValuesAdd({
      ...formValuesAdd,
      [name as string]: value,
    })
  }

  const newFinanceAdd = () => {
    setFormValuesAdd({
      data: '',
      categoria: '',
      descricao: '',
      tipo: 'Despesa',
      valor: null,
      fixoVariavel: 'Variável',
      parcelas: 0,
      observacoes: '',
    })
    setFinanceAdd(true)
  }

  const isFormValid = (): boolean => {
    const newErrors: Record<string, boolean> = {}
    let valid = true

    for (const key in formValuesAdd) {
      if (key === 'valor' || key === 'parcelas') {
        if (formValuesAdd[key as keyof FinancaAdd] === null) {
          newErrors[key] = true
          valid = false
        } else {
          newErrors[key] = false
        }
      } else if (key !== 'observacoes') {
        if (formValuesAdd[key as keyof FinancaAdd] === '') {
          newErrors[key] = true
          valid = false
        } else {
          newErrors[key] = false
        }
      }
    }

    if (formValuesAdd.fixoVariavel === 'Parcela') {
      if (formValuesAdd.parcelas === undefined || formValuesAdd.parcelas <= 0) {
        newErrors.parcelas = true
        valid = false
      } else {
        newErrors.parcelas = false
      }
    } else {
      newErrors.parcelas = false
    }

    setErrors(newErrors)
    return valid
  }

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

  const calculateTotal = () => {
    return finance.reduce((total, item) => {
      return item.tipo === 'Receita' ? total + item.valor : total - item.valor
    }, 0)
  }

  const handelEdit = (item: Financa) => {
    setFinances(item)
    setEdit(true)
  }
  const handelDelete = (item: number) => {
    setFinanceDelete(true)
    console.log(item)
  }

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage)
  }

  const hendleSalveEdit = () => {
    console.log(myFinances)
    setEdit(false)
  }

  const handleSaveAdd = () => {
    if (isFormValid()) {
      const { ...otherValues } = formValuesAdd
      const financeToSave =
        formValuesAdd.fixoVariavel === 'Parcela'
          ? { ...formValuesAdd }
          : otherValues

      console.log('financeToSave', financeToSave)
      setFinanceAdd(false)
    } else {
      toast.warning('Por favor, preencha todos os campos obrigatórios.')
    }
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPageSize(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFinances((prev) => (prev ? { ...prev, [name!]: value as string } : null))
  }

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target
    setFinances((prev) => (prev ? { ...prev, [name!]: value } : null))
  }

  // useEffect(() => {
  //   dadosCTE()
  // }, [page, pageSize])

  useEffect(() => {
    const total = calculateTotal()
    onTotalChange(total)
  }, [onTotalChange])

  return (
    <Box sx={{ margin: '1rem 0 1rem 0' }}>
      {finance && (
        <Box>
          <Grid container justifyContent="end" spacing={1}>
            <Grid item xs={8} sm={4} md={4} lg={3}>
              <Button
                fullWidth
                variant="contained"
                onClick={newFinanceAdd}
                sx={{
                  background: '#131921',
                  '&:hover': { background: '#232f3e' },
                }}
              >
                Nova Finança
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Card elevation={6} sx={{ borderRadius: '8px' }}>
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
                          <td>{formatDate(item.data)}</td>
                          <td>{item.categoria}</td>
                          <td>{item.descricao}</td>
                          <td>{item.tipo}</td>
                          <td>{formatCurrency(item.valor)}</td>
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
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}
      <Box>
        <Dialog open={edit}>
          <DialogTitle
            sx={{ background: '#232f3e', color: '#f7f7f7' }}
            textAlign="center"
          >
            Editar Financa
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={1} mt={3}>
              <Grid item xs={12}>
                <TextField
                  name="data"
                  label="Data"
                  type="date"
                  value={myFinances?.data || ''}
                  fullWidth
                  onChange={handleInputChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="categoria"
                  label="Categoria"
                  fullWidth
                  onChange={handleInputChange}
                  value={myFinances?.categoria || ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="descricao"
                  label="Descrição"
                  fullWidth
                  onChange={handleInputChange}
                  value={myFinances?.descricao || ''}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="select-label">Tipo</InputLabel>
                  <Select
                    name="tipo"
                    labelId="select-label"
                    value={myFinances?.tipo}
                    onChange={handleSelectChange}
                    label="Tipo"
                  >
                    <MenuItem value="Despesa">Despesa</MenuItem>
                    <MenuItem value="Receita">Receita</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="valor"
                  label="Valor (R$)"
                  fullWidth
                  onChange={handleInputChange}
                  value={myFinances?.valor || ''}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Categoria Despesa</InputLabel>
                  <Select
                    name="fixoVariavel"
                    value={myFinances?.fixoVariavel}
                    label="Categoria Despesa"
                    onChange={handleSelectChange}
                  >
                    <MenuItem value="Fixo">Fixo</MenuItem>
                    <MenuItem value="Variável">Variável</MenuItem>
                    <MenuItem value="Parcela">Parcela</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {myFinances?.fixoVariavel === 'Parcela' && (
                <Grid item xs={12}>
                  <TextField
                    name="parcelas"
                    label="Parcelas"
                    fullWidth
                    onChange={handleInputChange}
                    value={myFinances?.parcelas || ''}
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <TextField
                  name="observacoes"
                  label="Observações"
                  fullWidth
                  onChange={handleInputChange}
                  value={myFinances?.observacoes || ''}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Grid container justifyContent="end" spacing={1} mr={2}>
              <Grid item xs={3}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => hendleSalveEdit()}
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
        <Dialog open={financeDelete} onClose={() => setFinanceDelete(false)}>
          <DialogTitle
            sx={{ background: '#232f3e', color: '#f7f7f7' }}
            textAlign="center"
          >
            Excluir Finança
          </DialogTitle>
          <DialogContent>
            <DialogContentText mt={2}>
              Tem certeza que deseja excluir este registro?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Grid container spacing={1} justifyContent="space-evenly">
              <Grid item xs={3}>
                <Button
                  variant="contained"
                  onClick={() => setFinanceDelete(false)}
                  color="warning"
                >
                  Cancelar
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  variant="contained"
                  onClick={() => setFinanceDelete(false)}
                  color="primary"
                >
                  Confirmar
                </Button>
              </Grid>
            </Grid>
          </DialogActions>
        </Dialog>
        <Dialog open={financeAdd}>
          <DialogTitle
            sx={{ background: '#232f3e', color: '#f7f7f7' }}
            textAlign="center"
          >
            Adicionar Financa
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={1} mt={3}>
              <Grid item xs={12}>
                <TextField
                  name="data"
                  label="Data"
                  type="date"
                  fullWidth
                  value={formValuesAdd.data}
                  onChange={handleInputChangeAdd}
                  InputLabelProps={{ shrink: true }}
                  error={errors.data}
                  helperText={errors.data ? 'Campo obrigatório' : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="categoria"
                  label="Categoria"
                  fullWidth
                  value={formValuesAdd.categoria}
                  onChange={handleInputChangeAdd}
                  error={errors.categoria}
                  helperText={errors.categoria ? 'Campo obrigatório' : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="descricao"
                  label="Descrição"
                  fullWidth
                  value={formValuesAdd.descricao}
                  onChange={handleInputChangeAdd}
                  error={errors.descricao}
                  helperText={errors.descricao ? 'Campo obrigatório' : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="select-label">Tipo</InputLabel>
                  <Select
                    name="tipo"
                    labelId="select-label"
                    value={formValuesAdd.tipo}
                    onChange={handleSelectChangeAdd}
                    label="Tipo"
                  >
                    <MenuItem value="Despesa">Despesa</MenuItem>
                    <MenuItem value="Receita">Receita</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="valor"
                  label="Valor (R$)"
                  fullWidth
                  type="number"
                  value={formValuesAdd.valor}
                  onChange={handleInputChangeAdd}
                  error={errors.valor}
                  helperText={errors.valor ? 'Campo obrigatório' : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Categoria Despesa</InputLabel>
                  <Select
                    name="fixoVariavel"
                    label="Categoria Despesa"
                    value={formValuesAdd.fixoVariavel}
                    onChange={handleSelectChangeAdd}
                  >
                    <MenuItem value="Fixo">Fixo</MenuItem>
                    <MenuItem value="Variável">Variável</MenuItem>
                    <MenuItem value="Parcela">Parcela</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {formValuesAdd.fixoVariavel === 'Parcela' && (
                <Grid item xs={12}>
                  <TextField
                    name="parcelas"
                    label="Parcelas"
                    fullWidth
                    type="number"
                    value={formValuesAdd.parcelas ?? ''}
                    onChange={handleInputChangeAdd}
                    error={errors.parcelas}
                    helperText={errors.parcelas ? 'Campo obrigatório' : ''}
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <TextField
                  name="observacoes"
                  label="Observações"
                  fullWidth
                  value={formValuesAdd.observacoes ?? ''}
                  onChange={handleInputChangeAdd}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Grid container justifyContent="end" spacing={1} mr={2}>
              <Grid item xs={3}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleSaveAdd}
                  color="primary"
                >
                  Salvar
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => setFinanceAdd(false)}
                  color="warning"
                >
                  Cancelar
                </Button>
              </Grid>
            </Grid>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  )
}
