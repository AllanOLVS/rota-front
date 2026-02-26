import React from 'react';
import { MapPin, Phone, FileText, RotateCcw, CheckCircle, Clock } from 'lucide-react';
import type { Passageiro } from '../../data/mockData';

interface PassageiroTableProps {
    passageiros: Passageiro[];
    capacidade: number;
}

export const PassageiroTable: React.FC<PassageiroTableProps> = ({
    passageiros,
    capacidade,
}) => {
    return (
        <div className="mt-2 space-y-4">
            {/* Header - Separado */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 print:bg-transparent print:border-none print:shadow-none print:p-0">
                <h3 className="text-sm font-bold text-gray-600 uppercase print:text-black">
                    Lista de Passageiros ({passageiros.length} / {capacidade})
                </h3>
            </div>

            {/* Versão Mobile - Cards (até 768px) */}
            <div className="md:hidden bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden divide-y divide-gray-200">
                {passageiros.map((p, index) => (
                    <div
                        key={p.id}
                        className={`p-4 ${p.tipo === 'acompanhante' ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-400 font-mono">#{index + 1}</span>
                                {p.tipo === 'acompanhante' && (
                                    <span className="text-xs font-bold bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded border border-blue-200">
                                        ACOMP
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center">
                                {p.retorno && (
                                    <span className="text-xs font-medium text-red-700 flex items-center bg-red-50 px-2 py-0.5 rounded mr-2">
                                        <RotateCcw size={12} className="mr-1" />
                                        {p.retorno}
                                    </span>
                                )}
                                {p.statusConfirmacao ? (
                                    <span className="text-xs font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded flex items-center border border-green-200">
                                        <CheckCircle size={10} className="mr-1" />
                                        {p.confirmadoEm}
                                    </span>
                                ) : (
                                    <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded flex items-center border border-gray-200">
                                        <Clock size={10} className="mr-1" />
                                        Pendente
                                    </span>
                                )}
                            </div>
                        </div>
                        <p className={`font-bold mb-3 ${p.tipo === 'paciente' ? 'text-gray-900' : 'text-gray-700'}`}>
                            {p.nome}
                        </p>
                        <div className="space-y-1.5 text-xs text-gray-500">
                            <div className="flex items-center">
                                <MapPin size={12} className="mr-2 text-gray-400" />
                                <span className="truncate">{p.local}</span>
                            </div>
                            <div className="flex items-center">
                                <FileText size={12} className="mr-2 text-gray-400" />
                                <span className="font-mono">{p.rg}</span>
                            </div>
                            <div className="flex items-center">
                                <Phone size={12} className="mr-2 text-gray-400" />
                                {p.telefone}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Versão Desktop - Tabela (a partir de 768px) */}
            <div className="hidden md:block overflow-x-auto border border-gray-300 rounded-lg print:border-2 print:border-black print:block">
                <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-100 print:bg-gray-200">
                        <tr>
                            <th
                                scope="col"
                                className="px-3 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider w-12 border-r border-gray-300"
                            >
                                Nº
                            </th>
                            <th
                                scope="col"
                                className="px-3 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-r border-gray-300"
                            >
                                Paciente / Acompanhante
                            </th>
                            <th
                                scope="col"
                                className="px-3 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-r border-gray-300"
                            >
                                Destino (Hospital)
                            </th>
                            <th
                                scope="col"
                                className="px-3 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-r border-gray-300"
                            >
                                RG / Documento
                            </th>
                            <th
                                scope="col"
                                className="px-3 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-r border-gray-300"
                            >
                                Telefone
                            </th>
                            <th
                                scope="col"
                                className="px-3 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                            >
                                Retorno (Obs)
                            </th>
                            <th
                                scope="col"
                                className="px-3 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                            >
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 print:divide-gray-400">
                        {passageiros.map((p, index) => (
                            <tr
                                key={p.id}
                                className={`${p.tipo === 'acompanhante'
                                    ? 'bg-gray-50 print:bg-gray-50'
                                    : 'bg-white'
                                    }`}
                            >
                                <td className="px-3 py-3 text-sm text-gray-500 text-center font-mono border-r border-gray-200 print:border-gray-400">
                                    {index + 1}
                                </td>
                                <td className="px-3 py-3 whitespace-nowrap border-r border-gray-200 print:border-gray-400">
                                    <div className="flex items-center">
                                        {p.tipo === 'acompanhante' && (
                                            <div className="mr-2 text-xs font-bold bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded border border-blue-200 print:border-black print:text-black print:bg-transparent">
                                                ACOMP
                                            </div>
                                        )}
                                        <div
                                            className={`text-sm ${p.tipo === 'paciente'
                                                ? 'font-bold text-gray-900'
                                                : 'text-gray-600'
                                                }`}
                                        >
                                            {p.nome}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-3 py-3 text-sm text-gray-700 border-r border-gray-200 print:border-gray-400">
                                    {p.local}
                                </td>
                                <td className="px-3 py-3 text-sm text-gray-500 font-mono border-r border-gray-200 print:border-gray-400">
                                    {p.rg}
                                </td>
                                <td className="px-3 py-3 text-sm text-gray-500 border-r border-gray-200 print:border-gray-400">
                                    {p.telefone}
                                </td>
                                <td className="px-3 py-3 text-sm font-medium text-red-700 border-r border-gray-200 print:border-gray-400 print:text-black">
                                    {p.retorno}
                                </td>
                                <td className="px-3 py-3 text-sm text-center border-gray-200 print:border-gray-400">
                                    {p.statusConfirmacao ? (
                                        <div className="inline-flex items-center bg-green-50 text-green-700 text-xs font-bold px-2 py-1 rounded-full border border-green-200">
                                            <CheckCircle size={12} className="mr-1" />
                                            Confirmado {p.confirmadoEm}
                                        </div>
                                    ) : (
                                        <div className="inline-flex items-center bg-gray-100 text-gray-400 text-xs font-bold px-2 py-1 rounded-full border border-gray-200">
                                            <Clock size={12} className="mr-1" />
                                            Pendente
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {/* Linhas vazias para preencher folha se necessário */}
                        {[...Array(3)].map((_, i) => (
                            <tr key={`empty-${i}`} className="print:table-row hidden">
                                <td className="px-3 py-4 border-r border-gray-400">&nbsp;</td>
                                <td className="px-3 py-4 border-r border-gray-400"></td>
                                <td className="px-3 py-4 border-r border-gray-400"></td>
                                <td className="px-3 py-4 border-r border-gray-400"></td>
                                <td className="px-3 py-4 border-r border-gray-400"></td>
                                <td className="px-3 py-4"></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div >
    );
};
