import React, { useState, useEffect } from 'react';
import {
    X,
    Building,
    Phone,
    Search,
    Navigation,
    Save,
    Trash2
} from 'lucide-react';

export interface DestinoData {
    id: number | null;
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

interface DetalhesDestinoModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: DestinoData) => void;
    onDelete: (id: number) => void;
    destinoToEdit: DestinoData | null;
}

export const DetalhesDestinoModal: React.FC<DetalhesDestinoModalProps> = ({
    isOpen,
    onClose,
    onSave,
    onDelete,
    destinoToEdit
}) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<DestinoData>({
        id: null,
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

    // Carrega os dados do destino selecionado ao abrir
    useEffect(() => {
        if (isOpen && destinoToEdit) {
            setFormData(destinoToEdit);
        }
    }, [isOpen, destinoToEdit]);

    const handleBuscarCep = () => {
        if (formData.cep.length >= 8) {
            setLoading(true);
            setTimeout(() => {
                setFormData(prev => ({
                    ...prev,
                    uf: 'BA',
                    cidade: 'Salvador',
                    bairro: 'Brotas',
                    logradouro: 'Av. Dom João VI'
                }));
                setLoading(false);
            }, 800);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    const handleDelete = () => {
        if (formData.id && window.confirm(`Tem certeza que deseja excluir ${formData.nomeLocal}?`)) {
            onDelete(formData.id);
        }
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
                        Detalhes do Destino
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
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Hospital / Clínica</label>
                                <input
                                    type="text"
                                    name="nomeLocal"
                                    value={formData.nomeLocal}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none font-medium"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                                <div className="relative">
                                    <Phone size={18} className="absolute left-3 top-2.5 text-gray-400" />
                                    <input
                                        type="tel"
                                        name="telefone"
                                        value={formData.telefone}
                                        onChange={handleChange}
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

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">CEP</label>
                                <div className="flex">
                                    <input
                                        type="text"
                                        name="cep"
                                        value={formData.cep}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-l-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleBuscarCep}
                                        className="bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg px-3 hover:bg-gray-200 text-gray-600 transition-colors"
                                    >
                                        {loading ? <div className="animate-spin h-4 w-4 border-2 border-red-500 border-t-transparent rounded-full"></div> : <Search size={18} />}
                                    </button>
                                </div>
                            </div>

                            <div className="md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">UF</label>
                                <input
                                    type="text"
                                    name="uf"
                                    value={formData.uf}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none bg-gray-50"
                                />
                            </div>

                            <div className="md:col-span-3">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Cidade</label>
                                <input
                                    type="text"
                                    name="cidade"
                                    value={formData.cidade}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none"
                                />
                            </div>

                            <div className="md:col-span-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Logradouro</label>
                                <input
                                    type="text"
                                    name="logradouro"
                                    value={formData.logradouro}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Número</label>
                                <input
                                    type="text"
                                    name="numero"
                                    value={formData.numero}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none"
                                />
                            </div>

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
                        ></textarea>
                    </div>

                    {/* Botões de Ação */}
                    <div className="flex flex-col-reverse sm:flex-row justify-between gap-3 pt-4 border-t border-gray-100">
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="w-full sm:w-auto px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-xl font-medium transition-colors flex items-center justify-center border border-transparent hover:border-red-100"
                        >
                            <Trash2 size={18} className="mr-2" />
                            Excluir
                        </button>

                        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                            <button
                                type="button"
                                onClick={onClose}
                                className="w-full sm:w-auto px-5 py-2.5 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="w-full sm:w-auto px-6 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-black font-medium shadow-md transition-all flex items-center justify-center"
                            >
                                <Save size={18} className="mr-2" />
                                Salvar Alterações
                            </button>
                        </div>
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

export default DetalhesDestinoModal;
