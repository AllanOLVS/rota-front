import React from 'react';
import { MapPin, Eye, Printer, Search, Calendar, User, Bus, Users } from 'lucide-react';
import type { HistoricoViagem } from '../../data/historyData';

interface HistoryTableProps {
    data: HistoricoViagem[];
    onView?: (id: number) => void;
    onPrint?: (id: number) => void;
}

export const HistoryTable: React.FC<HistoryTableProps> = ({
    data,
    onView,
    onPrint,
}) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

            {/* Versão Mobile - Cards */}
            <div className="sm:hidden">
                {data.length > 0 ? (
                    <div className="divide-y divide-gray-200">
                        {data.map((viagem) => (
                            <div key={viagem.id} className="p-4 hover:bg-gray-50">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-gray-400 font-mono">#{viagem.id}</span>
                                        <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${viagem.status === 'realizada'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                            }`}>
                                            {viagem.status.toUpperCase()}
                                        </span>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => onView?.(viagem.id)}
                                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                        >
                                            <Eye size={16} />
                                        </button>
                                        <button
                                            onClick={() => onPrint?.(viagem.id)}
                                            className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                        >
                                            <Printer size={16} />
                                        </button>
                                    </div>
                                </div>

                                <p className="font-bold text-gray-900 mb-2">{viagem.destino}</p>

                                <div className="space-y-1.5 text-xs text-gray-500">
                                    <div className="flex items-center">
                                        <Calendar size={12} className="mr-2 text-gray-400" />
                                        {new Date(viagem.data).toLocaleDateString('pt-BR')}
                                    </div>
                                    <div className="flex items-center">
                                        <MapPin size={12} className="mr-2 text-gray-400" />
                                        {viagem.hospital}
                                    </div>
                                    <div className="flex items-center">
                                        <User size={12} className="mr-2 text-gray-400" />
                                        {viagem.motorista}
                                    </div>
                                    <div className="flex items-center">
                                        <Bus size={12} className="mr-2 text-gray-400" />
                                        {viagem.veiculo}
                                    </div>
                                    <div className="flex items-center">
                                        <Users size={12} className="mr-2 text-gray-400" />
                                        {viagem.passageiros} passageiro(s)
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-8 text-center text-gray-500">
                        <Search size={32} className="text-gray-300 mx-auto mb-2" />
                        <p>Nenhuma viagem encontrada com esses filtros.</p>
                    </div>
                )}
            </div>

            {/* Versão Desktop - Tabela */}
            <div className="hidden sm:block overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Data / ID</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Destino & Locais</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Motorista / Veículo</th>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Passageiros</th>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data.length > 0 ? data.map((viagem) => (
                            <tr key={viagem.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-bold text-gray-900">
                                        {new Date(viagem.data).toLocaleDateString('pt-BR')}
                                    </div>
                                    <div className="text-xs text-gray-400">#{viagem.id}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm font-medium text-gray-900">{viagem.destino}</div>
                                    <div className="text-xs text-gray-500 mt-1 flex items-center">
                                        <MapPin size={10} className="mr-1" />
                                        {viagem.hospital}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-gray-900">{viagem.motorista}</div>
                                    <div className="text-xs text-gray-500 bg-gray-100 inline-block px-1.5 py-0.5 rounded mt-1">
                                        {viagem.veiculo}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                        {viagem.passageiros}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${viagem.status === 'realizada' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {viagem.status.toUpperCase()}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        onClick={() => onView?.(viagem.id)}
                                        className="text-gray-400 hover:text-red-600 mx-2 transition-colors"
                                        title="Visualizar Manifesto"
                                    >
                                        <Eye size={18} />
                                    </button>
                                    <button
                                        onClick={() => onPrint?.(viagem.id)}
                                        className="text-gray-400 hover:text-blue-600 mx-2 transition-colors"
                                        title="Reimprimir"
                                    >
                                        <Printer size={18} />
                                    </button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                                    <div className="flex flex-col items-center justify-center">
                                        <Search size={32} className="text-gray-300 mb-2" />
                                        <p>Nenhuma viagem encontrada com esses filtros.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* PAGINAÇÃO */}
            <div className="bg-white px-4 py-3 border-t border-gray-200 flex items-center justify-between sm:px-6">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 w-full items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-700">
                            Mostrando <span className="font-medium">1</span> até <span className="font-medium">{data.length}</span> de <span className="font-medium">{data.length}</span> resultados
                        </p>
                    </div>
                    <div>
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                            <button className="relative inline-flex items-center px-3 sm:px-4 py-2 rounded-l-md border border-gray-300 bg-white text-xs sm:text-sm font-medium text-gray-500 hover:bg-gray-50">
                                Anterior
                            </button>
                            <button className="relative inline-flex items-center px-3 sm:px-4 py-2 border border-gray-300 bg-red-50 text-xs sm:text-sm font-medium text-red-600 hover:bg-red-100 z-10 border-red-500">
                                1
                            </button>
                            <button className="relative inline-flex items-center px-3 sm:px-4 py-2 rounded-r-md border border-gray-300 bg-white text-xs sm:text-sm font-medium text-gray-500 hover:bg-gray-50">
                                Próximo
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
};
