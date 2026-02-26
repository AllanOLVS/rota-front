import React from 'react';
import { CreditCard } from 'lucide-react';

interface CNHSectionProps {
    cnh: string;
    categoriaCnh: string;
    validadeCnh: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export const CNHSection: React.FC<CNHSectionProps> = ({
    cnh,
    categoriaCnh,
    validadeCnh,
    onChange,
}) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center">
                <CreditCard className="text-gray-500 mr-2" size={20} />
                <h2 className="text-lg font-bold text-gray-800">Dados da Habilitação (CNH)</h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">

                <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nº Registro CNH *</label>
                    <input
                        type="text"
                        name="cnh"
                        value={cnh}
                        onChange={onChange}
                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none font-mono"
                        placeholder="00000000000"
                        required
                    />
                </div>

                <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Categoria *</label>
                    <select
                        name="categoriaCnh"
                        value={categoriaCnh}
                        onChange={onChange}
                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none bg-white"
                        required
                    >
                        <option value="">Selecione...</option>
                        <option value="B">B (Carro)</option>
                        <option value="C">C (Carga)</option>
                        <option value="D">D (Passageiros/Van)</option>
                        <option value="E">E (Articulado)</option>
                    </select>
                </div>

                <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Validade *</label>
                    <input
                        type="date"
                        name="validadeCnh"
                        value={validadeCnh}
                        onChange={onChange}
                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none text-gray-600"
                        required
                    />
                </div>

            </div>
        </div>
    );
};
