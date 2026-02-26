import React from 'react';
import { Search } from 'lucide-react';

interface FilterBarProps {
    searchTerm?: string;
    onSearchChange?: (value: string) => void;
    dateFilter?: string;
    onDateChange?: (value: string) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
    searchTerm = '',
    onSearchChange,
    dateFilter = '',
    onDateChange,
}) => {
    return (
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => onSearchChange?.(e.target.value)}
                    placeholder="Buscar por destino ou motorista..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
            </div>
            <input
                type="date"
                value={dateFilter}
                onChange={(e) => onDateChange?.(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none text-gray-600"
            />
        </div>
    );
};
