import React, { useState } from 'react';
import {
    X,
    Building,
    Phone,
    Save,
    Search,
    Navigation
} from 'lucide-react';

export interface DestinoFormData {
    cep: string;
    uf: string;
    cidade: string;
    nomeLocal: string;
    telefone: string;
    bairro: string;
    logradouro: string;
    numero: string;
    referencia: string;
    observacoes: string;
}

interface CadastroDestinoModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: DestinoFormData) => void;
}

export const CadastroDestinoModal: React.FC<CadastroDestinoModalProps> = ({
    isOpen,
    onClose,
    onSave
}) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<DestinoFormData>({
        cep: '',
        uf: '',
        cidade: '',
        nomeLocal: '',
        telefone: '',
        bairro: '',
        logradouro: '',
        numero: '',
        referencia: '',
        observacoes: ''
    });

    // Simulação de busca de CEP
    const handleBuscarCep = () => {
        if (formData.cep.length >= 8) {
            setLoading(true);
            setTimeout(() => {
                // Dados fictícios simulando uma API
                setFormData(prev => ({
                    ...prev,
                    uf: 'BA',
                    cidade: 'Salvador',
                    bairro: 'Brotas',
                    logradouro: 'Av. Dom João VI'
                }));
                setLoading(false);
            }, 800);
        } else {
            alert("Por favor, digite um CEP válido.");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Validação básica
        if (!formData.nomeLocal || !formData.cidade) {
            alert("Preencha o nome do local e a cidade.");
            return;
        }
        onSave(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 fade-in">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden transform transition-all scale-100 flex flex-col max-h-[90vh]">

                {/* Cabeçalho */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center flex-shrink-0">
                    <h3 className="font-bold text-gray-800 flex items-center text-lg">
                        <div className="bg-red-100 p-2 rounded-lg mr-3 text-red-600">
                            <Building size={20} />
                        </div>
                        Novo Destino / Hospital
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-red-600 transition-colors rounded-full p-1 hover:bg-gray-100"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Corpo do Formulário */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto custom-scrollbar">

                    {/* Seção 1: Identificação */}
                    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 border-b pb-2">
                            Identificação do Local
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Hospital / Clínica *</label>
                                <input
                                    type="text"
                                    name="nomeLocal"
                                    value={formData.nomeLocal}
                                    onChange={handleChange}
                                    placeholder="Ex: Hospital Geral do Estado (HGE)"
                                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none font-medium"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Telefone para Contato</label>
                                <div className="relative">
                                    <Phone size={18} className="absolute left-3 top-2.5 text-gray-400" />
                                    <input
                                        type="tel"
                                        name="telefone"
                                        value={formData.telefone}
                                        onChange={handleChange}
                                        placeholder="(00) 0000-0000"
                                        className="w-full border border-gray-300 rounded-lg p-2.5 pl-10 focus:ring-2 focus:ring-red-500 outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Seção 2: Endereço */}
                    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 border-b pb-2">
                            Endereço e Localização
                        </h4>

                        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">

                            {/* CEP com Botão */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">CEP</label>
                                <div className="flex">
                                    <input
                                        type="text"
                                        name="cep"
                                        value={formData.cep}
                                        onChange={handleChange}
                                        placeholder="00000-000"
                                        className="w-full border border-gray-300 rounded-l-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleBuscarCep}
                                        className="bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg px-3 hover:bg-gray-200 text-gray-600 transition-colors"
                                        title="Buscar CEP"
                                    >
                                        {loading ? <div className="animate-spin h-4 w-4 border-2 border-red-500 border-t-transparent rounded-full"></div> : <Search size={18} />}
                                    </button>
                                </div>
                            </div>

                            {/* UF */}
                            <div className="md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                                <input
                                    type="text"
                                    name="uf"
                                    value={formData.uf}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none bg-gray-50"
                                    placeholder="UF"
                                />
                            </div>

                            {/* Cidade */}
                            <div className="md:col-span-3">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Cidade *</label>
                                <input
                                    type="text"
                                    name="cidade"
                                    value={formData.cidade}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none"
                                    placeholder="Nome da Cidade"
                                    required
                                />
                            </div>

                            {/* Logradouro */}
                            <div className="md:col-span-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Logradouro (Rua, Av.)</label>
                                <input
                                    type="text"
                                    name="logradouro"
                                    value={formData.logradouro}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none"
                                />
                            </div>

                            {/* Número */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Número</label>
                                <input
                                    type="text"
                                    name="numero"
                                    value={formData.numero}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none"
                                    placeholder="S/N"
                                />
                            </div>

                            {/* Bairro */}
                            <div className="md:col-span-3">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Bairro</label>
                                <input
                                    type="text"
                                    name="bairro"
                                    value={formData.bairro}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none"
                                />
                            </div>

                            {/* Ponto de Referência */}
                            <div className="md:col-span-3">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Ponto de Referência</label>
                                <div className="relative">
                                    <Navigation size={18} className="absolute left-3 top-2.5 text-gray-400" />
                                    <input
                                        type="text"
                                        name="referencia"
                                        value={formData.referencia}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg p-2.5 pl-10 focus:ring-2 focus:ring-red-500 outline-none"
                                        placeholder="Ex: Próximo ao shopping"
                                    />
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Observações */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Outras Informações</label>
                        <textarea
                            name="observacoes"
                            value={formData.observacoes}
                            onChange={handleChange}
                            rows={2}
                            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none text-sm"
                            placeholder="Horário de funcionamento, portaria específica para ambulância, etc."
                        ></textarea>
                    </div>

                    {/* Botões */}
                    <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t border-gray-100">
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full sm:w-auto px-5 py-2.5 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="w-full sm:w-auto px-6 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 font-medium shadow-md transition-all flex items-center justify-center"
                        >
                            <Save size={18} className="mr-2" />
                            Salvar Destino
                        </button>
                    </div>

                </form>
            </div>

            <style>{`
        .fade-in { animation: fadeIn 0.2s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #ccc; border-radius: 3px; }
      `}</style>
        </div>
    );
};

export default CadastroDestinoModal;
