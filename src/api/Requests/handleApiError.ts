// src/utils/handleApiError.ts
import axios, { AxiosError } from 'axios'
import { toast } from 'react-toastify'

export const handleApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError // Use AxiosError sem genéricos se você não tem certeza sobre a estrutura dos dados
    if (
      axiosError.response &&
      axiosError.response.data &&
      typeof axiosError.response.data === 'object' &&
      'detail' in axiosError.response.data
    ) {
      const message = axiosError.response.data.detail
      if (typeof message === 'string') {
        toast.warning(message)
      } else {
        toast.warning('Ocorreu um erro na resposta da API')
      }
    } else {
      // Trate outros tipos de erro do Axios aqui
      toast.error('Nenhuma resposta recebida do servidor')
    }
  } else {
    // Trate erros não-Axios aqui
    toast.error('Ocorreu um erro desconhecido')
  }
}
