import React, { useState } from 'react';
import { X, Search, User, Check, ArrowRight, ArrowLeft, MapPin, Users } from 'lucide-react';

interface Paciente {
    id: number;
    nome: string;
    cpf: string;
    bairro: string;
}

// Interface extendida para incluir dados da viagem
export interface PassageiroSelecionado extends Paciente {
    destinoViagem?: string;
    temAcompanhante?: boolean;
    nomeAcompanhante?: string;
}

const MOCK_PACIENTES: Paciente[] = [
    { id: 1, nome: 'MARIA APARECIDA DA SILVA', cpf: '123.456.789-00', bairro: 'Centro' },
    { id: 2, nome: 'JOÃO DOS SANTOS SOUZA', cpf: '987.654.321-99', bairro: 'Urbis III' },
    { id: 3, nome: 'ANA CLARA ALMEIDA', cpf: '456.789.123-44', bairro: 'São Benedito' },
    { id: 4, nome: 'PEDRO OLIVEIRA', cpf: '111.222.333-44', bairro: 'Zona Rural' },
    { id: 5, nome: 'LUCIA SANTOS', cpf: '555.666.777-88', bairro: 'Centro' },
];

interface SelecaoPassageiroModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddPassengers: (passageiros: PassageiroSelecionado[]) => void;
}

export const SelecaoPassageiroModal: React.FC<SelecaoPassageiroModalProps> = ({
    isOpen,
    onClose,
    onAddPassengers
}) => {
    const [step, setStep] = useState<1 | 2>(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [configuracaoPassageiros, setConfiguracaoPassageiros] = useState<Record<number, PassageiroSelecionado>>({});

    if (!isOpen) return null;

    const filteredPacientes = MOCK_PACIENTES.filter(p =>
        p.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.cpf.includes(searchTerm)
    );

    const handleToggleSelect = (paciente: Paciente) => {
        setSelectedIds(prev => {
            const isSelected = prev.includes(paciente.id);
            if (isSelected) {
                const newIds = prev.filter(id => id !== paciente.id);
                // Remove da configuração também se desmarcar
                const newConfig = { ...configuracaoPassageiros };
                delete newConfig[paciente.id];
                setConfiguracaoPassageiros(newConfig);
                return newIds;
            } else {
                // Adiciona com valores padrão
                setConfiguracaoPassageiros(prevConfig => ({
                    ...prevConfig,
                    [paciente.id]: { ...paciente, destinoViagem: '', temAcompanhante: false, nomeAcompanhante: '' }
                }));
                return [...prev, paciente.id];
            }
        });
    };

    const handleUpdateConfig = (id: number, field: keyof PassageiroSelecionado, value: any) => {
        setConfiguracaoPassageiros(prev => ({
            ...prev,
            [id]: { ...prev[id], [field]: value }
        }));
    };

    const handleAvancar = () => {
        if (selectedIds.length === 0) return;
        setStep(2);
    };

    const handleVoltar = () => {
        setStep(1);
    };

    const handleFinalizar = () => {
        const passageirosFinais = selectedIds.map(id => configuracaoPassageiros[id]);
        onAddPassengers(passageirosFinais);

        // Reset e fechar
        setStep(1);
        setSelectedIds([]);
        setConfiguracaoPassageiros({});
        setSearchTerm('');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="bg-white border-b border-gray-100 p-4 flex justify-between items-center">
                    <div>
                        <h3 className="font-bold text-lg text-gray-800">
                            {step === 1 ? 'Selecionar Passageiros' : 'Organizar Viagem'}
                        </h3>
                        <p className="text-xs text-gray-500">
                            Passo {step} de 2
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Conteúdo dinâmico baseados no Step */}
                <div className="flex-1 overflow-y-auto bg-gray-50 p-4">

                    {step === 1 ? (
                        /* PASSO 1: SELEÇÃO */
                        <div className="space-y-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Buscar por nome ou CPF..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-red-500 bg-white shadow-sm"
                                    autoFocus
                                />
                            </div>

                            <div className="space-y-2">
                                {filteredPacientes.map((paciente) => {
                                    const isSelected = selectedIds.includes(paciente.id);
                                    return (
                                        <div
                                            key={paciente.id}
                                            onClick={() => handleToggleSelect(paciente)}
                                            className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all border ${isSelected ? 'bg-red-50 border-red-200 shadow-sm' : 'bg-white border-gray-100 hover:border-red-200'}`}
                                        >
                                            <div className="flex items-center">
                                                <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-3 transition-colors ${isSelected ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                                                    {isSelected ? <Check size={20} /> : <User size={20} />}
                                                </div>
                                                <div>
                                                    <h4 className={`font-bold text-sm ${isSelected ? 'text-red-700' : 'text-gray-800'}`}>{paciente.nome}</h4>
                                                    <p className="text-xs text-gray-500">
                                                        CPF: {paciente.cpf} • {paciente.bairro}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className={`w-5 h-5 rounded border flex items-center justify-center ${isSelected ? 'bg-red-500 border-red-500' : 'border-gray-300'}`}>
                                                {isSelected && <Check size={12} className="text-white" />}
                                            </div>
                                        </div>
                                    );
                                })}

                                {filteredPacientes.length === 0 && (
                                    <div className="text-center py-10 text-gray-400">
                                        <p>Nenhum paciente encontrado.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : ( /* PASSO 2: CONFIGURAÇÃO */
                        <div className="space-y-4">
                            <p className="text-sm text-gray-600 mb-4 bg-blue-50 text-blue-800 p-3 rounded-lg border border-blue-100 flex items-start">
                                <MapPin size={16} className="mr-2 mt-0.5 flex-shrink-0" />
                                Defina o destino específico e acompanhantes para cada passageiro selecionado.
                            </p>

                            {selectedIds.map(id => {
                                const config = configuracaoPassageiros[id];
                                if (!config) return null;

                                return (
                                    <div key={id} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-3">
                                        <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                                            <div className="flex items-center">
                                                <div className="h-8 w-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center mr-2 font-bold text-xs">
                                                    {config.nome.substring(0, 2)}
                                                </div>
                                                <span className="font-bold text-gray-800 text-sm">{config.nome}</span>
                                            </div>
                                        </div>

                                        {/* Destino */}
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Destino (Local Específico)</label>
                                            <div className="relative">
                                                <MapPin className="absolute left-3 top-2.5 text-gray-400" size={16} />
                                                <input
                                                    type="text"
                                                    placeholder="Ex: Hosp. Português, Clínica X..."
                                                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-red-500 outline-none"
                                                    value={config.destinoViagem || ''}
                                                    onChange={(e) => handleUpdateConfig(id, 'destinoViagem', e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        {/* Acompanhante Toggle */}
                                        <div className="flex items-center justify-between pt-1">
                                            <label className="flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    className="w-4 h-4 text-red-600 rounded border-gray-300 focus:ring-red-500"
                                                    checked={config.temAcompanhante || false}
                                                    onChange={(e) => handleUpdateConfig(id, 'temAcompanhante', e.target.checked)}
                                                />
                                                <span className="ml-2 text-sm text-gray-700 font-medium flex items-center">
                                                    <Users size={14} className="mr-1.5 text-gray-500" />
                                                    Levar Acompanhante?
                                                </span>
                                            </label>
                                        </div>

                                        {/* Nome do Acompanhante (Condicional) */}
                                        {config.temAcompanhante && (
                                            <div className="animate-in fade-in slide-in-from-top-2 duration-200 bg-gray-50 p-3 rounded-lg border border-gray-200 mt-2">
                                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nome do Acompanhante</label>
                                                <input
                                                    type="text"
                                                    placeholder="Nome completo do acompanhante"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-1 focus:ring-red-500 outline-none"
                                                    value={config.nomeAcompanhante || ''}
                                                    onChange={(e) => handleUpdateConfig(id, 'nomeAcompanhante', e.target.value)}
                                                    autoFocus
                                                />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                <div className="p-4 bg-white border-t border-gray-100 flex justify-between items-center">
                    {step === 1 ? (
                        <>
                            <div className="text-sm text-gray-500">
                                <b>{selectedIds.length}</b> selecionados
                            </div>
                            <button
                                onClick={handleAvancar}
                                disabled={selectedIds.length === 0}
                                className={`flex items-center px-6 py-3 rounded-xl font-bold transition-all ${selectedIds.length > 0 ? 'bg-red-600 text-white hover:bg-red-700 shadow-lg hover:shadow-xl' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                            >
                                Avançar
                                <ArrowRight size={18} className="ml-2" />
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={handleVoltar}
                                className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-xl font-medium transition-colors"
                            >
                                <ArrowLeft size={18} className="mr-2" />
                                Voltar
                            </button>
                            <button
                                onClick={handleFinalizar}
                                className="flex items-center px-6 py-3 bg-green-600 text-white hover:bg-green-700 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                            >
                                <Check size={18} className="mr-2" />
                                Finalizar e Adicionar
                            </button>
                        </>
                    )}
                </div>

            </div>
        </div>
    );
};
