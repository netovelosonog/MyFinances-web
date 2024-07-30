import { Box, TablePagination } from '@mui/material'
import { ProductsList } from './style'
import { useState } from 'react'
import { Cte } from '../../models/cte'

export function TabelaDeValores() {
  const listCte = [
    {
      idCte: 1,
      chaveCte: 'CTE1234567890',
      dataProc: '2024-07-01',
      emissao: '2024-06-30',
    },
    {
      idCte: 2,
      chaveCte: 'CTE0987654321',
      dataProc: '2024-07-02',
      emissao: '2024-06-29',
    },
    {
      idCte: 3,
      chaveCte: 'CTE1122334455',
      dataProc: '2024-07-03',
      emissao: '2024-06-28',
    },
    {
      idCte: 4,
      chaveCte: 'CTE5566778899',
      dataProc: '2024-07-04',
      emissao: '2024-06-27',
    },
    {
      idCte: 5,
      chaveCte: 'CTE6677889900',
      dataProc: '2024-07-05',
      emissao: '2024-06-26',
    },
  ]
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  // const [totalElements, setTotalElements] = useState(5)
  // const [isLoading, setIsLoading] = useState(false)

  // async function dadosCTE() {
  //   setIsLoading(true)
  //   try {
  //     const response = await axios.get(
  //       `/consulta-cte-geral/?page=${page}&size=${pageSize}`,
  //     )
  //     setTotalElements(response.data.totalElements)
  //     setListCte(response.data.list)
  //   } catch (error) {
  //     console.error('Erro na requisição GET:', error)
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

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
      {listCte && (
        <Box>
          <ProductsList>
            <table>
              <thead>
                <tr>
                  <th>ID CTE</th>
                  <th>CHAVE CTE</th>
                  <th>DATA DE EMISSÃO</th>
                  <th>DATA DE PROCESSAMENTO</th>
                </tr>
              </thead>
              <tbody>
                {listCte.map((produto: Cte) => (
                  <tr key={produto.idCte}>
                    <td>{produto.idCte}</td>
                    <td>{produto.chaveCte}</td>
                    <td>{produto.emissao}</td>
                    <td>{produto.dataProc}</td>
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
            count={listCte.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={pageSize}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      )}
    </Box>
  )
}
