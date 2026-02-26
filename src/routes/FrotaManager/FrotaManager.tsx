import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, User, Plus, Search, ArrowLeft, Truck } from 'lucide-react';
import { FrotaMenuButton } from '../../components/FrotaMenuButton';
import { VeiculosTable } from '../../components/VeiculosTable';
import { MotoristasTable } from '../../components/MotoristasTable';
import { MOCK_VEICULOS, MOCK_MOTORISTAS } from '../../data/frotaData';

type ViewState = 'menu' | 'lista_veiculos' | 'lista_motoristas';

export const FrotaManager: React.FC = () => {
    const navigate = useNavigate();
    const [currentView, setCurrentView] = useState<ViewState>('menu');

    // Função para voltar
    const handleBack = () => {
        if (currentView === 'menu') {
            navigate('/dashboard');
        } else {
            setCurrentView('menu');
        }
    };

    // Navegar para Cadastrar Motorista
    const handleCadastrarMotorista = () => {
        navigate('/cadastrar-motorista');
    };

    // Navegar para Cadastrar Veículo
    const handleCadastrarVeiculo = () => {
        navigate('/cadastrar-veiculo');
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-800">

            {/* HEADER GERAL */}
            <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 sticky top-0 z-20 shadow-sm">
                <div className="flex items-center">
                    <button
                        onClick={handleBack}
                        className="mr-4 text-gray-500 hover:text-red-600 transition-colors p-2 rounded-full hover:bg-gray-100"
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <div className="flex items-center text-red-700 font-bold text-xl">
                        <Truck className="mr-2" size={24} />
                        Gestão de Frota & Motoristas
                    </div>
                </div>
                <div className="hidden sm:block text-sm text-gray-500">
                    Setor de Transporte
                </div>
            </header>

            {/* CONTEÚDO DINÂMICO */}
            <main className="p-6 md:p-8 max-w-6xl mx-auto w-full">

                {/* VIEW 1: MENU PRINCIPAL (OS 4 BOTÕES) */}
                {currentView === 'menu' && (
                    <div className="fade-in">
                        <div className="mb-8 text-center md:text-left">
                            <h2 className="text-2xl font-bold text-gray-800">Painel Administrativo</h2>
                            <p className="text-gray-500">Gerencie os veículos da prefeitura e a equipe de motoristas.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                            {/* SEÇÃO VEÍCULOS */}
                            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col justify-between">
                                <div className="flex items-center mb-6 text-red-700">
                                    <div className="p-3 bg-red-50 rounded-lg mr-3">
                                        <Car size={32} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold">Veículos</h3>
                                        <p className="text-sm text-gray-500">Gestão da frota municipal</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <FrotaMenuButton
                                        label="Listar Veículos"
                                        icon={Search}
                                        onClick={() => setCurrentView('lista_veiculos')}
                                    />
                                    <FrotaMenuButton
                                        label="Cadastrar Veículo"
                                        icon={Plus}
                                        highlight
                                        onClick={handleCadastrarVeiculo}
                                    />
                                </div>
                            </div>

                            {/* SEÇÃO MOTORISTAS */}
                            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col justify-between">
                                <div className="flex items-center mb-6 text-gray-700">
                                    <div className="p-3 bg-gray-100 rounded-lg mr-3">
                                        <User size={32} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold">Motoristas</h3>
                                        <p className="text-sm text-gray-500">Equipe de condutores</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <FrotaMenuButton
                                        label="Listar Motoristas"
                                        icon={Search}
                                        onClick={() => setCurrentView('lista_motoristas')}
                                    />
                                    <FrotaMenuButton
                                        label="Cadastrar Motorista"
                                        icon={Plus}
                                        highlight
                                        onClick={handleCadastrarMotorista}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* VIEW 2: LISTAR VEÍCULOS */}
                {currentView === 'lista_veiculos' && (
                    <VeiculosTable
                        veiculos={MOCK_VEICULOS}
                        onCadastrar={handleCadastrarVeiculo}
                    />
                )}

                {/* VIEW 3: LISTAR MOTORISTAS */}
                {currentView === 'lista_motoristas' && (
                    <MotoristasTable
                        motoristas={MOCK_MOTORISTAS}
                        onCadastrar={handleCadastrarMotorista}
                    />
                )}

            </main>

            <style>{`
                .fade-in { animation: fadeIn 0.3s ease-in-out; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    );
};

export default FrotaManager;
