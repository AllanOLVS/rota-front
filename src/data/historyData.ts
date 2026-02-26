// Dados mockados para histórico de viagens

export interface HistoricoViagem {
  id: number;
  data: string;
  destino: string;
  hospital: string;
  motorista: string;
  veiculo: string;
  passageiros: number;
  status: 'realizada' | 'cancelada';
  pacientes: string[];
}

export const MOCK_HISTORY: HistoricoViagem[] = [
  { 
    id: 101, 
    data: '2025-12-15', 
    destino: 'Salvador', 
    hospital: 'Hosp. Geral / Sta. Izabel', 
    motorista: 'Carlos Silva', 
    veiculo: 'Van Sprinter (Doad 02)', 
    passageiros: 15, 
    status: 'realizada',
    pacientes: ['Maria Silva', 'João Souza', 'Ana Clara']
  },
  { 
    id: 102, 
    data: '2025-12-18', 
    destino: 'Feira de Santana', 
    hospital: 'Clínica de Olhos', 
    motorista: 'Roberto Souza', 
    veiculo: 'Spin (Saúde 01)', 
    passageiros: 4, 
    status: 'realizada',
    pacientes: ['Josefa Lima']
  },
  { 
    id: 103, 
    data: '2025-12-20', 
    destino: 'Sto. Antônio de Jesus', 
    hospital: 'Regional', 
    motorista: 'Carlos Silva', 
    veiculo: 'Microônibus', 
    passageiros: 18, 
    status: 'realizada',
    pacientes: ['Mario Andrade', 'Lucas Neto']
  },
  { 
    id: 104, 
    data: '2025-12-22', 
    destino: 'Salvador', 
    hospital: 'Aristides Maltez', 
    motorista: 'Paulo Oliveira', 
    veiculo: 'Van Sprinter (Doad 01)', 
    passageiros: 12, 
    status: 'cancelada',
    pacientes: ['Maria Silva']
  },
  { 
    id: 105, 
    data: '2025-12-23', 
    destino: 'Amargosa (Interno)', 
    hospital: 'Hospital Municipal', 
    motorista: 'Roberto Souza', 
    veiculo: 'Ambulância A03', 
    passageiros: 1, 
    status: 'realizada',
    pacientes: ['Emergência']
  },
];
