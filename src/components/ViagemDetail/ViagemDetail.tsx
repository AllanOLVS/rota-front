import React, { useState } from 'react';
import { ChevronLeft, Edit3, Printer, Plus, AlertCircle, Map as MapIcon, Send } from 'lucide-react';
import type { Viagem, Passageiro } from '../../data/mockData';
import { PassageiroTable } from '../PassageiroTable';
import { SelecaoPassageiroModal } from '../SelecaoPassageiroModal';

interface ViagemDetailProps {
    viagem: Viagem;
    passageiros: Passageiro[];
    onBack: () => void;
}

export const ViagemDetail: React.FC<ViagemDetailProps> = ({
    viagem,
    passageiros,
    onBack,
}) => {


    const [passageirosLista, setPassageirosLista] = useState<Passageiro[]>(passageiros);
    const [showSelecaoModal, setShowSelecaoModal] = useState(false);

    const handlePrint = () => {
        window.print();
    };

    const handleAddPassageiro = () => {
        setShowSelecaoModal(true);
    };

    const handleAddPassageiros = (novosPassageiros: any[]) => {
        // Converter PassageiroSelecionado para o formato de Passageiro da VIAGEM
        const passageirosFormatados = novosPassageiros.map(p => ({
            id: p.id, // Em um cenário real, geraria um novo ID único para a relação
            nome: p.temAcompanhante
                ? `${p.nome} (Acomp: ${p.nomeAcompanhante})`
                : p.nome,
            rg: p.cpf,
            local: p.destinoViagem || 'Não informado',
            retorno: 'Ponto Central', // Default
            telefone: '99 99999-9999', // Default mock
            tipo: (p.temAcompanhante ? 'paciente' : 'paciente') as any // Forçando 'paciente' por enquanto para evitar erro de tipo
        }));

        setPassageirosLista(prev => [...prev, ...passageirosFormatados]);
        setShowSelecaoModal(false);
    };

    const handleSendConfirmation = () => {
        const confirmCount = passageirosLista.length;
        alert(`LINK DISPARADO!\n\nEnviamos um link de confirmação via WhatsApp para ${confirmCount} passageiros.\n\nLink: http://localhost:5173/confirmar-viagem?codigo=VIAGEM-${viagem.id}`);
    };

    return (
        <div className="fade-in print:w-full print:block">
            {/* Barra de Ações (Escondida na impressão) */}
            <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 print:hidden">
                <button
                    onClick={onBack}
                    className="flex items-center text-gray-500 hover:text-red-600 transition-colors font-medium"
                >
                    <ChevronLeft size={20} className="mr-1" /> Voltar para Lista
                </button>
                <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                    <button className="flex-1 sm:flex-none px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center justify-center shadow-sm text-sm">
                        <Edit3 size={16} className="mr-2" /> Editar Dados
                    </button>
                    <button
                        onClick={handlePrint}
                        className="flex-1 sm:flex-none px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 flex items-center justify-center shadow-sm text-sm"
                    >
                        <Printer size={16} className="mr-2" /> Imprimir
                    </button>
                    <button
                        onClick={handleSendConfirmation}
                        className="flex-1 sm:flex-none px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center shadow-sm text-sm"
                    >
                        <Send size={16} className="mr-2" /> Enviar Link
                    </button>
                    <button
                        onClick={handleAddPassageiro}
                        className="w-full sm:w-auto px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center justify-center shadow-sm text-sm"
                    >
                        <Plus size={16} className="mr-2" /> Add Passageiro
                    </button>
                </div>
            </div>

            {/* ÁREA DE IMPRESSÃO (A FOLHA DE PAPEL) */}
            <div className="bg-white shadow-lg print:shadow-none p-8 md:p-10 rounded-xl max-w-4xl mx-auto border border-gray-200 print:border-none print:p-0">

                {/* Cabeçalho do Relatório */}
                <div className="border-b-2 border-gray-800 pb-4 mb-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                        <div className="flex items-center">
                            <div className="h-16 w-16 bg-gray-100 rounded-lg mr-4 flex items-center justify-center text-gray-400 border border-gray-300 overflow-hidden">
                                <img
                                    src="/src/assets/brasao_mutuipe.jpg"
                                    alt="Brasão"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 uppercase">
                                    Prefeitura Municipal de Mutuípe
                                </h1>
                                <p className="text-sm text-gray-600 uppercase font-medium">
                                    Secretaria de Saúde - TFD
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    Controle de Viagens e Tratamento Fora de Domicílio
                                </p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="bg-gray-100 border border-gray-300 px-4 py-2 rounded-lg text-center print:border-black print:bg-transparent">
                                <p className="text-xs text-gray-500 uppercase">
                                    Data da Viagem
                                </p>
                                <p className="text-xl font-bold text-gray-900">
                                    {new Date(viagem.data).toLocaleDateString('pt-BR')}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Dados da Viagem */}
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 bg-gray-50 p-4 rounded-lg border border-gray-200 print:bg-transparent print:border-none print:p-0 print:mt-4">
                        <div>
                            <span className="text-xs text-gray-500 uppercase block font-bold">
                                Destino Principal
                            </span>
                            <div className="flex items-center gap-2">
                                <span className="text-lg font-medium text-gray-900">
                                    {viagem.destino}
                                </span>
                                <a
                                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(viagem.destino)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-1 text-gray-500 hover:text-red-600 transition-colors print:hidden"
                                    title="Abrir Navegação GPS"
                                >
                                    <MapIcon size={16} />
                                </a>
                            </div>
                        </div>
                        <div>
                            <span className="text-xs text-gray-500 uppercase block font-bold">
                                Horário de Saída
                            </span>
                            <span className="text-lg font-medium text-gray-900">
                                {viagem.saida}
                            </span>
                        </div>
                        <div>
                            <span className="text-xs text-gray-500 uppercase block font-bold">
                                Motorista Responsável
                            </span>
                            <span className="text-lg font-medium text-gray-900 flex items-center">
                                {viagem.motorista === 'Pendente' ? (
                                    <span className="text-red-500 flex items-center">
                                        <AlertCircle size={16} className="mr-1" /> Definir Motorista
                                    </span>
                                ) : (
                                    viagem.motorista
                                )}
                            </span>
                        </div>
                        <div>
                            <span className="text-xs text-gray-500 uppercase block font-bold">
                                Veículo / Placa
                            </span>
                            <span className="text-lg font-medium text-gray-900">
                                {viagem.veiculo}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Tabela de Passageiros */}
                <PassageiroTable
                    passageiros={passageirosLista}
                    capacidade={viagem.capacidade}
                />

                {/* Rodapé para Assinatura (Aparece na impressão) */}
                <div className="mt-16 pt-8 border-t border-gray-300 hidden print:flex justify-between">
                    <div className="text-center w-1/3">
                        <div className="border-t border-black w-full mb-2"></div>
                        <p className="text-sm font-bold">Responsável TFD</p>
                    </div>
                    <div className="text-center w-1/3">
                        <div className="border-t border-black w-full mb-2"></div>
                        <p className="text-sm font-bold">Motorista</p>
                    </div>
                </div>
            </div>

            <SelecaoPassageiroModal
                isOpen={showSelecaoModal}
                onClose={() => setShowSelecaoModal(false)}
                onAddPassengers={handleAddPassageiros}
            />



        </div>
    );
};
