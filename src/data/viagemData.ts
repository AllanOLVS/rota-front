// Dados mockados para cadastro de viagem

export const MOCK_DESTINOS = [
  "Salvador (Capital)",
  "Feira de Santana",
  "Santo Antônio de Jesus",
  "Itabuna",
  "Jequié",
  "Vitória da Conquista"
];

export interface Motorista {
  id: number;
  nome: string;
  status: 'disponivel' | 'ferias' | 'em_viagem';
}

export interface Veiculo {
  id: number;
  modelo: string;
  placa: string;
  capacidade: number;
  tipo: string;
}

export const MOCK_MOTORISTAS: Motorista[] = [
  { id: 1, nome: "Carlos Silva", status: "disponivel" },
  { id: 2, nome: "Roberto Souza", status: "disponivel" },
  { id: 3, nome: "Paulo Oliveira", status: "ferias" },
  { id: 4, nome: "Antônio Marcos", status: "em_viagem" }
];

export const MOCK_VEICULOS: Veiculo[] = [
  { id: 1, modelo: "Van Sprinter (Doad 02)", placa: "ABC-1234", capacidade: 15, tipo: "Van" },
  { id: 2, modelo: "Fiat Spin (Saúde 01)", placa: "XYZ-9876", capacidade: 7, tipo: "Carro" },
  { id: 3, modelo: "Microônibus Volare", placa: "DEF-5678", capacidade: 26, tipo: "Ônibus" },
  { id: 4, modelo: "Ambulância UTI", placa: "SAM-1920", capacidade: 1, tipo: "Ambulância" }
];
