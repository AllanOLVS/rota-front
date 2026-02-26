// --- DADOS MOCKADOS (Simulando o Banco de Dados) ---

export interface Viagem {
  id: number;
  data: string;
  destino: string;
  motorista: string;
  veiculo: string;
  lotacao: number;
  capacidade: number;
  status: 'confirmada' | 'pendente';
  saida: string;
}

export interface Passageiro {
  id: number;
  nome: string;
  rg: string;
  local: string;
  retorno: string;
  telefone: string;
  tipo: 'paciente' | 'acompanhante';
  statusConfirmacao?: boolean;
  confirmadoEm?: string;
}

export const MOCK_VIAGENS: Viagem[] = [
  { 
    id: 1, 
    data: '2026-01-28', 
    destino: 'Salvador (Hosp. Geral)', 
    motorista: 'Carlos Silva', 
    veiculo: 'Van Sprinter (Doad 02)', 
    lotacao: 12, 
    capacidade: 15, 
    status: 'confirmada',
    saida: '04:00'
  },
  { 
    id: 2, 
    data: '2026-01-29', 
    destino: 'Feira de Santana', 
    motorista: 'Pendente', 
    veiculo: 'Spin (Saúde 01)', 
    lotacao: 4, 
    capacidade: 7, 
    status: 'pendente',
    saida: '05:30'
  },
  { 
    id: 3, 
    data: '2026-01-30', 
    destino: 'Sto. Antônio de Jesus', 
    motorista: 'Roberto Souza', 
    veiculo: 'Microônibus', 
    lotacao: 18, 
    capacidade: 22, 
    status: 'confirmada',
    saida: '06:00'
  },
];

export const MOCK_PASSAGEIROS: Passageiro[] = [
  { id: 1, nome: 'Maria de Lourdes Santos', rg: '12.345.678-9', local: 'Hosp. Português', retorno: 'Fojo (Ponto de ônibus)', telefone: '(75) 99999-1111', tipo: 'paciente', statusConfirmacao: true, confirmadoEm: '14:30' },
  { id: 2, nome: 'João Pedro Santos', rg: '55.444.333-2', local: 'Acompanhante', retorno: 'Fojo (Ponto de ônibus)', telefone: '-', tipo: 'acompanhante', statusConfirmacao: true, confirmadoEm: '14:32' },
  { id: 3, nome: 'Antônio Ferreira', rg: '22.111.000-5', local: 'Clínica de Olhos', retorno: 'Praça Principal', telefone: '(75) 98888-2222', tipo: 'paciente', statusConfirmacao: false },
  { id: 4, nome: 'Josefa Almeida', rg: '33.222.111-0', local: 'Hosp. Santa Izabel', retorno: 'Rua da Linha', telefone: '(75) 97777-3333', tipo: 'paciente', statusConfirmacao: false },
  { id: 5, nome: 'Lucas Almeida (Neto)', rg: 'Cert. Nasc.', local: 'Acompanhante', retorno: 'Rua da Linha', telefone: '-', tipo: 'acompanhante', statusConfirmacao: false },
];
