import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Car,
    Truck,
    Settings,
    Save,
    X,
    AlertCircle,
    Calendar,
    Hash,
    FileText,
    ChevronLeft
} from 'lucide-react';

interface VeiculoFormData {
    modelo: string;
    placa: string;
    ano: string;
    renavam: string;
    tipo: string;
    capacidade: string;
    quilometragem: string;
    status: string;
}

export const CadastrarVeiculo: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [veiculoForm, setVeiculoForm] = useState<VeiculoFormData>({
        modelo: '',
        placa: '',
        ano: '',
        renavam: '',
        tipo: 'Carro',
        capacidade: '',
        quilometragem: '',
        status: 'disponivel'
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setVeiculoForm(prev => ({ ...prev, [name]: value }));
    };

    const handleBack = () => {
        navigate('/frota');
    };

    const handleSaveVeiculo = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            console.log("Dados do Veículo:", veiculoForm);
            alert("Veículo cadastrado com sucesso!");
            setLoading(false);
            navigate('/frota');
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6 font-sans text-gray-800 flex justify-center">
            <div className="w-full max-w-4xl fade-in">

                {/* Cabeçalho da Tela com Botão Voltar */}
                <div className="mb-6 flex items-center">
                    <button
                        onClick={handleBack}
                        className="mr-4 text-gray-500 hover:text-red-600 transition-colors p-2 rounded-full hover:bg-gray-200"
                        title="Voltar"
                    >
                        <ChevronLeft size={28} />
                    </button>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                            <Car className="mr-2 text-red-600" /> Novo Veículo
                        </h2>
                        <p className="text-sm text-gray-500">Preencha os dados para adicionar à frota.</p>
                    </div>
                </div>

                <form onSubmit={handleSaveVeiculo} className="space-y-6">
                    {/* Seção Principal: Dados do Veículo */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center">
                            <Truck className="text-gray-500 mr-2" size={20} />
                            <h3 className="font-bold text-gray-700">Dados do Veículo</h3>
                        </div>

                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Modelo */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Modelo do Veículo *</label>
                                <input
                                    type="text"
                                    name="modelo"
                                    value={veiculoForm.modelo}
                                    onChange={handleInputChange}
                                    placeholder="Ex: Fiat Ducato, Mercedes Sprinter..."
                                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none"
                                    required
                                />
                            </div>

                            {/* Placa */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Placa *</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                        <Hash size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        name="placa"
                                        value={veiculoForm.placa}
                                        onChange={handleInputChange}
                                        placeholder="ABC-1234"
                                        className="w-full border border-gray-300 rounded-lg p-2.5 pl-10 focus:ring-2 focus:ring-red-500 outline-none uppercase"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Renavam */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Renavam</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                        <FileText size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        name="renavam"
                                        value={veiculoForm.renavam}
                                        onChange={handleInputChange}
                                        placeholder="00000000000"
                                        className="w-full border border-gray-300 rounded-lg p-2.5 pl-10 focus:ring-2 focus:ring-red-500 outline-none"
                                    />
                                </div>
                            </div>

                            {/* Tipo */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Veículo *</label>
                                <select
                                    name="tipo"
                                    value={veiculoForm.tipo}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none bg-white"
                                >
                                    <option value="Carro">Carro de Passeio (5 lug)</option>
                                    <option value="Van">Van / Utilitário</option>
                                    <option value="Microônibus">Microônibus</option>
                                    <option value="Ônibus">Ônibus</option>
                                    <option value="Ambulância">Ambulância</option>
                                </select>
                            </div>

                            {/* Ano */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Ano de Fabricação</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                        <Calendar size={18} />
                                    </div>
                                    <input
                                        type="number"
                                        name="ano"
                                        value={veiculoForm.ano}
                                        onChange={handleInputChange}
                                        placeholder="2024"
                                        className="w-full border border-gray-300 rounded-lg p-2.5 pl-10 focus:ring-2 focus:ring-red-500 outline-none"
                                    />
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Seção Operacional: Capacidade e Status */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center">
                            <Settings className="text-gray-500 mr-2" size={20} />
                            <h3 className="font-bold text-gray-700">Operacional</h3>
                        </div>

                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Capacidade */}
                            <div className="md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Capacidade de Passageiros *</label>
                                <div className="flex items-center">
                                    <input
                                        type="number"
                                        name="capacidade"
                                        value={veiculoForm.capacidade}
                                        onChange={handleInputChange}
                                        placeholder="0"
                                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none"
                                        required
                                    />
                                    <span className="ml-3 text-sm text-gray-500">Lugares</span>
                                </div>
                                <p className="text-xs text-gray-400 mt-1 flex items-center">
                                    <AlertCircle size={12} className="mr-1" />
                                    Importante para o cálculo de lotação das viagens.
                                </p>
                            </div>

                            {/* Quilometragem */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Quilometragem Atual</label>
                                <div className="flex items-center">
                                    <input
                                        type="number"
                                        name="quilometragem"
                                        value={veiculoForm.quilometragem}
                                        onChange={handleInputChange}
                                        placeholder="0"
                                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none"
                                    />
                                    <span className="ml-3 text-sm text-gray-500">KM</span>
                                </div>
                            </div>

                            {/* Status Inicial */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Status Inicial</label>
                                <div className="flex gap-4">
                                    <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer bg-white hover:bg-gray-50 flex-1">
                                        <input
                                            type="radio"
                                            name="status"
                                            value="disponivel"
                                            checked={veiculoForm.status === 'disponivel'}
                                            onChange={handleInputChange}
                                            className="text-red-600 focus:ring-red-500"
                                        />
                                        <div className="ml-3">
                                            <span className="block text-sm font-medium text-green-700">Disponível</span>
                                            <span className="block text-xs text-gray-500">Pronto para viagens</span>
                                        </div>
                                    </label>

                                    <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer bg-white hover:bg-gray-50 flex-1">
                                        <input
                                            type="radio"
                                            name="status"
                                            value="manutencao"
                                            checked={veiculoForm.status === 'manutencao'}
                                            onChange={handleInputChange}
                                            className="text-red-600 focus:ring-red-500"
                                        />
                                        <div className="ml-3">
                                            <span className="block text-sm font-medium text-red-700">Manutenção</span>
                                            <span className="block text-xs text-gray-500">Indisponível (Oficina)</span>
                                        </div>
                                    </label>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Botões de Ação */}
                    <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 pb-8">
                        <button
                            type="button"
                            onClick={handleBack}
                            className="w-full sm:w-auto px-6 py-2.5 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 font-medium transition-colors flex items-center justify-center"
                        >
                            <X size={20} className="mr-2" />
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full sm:w-auto px-6 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-black font-medium shadow-lg transition-all flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Salvando...' : (
                                <>
                                    <Save size={20} className="mr-2" />
                                    Salvar Veículo
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>

            <style>{`
                .fade-in { animation: fadeIn 0.3s ease-in-out; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    );
};

export default CadastrarVeiculo;
