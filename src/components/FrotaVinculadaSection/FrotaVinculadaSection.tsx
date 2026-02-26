import React from 'react';
import { Truck, Plus, Trash2 } from 'lucide-react';
import type { VeiculoFrota } from '../../data/motoristaData';

interface FrotaVinculadaSectionProps {
    veiculosVinculados: VeiculoFrota[];
    veiculosDisponiveis: VeiculoFrota[];
    showModal: boolean;
    onToggleModal: () => void;
    onAddVehicle: (vehicle: VeiculoFrota) => void;
    onRemoveVehicle: (vehicleId: number) => void;
}

export const FrotaVinculadaSection: React.FC<FrotaVinculadaSectionProps> = ({
    veiculosVinculados,
    veiculosDisponiveis,
    showModal,
    onToggleModal,
    onAddVehicle,
    onRemoveVehicle,
}) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 h-full flex flex-col">
            <div className="bg-red-50 px-6 py-4 border-b border-red-100 flex items-center">
                <Truck className="text-red-600 mr-2" size={20} />
                <h2 className="text-lg font-bold text-red-900">Frota Vinculada</h2>
            </div>

            <div className="p-6 flex-1 flex flex-col">
                <p className="text-sm text-gray-500 mb-4">
                    Associe os veículos que este motorista está autorizado a conduzir.
                </p>

                {/* Lista de Veículos Vinculados */}
                <div className="flex-1 space-y-3 mb-4">
                    {veiculosVinculados.length === 0 ? (
                        <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
                            <Truck className="mx-auto h-8 w-8 text-gray-300 mb-2" />
                            <p className="text-sm text-gray-400">Nenhum veículo vinculado.</p>
                        </div>
                    ) : (
                        veiculosVinculados.map(veiculo => (
                            <div key={veiculo.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200">
                                <div>
                                    <p className="font-bold text-sm text-gray-800">{veiculo.modelo}</p>
                                    <p className="text-xs text-gray-500 font-mono">{veiculo.placa}</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => onRemoveVehicle(veiculo.id)}
                                    className="text-gray-400 hover:text-red-600 p-1"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* Botão Adicionar */}
                <div className="relative">
                    <button
                        type="button"
                        onClick={onToggleModal}
                        className="w-full py-2.5 bg-red-100 text-red-700 font-medium rounded-lg border border-red-200 hover:bg-red-200 transition-colors flex items-center justify-center"
                    >
                        <Plus size={18} className="mr-2" />
                        Vincular Veículo
                    </button>

                    {/* Modal/Dropdown de Seleção */}
                    {showModal && (
                        <div className="absolute bottom-full left-0 w-full mb-2 bg-white rounded-xl shadow-xl border border-gray-200 z-10 overflow-hidden max-h-60 overflow-y-auto">
                            <div className="p-2 bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase">
                                Selecione para adicionar
                            </div>
                            {veiculosDisponiveis.map(v => (
                                <button
                                    key={v.id}
                                    type="button"
                                    onClick={() => onAddVehicle(v)}
                                    className="w-full text-left px-4 py-3 hover:bg-red-50 border-b border-gray-50 last:border-0 flex justify-between items-center group"
                                >
                                    <div>
                                        <p className="font-medium text-sm text-gray-800">{v.modelo}</p>
                                        <p className="text-xs text-gray-500">{v.placa}</p>
                                    </div>
                                    <Plus size={16} className="text-gray-300 group-hover:text-red-500" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};
