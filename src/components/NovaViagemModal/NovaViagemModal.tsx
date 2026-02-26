import React, { useState } from 'react';
import { X, Calendar, MapPin, Clock, Truck, User } from 'lucide-react';

interface NovaViagemModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCriar: (dados: any) => void;
}

export const NovaViagemModal: React.FC<NovaViagemModalProps> = ({ isOpen, onClose, onCriar }) => {
    const [formData, setFormData] = useState({
        destino: '',
        data: '',
        horario: '',
        veiculo: '',
        motorista: ''
    });

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onCriar(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
                <div className="bg-red-600 text-white p-4 flex justify-between items-center">
                    <h3 className="font-bold text-lg">Nova Viagem</h3>
                    <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Destino Principal</label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-2.5 text-gray-400" size={18} />
                            <input
                                type="text"
                                required
                                placeholder="Ex: Salvador"
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                                value={formData.destino}
                                onChange={e => setFormData({ ...formData, destino: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-2.5 text-gray-400" size={18} />
                                <input
                                    type="date"
                                    required
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                                    value={formData.data}
                                    onChange={e => setFormData({ ...formData, data: e.target.value })}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Horário Saída</label>
                            <div className="relative">
                                <Clock className="absolute left-3 top-2.5 text-gray-400" size={18} />
                                <input
                                    type="time"
                                    required
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                                    value={formData.horario}
                                    onChange={e => setFormData({ ...formData, horario: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Veículo (Opcional)</label>
                        <div className="relative">
                            <Truck className="absolute left-3 top-2.5 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Ex: Van Sprinter"
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                                value={formData.veiculo}
                                onChange={e => setFormData({ ...formData, veiculo: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Motorista (Opcional)</label>
                        <div className="relative">
                            <User className="absolute left-3 top-2.5 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Ex: Carlos Silva"
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                                value={formData.motorista}
                                onChange={e => setFormData({ ...formData, motorista: e.target.value })}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-red-600 text-white font-bold py-3 rounded-xl hover:bg-red-700 transition-colors shadow-lg mt-2"
                    >
                        Criar Viagem
                    </button>
                </form>
            </div>
        </div>
    );
};
