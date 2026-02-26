import React from 'react';
import { Filter, User, MapPin, Search } from 'lucide-react';

interface HistoryFilters {
    dataInicio: string;
    dataFim: string;
    motorista: string;
    cidade: string;
    hospital: string;
    paciente: string;
}

interface HistoryFiltersProps {
    filters: HistoryFilters;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onClear: () => void;
}

export const HistoryFiltersPanel: React.FC<HistoryFiltersProps> = ({
    filters,
    onChange,
    onClear,
}) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <div className="flex items-center mb-4 text-gray-800 font-bold text-sm uppercase tracking-wide">
                <Filter size={16} className="mr-2 text-red-500" />
                Filtros de Pesquisa
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {/* Data Inicio */}
                <div className="col-span-1">
                    <label className="text-xs font-semibold text-gray-500 mb-1 block">De (Data)</label>
                    <input
                        type="date"
                        name="dataInicio"
                        value={filters.dataInicio}
                        onChange={onChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-red-500 outline-none"
                    />
                </div>

                {/* Data Fim */}
                <div className="col-span-1">
                    <label className="text-xs font-semibold text-gray-500 mb-1 block">Até (Data)</label>
                    <input
                        type="date"
                        name="dataFim"
                        value={filters.dataFim}
                        onChange={onChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-red-500 outline-none"
                    />
                </div>

                {/* Filtro Motorista */}
                <div className="col-span-1 lg:col-span-2 xl:col-span-1">
                    <label className="text-xs font-semibold text-gray-500 mb-1 block">Motorista</label>
                    <div className="relative">
                        <User size={14} className="absolute left-3 top-2.5 text-gray-400" />
                        <input
                            type="text"
                            name="motorista"
                            value={filters.motorista}
                            onChange={onChange}
                            placeholder="Nome do motorista..."
                            className="w-full border border-gray-300 rounded-lg pl-8 pr-3 py-2 text-sm focus:ring-1 focus:ring-red-500 outline-none"
                        />
                    </div>
                </div>

                {/* Filtro Cidade */}
                <div className="col-span-1 lg:col-span-2 xl:col-span-1">
                    <label className="text-xs font-semibold text-gray-500 mb-1 block">Cidade / Destino</label>
                    <div className="relative">
                        <MapPin size={14} className="absolute left-3 top-2.5 text-gray-400" />
                        <select
                            name="cidade"
                            value={filters.cidade}
                            onChange={onChange}
                            className="w-full border border-gray-300 rounded-lg pl-8 pr-3 py-2 text-sm focus:ring-1 focus:ring-red-500 outline-none bg-white"
                        >
                            <option value="">Todas</option>
                            <option value="Salvador">Salvador</option>
                            <option value="Feira">Feira de Santana</option>
                            <option value="Sto">Sto. Antônio</option>
                        </select>
                    </div>
                </div>

                {/* Filtro Hospital */}
                <div className="col-span-1 lg:col-span-2 xl:col-span-1">
                    <label className="text-xs font-semibold text-gray-500 mb-1 block">Hospital</label>
                    <div className="relative">
                        <Search size={14} className="absolute left-3 top-2.5 text-gray-400" />
                        <input
                            type="text"
                            name="hospital"
                            value={filters.hospital}
                            onChange={onChange}
                            placeholder="Ex: Sta Izabel..."
                            className="w-full border border-gray-300 rounded-lg pl-8 pr-3 py-2 text-sm focus:ring-1 focus:ring-red-500 outline-none"
                        />
                    </div>
                </div>

                {/* Filtro Paciente */}
                <div className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-1">
                    <label className="text-xs font-semibold text-red-600 mb-1 block">Buscar Paciente</label>
                    <div className="relative">
                        <User size={14} className="absolute left-3 top-2.5 text-red-300" />
                        <input
                            type="text"
                            name="paciente"
                            value={filters.paciente}
                            onChange={onChange}
                            placeholder="Quem viajou?"
                            className="w-full border border-red-200 bg-red-50 rounded-lg pl-8 pr-3 py-2 text-sm focus:ring-1 focus:ring-red-500 outline-none placeholder-red-300 text-red-800"
                        />
                    </div>
                </div>
            </div>

            {/* Botão Limpar */}
            <div className="mt-4 flex justify-end">
                <button
                    onClick={onClear}
                    className="text-xs text-gray-500 hover:text-red-600 underline transition-colors"
                >
                    Limpar todos os filtros
                </button>
            </div>
        </div>
    );
};
