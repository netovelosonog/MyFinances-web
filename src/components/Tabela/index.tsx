import { useEffect, useRef, useState } from 'react'
import {
  DataGrid,
  GridColDef,
  GridRowClassNameParams,
  GridValueGetterParams,
} from '@mui/x-data-grid'
import { Button, Grid } from '@mui/material'
import { apiService } from '../../api/Requests'
import { Pessoa } from '../../models/dadosTable'

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 50,
    align: 'left',
    headerAlign: 'left',
  },
  {
    field: 'nome',
    headerName: 'Nome',
    width: 250,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'cpf',
    headerName: 'CPF',
    width: 200,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'rg',
    headerName: 'RG',
    width: 200,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'numeroTelefone',
    headerName: 'Telefone',
    width: 150,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 250,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'endereco.rua',
    headerName: 'Rua',
    width: 150,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (params: GridValueGetterParams) => params.row.endereco?.rua,
  },
  {
    field: 'endereco.numero',
    headerName: 'Número da Casa',
    width: 150,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (params: GridValueGetterParams) => params.row.endereco?.numero,
  },
  {
    field: 'endereco.bairro',
    headerName: 'Bairro',
    width: 150,
    align: 'right',
    headerAlign: 'right',
    valueGetter: (params: GridValueGetterParams) => params.row.endereco?.bairro,
  },
]

export function TabelaPaginada() {
  const [dadosTable, setDadosTable] = useState<Pessoa[]>([])
  const getRowClassName = (params: GridRowClassNameParams) =>
    `data-grid-row-${params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'}`
  const carregadoRef = useRef(false)
  // const [currentPage, setCurrentPage] = useState(1);
  // const [rowsPerPage, setRowsPerPage] = useState(10);

  // useEffect(() => {
  //   fetchData(currentPage, rowsPerPage);
  // }, [currentPage, rowsPerPage]);

  // const fetchData = async (page: number, rows: number) => {
  //   // Implemente a lógica de chamada da API aqui
  // };

  // Exemplo de uso do método GET
  const carregaPessoas = () => {
    apiService
      .get({ url: '/pessoas' })
      .then((response) => {
        setDadosTable(response.data)
      })
      .catch((error) => {
        console.error('Erro na requisição GET:', error)
      })
  }

  useEffect(() => {
    if (!carregadoRef.current) {
      carregaPessoas()
      carregadoRef.current = true
    }
  }, [])

  // Exemplo de uso do método POST
  // apiService.post({
  //   url: 'https://exemplo.com/api/recurso',
  //   body: { chave: 'valor' }
  // })
  //   .then(response => {
  //     console.log(response.data);
  //   })
  //   .catch(error => {
  //     console.error('Erro na requisição POST:', error);
  //   });

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <DataGrid
          rows={dadosTable}
          density="standard"
          columns={columns}
          getRowClassName={getRowClassName}
          sx={{
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: 'blue',
              width: '100%',

              color: '#ffffff',
              '& .MuiCheckbox-root': {
                borderRadius: '4px',
                padding: '0',
                margin: '0',
                backgroundColor: 'white',
              },
            },
            '& .data-grid-row-even': {
              backgroundColor: '#f7f7f7', // Linhas pares
            },
            '& .data-grid-row-odd': {
              backgroundColor: '#e0e0e0', // Linhas ímpares (escala de cinza)
            },
            // Outros estilos personalizados aqui, se necessário
          }}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 20, 50, 100]}
          checkboxSelection
        />
      </Grid>
      <Grid item>
        <Button variant="contained">Consultar</Button>
      </Grid>
    </Grid>
  )
}
