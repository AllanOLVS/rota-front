import React from 'react';
import { Bus, User, FileText, Info } from 'lucide-react';
import type { Motorista, Veiculo } from '../../data/viagemData';

interface FrotaFormData {
    motoristaId: string;
    veiculoId: string;
    observacoes: string;
}

interface FrotaSectionProps {
    formData: FrotaFormData;
    motoristas: Motorista[];
    veiculos: Veiculo[];
    selectedVeiculo: Veiculo | null;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

export const FrotaSection: React.FC<FrotaSectionProps> = ({
    formData,
    motoristas,
    veiculos,
    selectedVeiculo,
    onChange,
}) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center">
                <div className="bg-white p-2 rounded-lg text-gray-600 mr-3 shadow-sm border border-gray-200">
                    <Bus size={20} />
                </div>
                <div>
                    <h2 className="text-lg font-bold text-gray-800">Frota e Equipe</h2>
                    <p className="text-xs text-gray-500">Alocação de recursos para a viagem</p>
                </div>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Motorista */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Motorista Responsável *</label>
                    <div className="relative">
                        <User size={18} className="absolute left-3 top-3 text-gray-400" />
                        <select
                            name="motoristaId"
                            value={formData.motoristaId}
                            onChange={onChange}
                            className="w-full border border-gray-300 rounded-lg p-2.5 pl-10 focus:ring-2 focus:ring-red-500 outline-none bg-white"
                            required
                        >
                            <option value="">Selecione o motorista...</option>
                            {motoristas.map((m) => (
                                <option
                                    key={m.id}
                                    value={m.id}
                                    disabled={m.status !== 'disponivel'}
                                    className={m.status !== 'disponivel' ? 'text-gray-400' : ''}
                                >
                                    {m.nome} {m.status !== 'disponivel' ? `(${m.status.toUpperCase()})` : ''}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Veículo */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Veículo *</label>
                    <div className="relative">
                        <Bus size={18} className="absolute left-3 top-3 text-gray-400" />
                        <select
                            name="veiculoId"
                            value={formData.veiculoId}
                            onChange={onChange}
                            className="w-full border border-gray-300 rounded-lg p-2.5 pl-10 focus:ring-2 focus:ring-red-500 outline-none bg-white"
                            required
                        >
                            <option value="">Selecione o veículo...</option>
                            {veiculos.map((v) => (
                                <option key={v.id} value={v.id}>
                                    {v.modelo} - {v.placa}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Info do Veículo */}
                {selectedVeiculo && (
                    <div className="col-span-1 md:col-span-2 bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start animate-pulse-once">
                        <Info className="text-blue-500 mr-3 mt-0.5" size={20} />
                        <div>
                            <h4 className="font-bold text-blue-900 text-sm">
                                Capacidade do Veículo: {selectedVeiculo.capacidade} Lugares
                            </h4>
                            <p className="text-xs text-blue-700 mt-1">
                                Este veículo suporta até {selectedVeiculo.capacidade} passageiros.
                                O sistema alertará se você tentar adicionar mais pessoas que o permitido.
                            </p>
                        </div>
                    </div>
                )}

                {/* Observações */}
                <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Observações Gerais</label>
                    <div className="relative">
                        <FileText size={18} className="absolute left-3 top-3 text-gray-400" />
                        <textarea
                            name="observacoes"
                            value={formData.observacoes}
                            onChange={onChange}
                            rows={3}
                            className="w-full border border-gray-300 rounded-lg p-2.5 pl-10 focus:ring-2 focus:ring-red-500 outline-none"
                            placeholder="Ex: Levar cadeira de rodas; Paciente João precisa de oxigênio..."
                        ></textarea>
                    </div>
                </div>

            </div>
        </div>
    );
};
