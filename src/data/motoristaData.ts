// Dados mockados para motoristas

export interface VeiculoFrota {
  id: number;
  modelo: string;
  placa: string;
  tipo: string;
  capacidade: number;
}

export const AVAILABLE_VEHICLES: VeiculoFrota[] = [
  { id: 1, modelo: 'Van Sprinter', placa: 'ABC-1234', tipo: 'Van', capacidade: 15 },
  { id: 2, modelo: 'Fiat Spin', placa: 'XYZ-9876', tipo: 'Carro', capacidade: 7 },
  { id: 3, modelo: 'Microônibus Volare', placa: 'DEF-5678', tipo: 'Ônibus', capacidade: 26 },
  { id: 4, modelo: 'Ambulância UTI', placa: 'SAM-1920', tipo: 'Ambulância', capacidade: 1 },
  { id: 5, modelo: 'Gol G5', placa: 'GOL-2022', tipo: 'Carro', capacidade: 5 },
];
