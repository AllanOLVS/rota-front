import React from 'react';
import { X, Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';

interface ViagemAgendada {
    id: number;
    data: string;
    diaSemana: string;
    destino: string; // Ex: "Salvador (Rota Capital)"
    horario: string;
    status: 'agendada' | 'confirmada';
}

// MOCK DATA - Ajustado para fazer mais sentido conforme pedido
const VIAGENS_SEMANA: ViagemAgendada[] = [
    {
        id: 1,
        data: '29/01',
        diaSemana: 'Quarta-feira',
        destino: 'Salvador',
        horario: '04:00',
        status: 'confirmada'
    },
    {
        id: 2,
        data: '31/01',
        diaSemana: 'Sexta-feira',
        destino: 'Feira de Santana',
        horario: '05:00',
        status: 'agendada'
    },
    {
        id: 3,
        data: '03/02',
        diaSemana: 'Segunda-feira',
        destino: 'Salvador',
        horario: '04:00',
        status: 'agendada'
    }
];

interface ViagensSemanaModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ViagensSemanaModal: React.FC<ViagensSemanaModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-md rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="bg-gray-900 text-white p-4 flex justify-between items-center shrink-0">
                    <div className="flex items-center">
                        <Calendar className="mr-2 text-red-400" size={20} />
                        <h3 className="font-bold text-lg">Escala Semanal</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-4 overflow-y-auto space-y-4">
                    <p className="text-sm text-gray-500 mb-2">Próximas viagens escaladas para você:</p>

                    {VIAGENS_SEMANA.map((viagem) => (
                        <div
                            key={viagem.id}
                            className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:border-red-200 transition-colors flex items-center justify-between group"
                        >
                            <div className="flex items-start gap-4">
                                {/* Date Box */}
                                <div className="bg-red-50 text-red-700 rounded-lg p-2 text-center min-w-[60px]">
                                    <span className="block text-xs font-bold uppercase text-red-400">
                                        {viagem.data.split('/')[1] === '01' ? 'JAN' : 'FEV'}
                                    </span>
                                    <span className="block text-xl font-bold leading-none">
                                        {viagem.data.split('/')[0]}
                                    </span>
                                </div>

                                <div>
                                    <h4 className="font-bold text-gray-800 flex items-center">
                                        {viagem.destino}
                                    </h4>
                                    <div className="text-sm text-gray-500 mt-1 flex flex-col gap-0.5">
                                        <span className="flex items-center">
                                            <Calendar size={12} className="mr-1" />
                                            {viagem.diaSemana}
                                        </span>
                                        <span className="flex items-center text-gray-600 font-medium">
                                            <Clock size={12} className="mr-1" />
                                            Saída às {viagem.horario}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <ArrowRight size={16} className="text-gray-300 group-hover:text-red-500 transition-colors" />
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-100 bg-gray-50 text-center text-xs text-gray-400 shrink-0">
                    * Sujeito a alterações pela central.
                </div>
            </div>
        </div>
    );
};
