import React from 'react';
import { User, Search, Plus, Edit3, Trash2, Phone, CreditCard, Award } from 'lucide-react';

export interface Motorista {
    id: number;
    nome: string;
    cnh: string;
    categoria: string;
    telefone: string;
    status: 'ativo' | 'ferias' | 'inativo';
}

interface MotoristasTableProps {
    motoristas: Motorista[];
    onCadastrar: () => void;
    onEditar?: (motorista: Motorista) => void;
    onExcluir?: (motorista: Motorista) => void;
}

export const MotoristasTable: React.FC<MotoristasTableProps> = ({
    motoristas,
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
                        <User className="mr-2 text-gray-700" /> Motoristas Cadastrados
                    </h2>
                    <p className="text-sm text-gray-500">Visualizando equipe de condutores</p>
                </div>
                <button
                    onClick={onCadastrar}
                    className="bg-gray-800 hover:bg-gray-900 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg flex items-center transition-all transform hover:-translate-y-0.5"
                >
                    <Plus size={20} className="mr-2" />
                    Cadastrar Motorista
                </button>
            </div>

            {/* Barra de Pesquisa - Separada */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Buscar por nome ou CNH..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                    />
                </div>
            </div>

            {/* Listagem de Motoristas */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">

                {/* Versão Mobile - Cards */}
                <div className="sm:hidden divide-y divide-gray-200">
                    {motoristas.map((m) => (
                        <div key={m.id} className="p-4 hover:bg-gray-50">
                            <div className="flex items-start justify-between mb-3">
                                <span className={`px-2 py-1 rounded-full text-xs font-bold ${m.status === 'ativo'
                                    ? 'bg-green-100 text-green-700'
                                    : m.status === 'ferias'
                                        ? 'bg-yellow-100 text-yellow-700'
                                        : 'bg-gray-100 text-gray-700'
                                    }`}>
                                    {m.status.toUpperCase()}
                                </span>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => onEditar?.(m)}
                                        className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                    >
                                        <Edit3 size={16} />
                                    </button>
                                    <button
                                        onClick={() => onExcluir?.(m)}
                                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center mb-3">
                                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mr-3">
                                    <User size={20} />
                                </div>
                                <p className="font-bold text-gray-900">{m.nome}</p>
                            </div>

                            <div className="space-y-1.5 text-xs text-gray-500">
                                <div className="flex items-center">
                                    <Phone size={12} className="mr-2 text-gray-400" />
                                    {m.telefone}
                                </div>
                                <div className="flex items-center">
                                    <CreditCard size={12} className="mr-2 text-gray-400" />
                                    <span className="font-mono">{m.cnh}</span>
                                </div>
                                <div className="flex items-center">
                                    <Award size={12} className="mr-2 text-gray-400" />
                                    Categoria <span className="ml-1 bg-red-50 text-red-700 px-1.5 py-0.5 rounded text-xs font-bold border border-red-100">{m.categoria}</span>
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
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Nome / Telefone</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">CNH</th>
                                <th className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase">Categoria</th>
                                <th className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {motoristas.map((m) => (
                                <tr key={m.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mr-3">
                                                <User size={16} />
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-gray-900">{m.nome}</div>
                                                <div className="text-xs text-gray-500">{m.telefone}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-mono text-gray-600">{m.cnh}</div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="bg-red-50 text-red-700 px-2 py-1 rounded text-xs font-bold border border-red-100">
                                            {m.categoria}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${m.status === 'ativo' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {m.status.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => onEditar?.(m)}
                                            className="text-gray-400 hover:text-blue-600 mx-2"
                                        >
                                            <Edit3 size={18} />
                                        </button>
                                        <button
                                            onClick={() => onExcluir?.(m)}
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
