export interface Psychologist {
  id?: number,
  nome: string,
  email: string,
  publico: string,
  descricao: string,
  crp: string,
  cpf: string,
  abordagens: string[],
  dataNascimento: Date,
  preco: number,
  especialidades: string[],
  senha: string,
  telefone: string,
  role: string
}
