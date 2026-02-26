import React from 'react';
import { MapPin, Calendar, Clock } from 'lucide-react';

interface RoteiroFormData {
    destino: string;
    data: string;
    horario: string;
    localSaida: string;
}

interface RoteiroSectionProps {
    formData: RoteiroFormData;
    destinos: string[];
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export const RoteiroSection: React.FC<RoteiroSectionProps> = ({
    formData,
    destinos,
    onChange,
}) => {
    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-red-50 px-6 py-4 border-b border-red-100 flex items-center justify-between">
                <div className="flex items-center">
                    <div className="bg-white p-2 rounded-lg text-red-600 mr-3 shadow-sm border border-red-100">
                        <MapPin size={20} />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-red-900">Dados do Roteiro</h2>
                        <p className="text-xs text-red-700">Defina o destino e horários da viagem</p>
                    </div>
                </div>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Destino */}
                <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cidade de Destino *</label>
                    <div className="relative">
                        <select
                            name="destino"
                            value={formData.destino}
                            onChange={onChange}
                            className="w-full border border-gray-300 rounded-lg p-3 pl-3 focus:ring-2 focus:ring-red-500 outline-none bg-white appearance-none"
                            required
                        >
                            <option value="">Selecione a cidade...</option>
                            {destinos.map((dest, idx) => (
                                <option key={idx} value={dest}>{dest}</option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-500">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path>
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Data da Viagem */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Data da Viagem *</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <Calendar size={18} />
                        </div>
                        <input
                            type="date"
                            name="data"
                            value={formData.data}
                            onChange={onChange}
                            min={today}
                            className="pl-10 w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none text-gray-700"
                            required
                        />
                    </div>
                </div>

                {/* Horário de Saída */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Horário de Saída *</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <Clock size={18} />
                        </div>
                        <input
                            type="time"
                            name="horario"
                            value={formData.horario}
                            onChange={onChange}
                            className="pl-10 w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none"
                            required
                        />
                    </div>
                </div>

                {/* Local de Saída */}
                <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Local de Saída (Ponto de Encontro) *</label>
                    <input
                        type="text"
                        name="localSaida"
                        value={formData.localSaida}
                        onChange={onChange}
                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none"
                        placeholder="Ex: Praça da Matriz"
                        required
                    />
                </div>

            </div>
        </div>
    );
};
