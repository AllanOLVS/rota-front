import React from 'react';
import { Clock, User, Bus, Users } from 'lucide-react';
import type { Viagem } from '../../data/mockData';

interface ViagemCardProps {
    viagem: Viagem;
    onClick: (viagem: Viagem) => void;
}

export const ViagemCard: React.FC<ViagemCardProps> = ({ viagem, onClick }) => {
    const dataViagem = new Date(viagem.data);
    const mes = dataViagem.toLocaleString('pt-BR', { month: 'short' });
    const dia = dataViagem.getDate();

    return (
        <div
            onClick={() => onClick(viagem)}
            className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-red-300 cursor-pointer transition-all group"
        >
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 bg-red-50 rounded-lg flex flex-col items-center justify-center text-red-700 font-bold border border-red-100">
                        <span className="text-xs uppercase">{mes}</span>
                        <span className="text-xl leading-none">{dia}</span>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-gray-800 group-hover:text-red-600 transition-colors">
                            {viagem.destino}
                        </h3>
                        <div className="flex items-center text-sm text-gray-500">
                            <Clock size={14} className="mr-1" /> Saída às {viagem.saida}
                        </div>
                    </div>
                </div>
                <span
                    className={`px-2 py-1 rounded-full text-xs font-bold border ${viagem.status === 'confirmada'
                        ? 'bg-green-50 text-green-700 border-green-200'
                        : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                        }`}
                >
                    {viagem.status === 'confirmada' ? 'CONFIRMADA' : 'PENDENTE'}
                </span>
            </div>

            <div className="border-t border-gray-100 pt-4 grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
                <div className="flex items-center text-gray-600">
                    <User size={16} className="mr-2" />
                    {viagem.motorista}
                </div>
                <div className="flex items-center text-gray-600">
                    <Bus size={16} className="mr-2" />
                    {viagem.veiculo}
                </div>
                <div className="flex items-center font-medium text-gray-800">
                    <Users size={16} className="mr-2 text-red-500" />
                    {viagem.lotacao}/{viagem.capacidade}
                </div>
            </div>
        </div>
    );
};
