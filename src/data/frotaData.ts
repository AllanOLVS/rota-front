import type { Veiculo } from '../components/VeiculosTable';
import type { Motorista } from '../components/MotoristasTable';

export const MOCK_VEICULOS: Veiculo[] = [
    { id: 1, modelo: "Van Sprinter", placa: "ABC-1234", tipo: "Van", capacidade: 15, status: "disponivel" },
    { id: 2, modelo: "Fiat Spin", placa: "XYZ-9876", tipo: "Carro", capacidade: 7, status: "em_uso" },
    { id: 3, modelo: "Microônibus Volare", placa: "DEF-5678", tipo: "Ônibus", capacidade: 26, status: "manutencao" },
    { id: 4, modelo: "Ambulância UTI", placa: "SAM-1920", tipo: "Ambulância", capacidade: 1, status: "disponivel" },
];

export const MOCK_MOTORISTAS: Motorista[] = [
    { id: 1, nome: "Carlos Silva", cnh: "1234567890", categoria: "AD", telefone: "(75) 99999-1111", status: "ativo" },
    { id: 2, nome: "Roberto Souza", cnh: "0987654321", categoria: "AE", telefone: "(75) 98888-2222", status: "ativo" },
    { id: 3, nome: "Paulo Oliveira", cnh: "1122334455", categoria: "B", telefone: "(75) 97777-3333", status: "ferias" },
];
