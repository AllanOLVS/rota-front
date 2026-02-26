import React from 'react';
import { Car, Search, Plus, Filter, Edit3, Trash2, Users, Hash } from 'lucide-react';
import { VeiculoStatusBadge } from '../VeiculoStatusBadge';

export interface Veiculo {
    id: number;
    modelo: string;
    placa: string;
    tipo: string;
    capacidade: number;
    status: 'disponivel' | 'em_uso' | 'manutencao';
}

interface VeiculosTableProps {
    veiculos: Veiculo[];
    onCadastrar: () => void;
    onEditar?: (veiculo: Veiculo) => void;
    onExcluir?: (veiculo: Veiculo) => void;
}

export const VeiculosTable: React.FC<VeiculosTableProps> = ({
    veiculos,
    onCadastrar,
    onEditar,
    onExcluir
}) => {
    return (
        <div className="fade-in space-y-6">
            {/* Barra de Topo da Lista */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                        <Car className="mr-2 text-red-600" /> Veículos Cadastrados
                    </h2>
                    <p className="text-sm text-gray-500">Visualizando toda a frota ativa</p>
                </div>
                <button
                    onClick={onCadastrar}
                    className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg flex items-center transition-all transform hover:-translate-y-0.5"
                >
                    <Plus size={20} className="mr-2" />
                    Cadastrar Veículo
                </button>
            </div>

            {/* Barra de Pesquisa - Separada */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Buscar por placa ou modelo..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                    />
                </div>
                <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 flex items-center justify-center">
                    <Filter size={18} className="mr-2" /> Filtros
                </button>
            </div>

            {/* Listagem de Veículos */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">

                {/* Versão Mobile - Cards */}
                <div className="sm:hidden divide-y divide-gray-200">
                    {veiculos.map((v) => (
                        <div key={v.id} className="p-4 hover:bg-gray-50">
                            <div className="flex items-start justify-between mb-3">
                                <VeiculoStatusBadge status={v.status} />
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => onEditar?.(v)}
                                        className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                    >
                                        <Edit3 size={16} />
                                    </button>
                                    <button
                                        onClick={() => onExcluir?.(v)}
                                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>

                            <p className="font-bold text-gray-900 mb-1">{v.modelo}</p>
                            <p className="text-xs text-gray-500 mb-3">{v.tipo}</p>

                            <div className="space-y-1.5 text-xs text-gray-500">
                                <div className="flex items-center">
                                    <Hash size={12} className="mr-2 text-gray-400" />
                                    <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded border border-gray-300">{v.placa}</span>
                                </div>
                                <div className="flex items-center">
                                    <Users size={12} className="mr-2 text-gray-400" />
                                    {v.capacidade} lugares
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Versão Desktop - Tabela */}
                <div className="hidden sm:block overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Modelo / Tipo</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Placa</th>
                                <th className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase">Capacidade</th>
                                <th className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {veiculos.map((v) => (
                                <tr key={v.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-bold text-gray-900">{v.modelo}</div>
                                        <div className="text-xs text-gray-500">{v.tipo}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-mono bg-gray-100 px-2 py-1 rounded inline-block text-gray-700 border border-gray-300">
                                            {v.placa}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="text-sm font-medium text-gray-600">{v.capacidade} Lug.</span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <VeiculoStatusBadge status={v.status} />
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => onEditar?.(v)}
                                            className="text-gray-400 hover:text-blue-600 mx-2"
                                        >
                                            <Edit3 size={18} />
                                        </button>
                                        <button
                                            onClick={() => onExcluir?.(v)}
                                            className="text-gray-400 hover:text-red-600 mx-2"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
