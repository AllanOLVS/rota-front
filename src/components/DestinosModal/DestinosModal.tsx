import React from 'react';
import { X, MapPin, Navigation, Building } from 'lucide-react';

export interface Destino {
    nome: string;
    endereco: string;
}

interface DestinosModalProps {
    isOpen: boolean;
    onClose: () => void;
    destinos: Destino[];
    cidadeCalculada: string; // Para opção de ir para o centro/cidade geral
}

export const DestinosModal: React.FC<DestinosModalProps> = ({ isOpen, onClose, destinos = [], cidadeCalculada }) => {
    if (!isOpen) return null;

    // Remover duplicados baseados no nome do local (com fallback para array vazio)
    const destinosUnicos = (destinos || []).filter((dest, index, self) =>
        index === self.findIndex((t) => (
            t.nome === dest.nome && t.endereco === dest.endereco
        ))
    );

    const handleNavigate = (destino: string) => {
        const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destino)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-md rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="bg-gray-900 text-white p-4 flex justify-between items-center shrink-0">
                    <div className="flex items-center">
                        <MapPin className="mr-2 text-red-400" size={20} />
                        <h3 className="font-bold text-lg">Selecionar Destino</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-4 overflow-y-auto space-y-3">
                    <p className="text-sm text-gray-500 mb-2">Para onde deseja navegar?</p>

                    {/* Opção 1: Cidade Principal (Genérico) */}
                    <button
                        onClick={() => handleNavigate(cidadeCalculada)}
                        className="w-full bg-red-50 border-2 border-red-100 rounded-xl p-4 shadow-sm hover:bg-red-100 hover:border-red-200 transition-colors flex items-center justify-between group text-left"
                    >
                        <div className="flex items-center">
                            <div className="bg-white p-2 rounded-full mr-3 text-red-600">
                                <MapPin size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-800 text-lg">{cidadeCalculada}</h4>
                                <span className="text-sm text-red-500 font-medium">Centro / Ponto Central</span>
                            </div>
                        </div>
                        <Navigation size={20} className="text-red-300 group-hover:text-red-600 transition-colors" />
                    </button>

                    <div className="relative flex py-2 items-center">
                        <div className="flex-grow border-t border-gray-200"></div>
                        <span className="flex-shrink-0 mx-4 text-gray-400 text-xs uppercase font-bold">Locais de Atendimento</span>
                        <div className="flex-grow border-t border-gray-200"></div>
                    </div>

                    {/* Lista de Hospitais/Locais */}
                    {destinosUnicos.length === 0 ? (
                        <p className="text-center text-gray-400 py-4">Nenhum local específico cadastrado.</p>
                    ) : (
                        destinosUnicos.map((dest, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleNavigate(`${dest.nome}, ${dest.endereco}`)}
                                className="w-full bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:border-blue-400 hover:shadow-md transition-all flex items-center justify-between group text-left"
                            >
                                <div className="flex items-start">
                                    <div className="bg-blue-50 p-2 rounded-lg mr-3 text-blue-600 mt-1">
                                        <Building size={18} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-800">{dest.nome}</h4>
                                        <p className="text-xs text-gray-500 max-w-[200px] leading-tight mt-1">{dest.endereco}</p>
                                    </div>
                                </div>
                                <Navigation size={18} className="text-gray-300 group-hover:text-blue-600 transition-colors" />
                            </button>
                        ))
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-100 bg-gray-50 text-center text-xs text-gray-400 shrink-0">
                    Selecione um local para abrir o GPS (Google Maps).
                </div>
            </div>
        </div>
    );
};
