import React from 'react';
import { Plus } from 'lucide-react';
import type { Viagem } from '../../data/mockData';
import { ViagemCard } from '../ViagemCard';
import { FilterBar } from '../FilterBar';

interface ViagensListProps {
    viagens: Viagem[];
    onViagemClick: (viagem: Viagem) => void;
    onNovaViagem?: () => void;
}

export const ViagensList: React.FC<ViagensListProps> = ({
    viagens,
    onViagemClick,
    onNovaViagem,
}) => {
    return (
        <div className="space-y-6 fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Programação de Viagens
                    </h1>
                    <p className="text-gray-500">
                        Gerencie as saídas e aloque passageiros nos veículos.
                    </p>
                </div>
                <button
                    onClick={onNovaViagem}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center font-medium shadow-sm transition-colors"
                >
                    <Plus size={18} className="mr-2" />
                    Nova Viagem
                </button>
            </div>

            {/* Filtros */}
            <FilterBar />

            {/* Grid de Viagens */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {viagens.map((viagem) => (
                    <ViagemCard
                        key={viagem.id}
                        viagem={viagem}
                        onClick={onViagemClick}
                    />
                ))}
            </div>
        </div>
    );
};
