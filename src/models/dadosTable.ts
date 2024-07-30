export interface Endereco {
  id: number
  rua: string
  numero: number
  bairro: string
  cep: string
}

export interface Pessoa {
  id: number
  nome: string
  cpf: string
  dataNascimento: string // ou 'Date' se você estiver trabalhando com objetos de data
  genero: string // Enumeração para os valores de gênero
  numeroTelefone: string
  email: string
  rg: string
  endereco: Endereco
}
