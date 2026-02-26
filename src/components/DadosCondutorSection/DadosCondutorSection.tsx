import React from 'react';
import { User, Phone } from 'lucide-react';

interface DadosCondutorFormData {
    nome: string;
    cpf: string;
    dataNascimento: string;
    telefone: string;
    genero: string;
}

interface DadosCondutorSectionProps {
    formData: DadosCondutorFormData;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export const DadosCondutorSection: React.FC<DadosCondutorSectionProps> = ({
    formData,
    onChange,
}) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center">
                <User className="text-gray-500 mr-2" size={20} />
                <h2 className="text-lg font-bold text-gray-800">Dados do Condutor</h2>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Nome Completo */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo *</label>
                    <input
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={onChange}
                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none uppercase"
                        placeholder="NOME DO MOTORISTA"
                        required
                    />
                </div>

                {/* CPF */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CPF *</label>
                    <input
                        type="text"
                        name="cpf"
                        value={formData.cpf}
                        onChange={onChange}
                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none"
                        placeholder="000.000.000-00"
                        required
                    />
                </div>

                {/* Data Nascimento */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Data de Nascimento *</label>
                    <input
                        type="date"
                        name="dataNascimento"
                        value={formData.dataNascimento}
                        onChange={onChange}
                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none text-gray-600"
                        required
                    />
                </div>

                {/* Telefone */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Telefone / Celular *</label>
                    <div className="relative">
                        <Phone size={18} className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="tel"
                            name="telefone"
                            value={formData.telefone}
                            onChange={onChange}
                            className="pl-10 w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none"
                            placeholder="(00) 90000-0000"
                            required
                        />
                    </div>
                </div>

                {/* Gênero */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sexo / Gênero</label>
                    <select
                        name="genero"
                        value={formData.genero}
                        onChange={onChange}
                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none bg-white"
                    >
                        <option value="">Selecione...</option>
                        <option value="M">Masculino</option>
                        <option value="F">Feminino</option>
                    </select>
                </div>

            </div>
        </div>
    );
};
