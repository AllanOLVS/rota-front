import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Bus,
    Users,
    LogOut,
    Phone,
    Navigation,
    Building,
    CheckCircle,
    Calendar,
    ArrowRight,
    Map as MapIcon,
    CheckSquare,
    Square,
    MoreVertical,
    RotateCcw,
    UserMinus,
    AlertCircle,
    X,
    FileText,
    Bell,
    BookOpen
} from 'lucide-react';
import { ViagensSemanaModal } from './ViagensSemanaModal';
import { LogbookModal } from './LogbookModal';

// --- DADOS MOCKADOS (Com novos campos) ---
const VIAGEM_HOJE = {
    id: 101,
    data: '28/01/2026',
    destino: 'Salvador',
    horario: '04:00',
    veiculo: 'Van Sprinter (Placa: ABC-1234)',
    totalPassageiros: 12,
    status: 'em_andamento'
};

interface Passageiro {
    id: number;
    nome: string;
    telefone: string;
    hospital: string;
    enderecoHospital: string;
    retorno: string;
    status: number;
    tipo?: 'acompanhante';
}

// Status: 0=Aguardando Ida, 1=Embarcou Ida, 2=Entregue Hospital, 3=Embarcou Volta, 4=Finalizado
const PASSAGEIROS_HOJE: Passageiro[] = [
    {
        id: 1,
        nome: 'Maria de Lourdes Santos',
        telefone: '(75) 99999-1111',
        hospital: 'Hosp. Português',
        enderecoHospital: 'Av. Princesa Isabel, 914 - Barra',
        retorno: 'Fojo',
        status: 0
    },
    {
        id: 2,
        nome: 'João Pedro (Acomp)',
        telefone: '(75) 99999-1111',
        hospital: 'Hosp. Português',
        enderecoHospital: 'Av. Princesa Isabel, 914 - Barra',
        retorno: 'Fojo',
        status: 0,
        tipo: 'acompanhante'
    },
    {
        id: 3,
        nome: 'Antônio Ferreira',
        telefone: '(75) 98888-2222',
        hospital: 'Clínica de Olhos',
        enderecoHospital: 'Rua Pedro Américo, 123 - Centro',
        retorno: 'Praça Principal',
        status: 1
    },
    {
        id: 4,
        nome: 'Josefa Almeida',
        telefone: '(75) 97777-3333',
        hospital: 'Hosp. Santa Izabel',
        enderecoHospital: 'Praça Conselheiro Almeida Couto, 500',
        retorno: 'Rua da Linha',
        status: 0
    },
    {
        id: 5,
        nome: 'Lucas Almeida (Neto)',
        telefone: '(75) 97777-3333',
        hospital: 'Hosp. Santa Izabel',
        enderecoHospital: 'Praça Conselheiro Almeida Couto, 500',
        retorno: 'Rua da Linha',
        status: 0,
        tipo: 'acompanhante'
    },
];

interface StatusConfig {
    label: string;
    color: string;
    text: string;
}

interface DashboardMotoristaProps {
    onRoleChange?: (role: 'admin' | 'staff' | 'motorista') => void;
}

export const DashboardMotorista: React.FC<DashboardMotoristaProps> = ({ onRoleChange }) => {
    const navigate = useNavigate();
    const [passageiros, setPassageiros] = useState<Passageiro[]>(PASSAGEIROS_HOJE);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [showSemanaModal, setShowSemanaModal] = useState(false);
    const [showLogbookModal, setShowLogbookModal] = useState(false);
    const [activeMenuId, setActiveMenuId] = useState<number | null>(null);

    // --- MOCK DRIVER TRACKING ---
    // Simula o envio de um sinal de "Lido/Visto" quando o motorista abre o dashboard
    React.useEffect(() => {
        console.log(`[RASTREAMENTO] Motorista visualizou o dashboard em ${new Date().toLocaleTimeString()}`);
        // Aqui seria uma chamada de API real: await api.post('/tracking/driver-view', { ... })
    }, []);

    const statusConfig: Record<number, StatusConfig> = {
        0: { label: 'Embarcou para Ida', color: 'bg-blue-600 hover:bg-blue-700', text: 'Aguardando Ida' },
        1: { label: 'Entregue no Hospital', color: 'bg-amber-500 hover:bg-amber-600', text: 'Em Trânsito (Ida)' },
        2: { label: 'Embarcou para Volta', color: 'bg-indigo-600 hover:bg-indigo-700', text: 'No Hospital' },
        3: { label: 'Entregue em Casa', color: 'bg-green-600 hover:bg-green-700', text: 'Em Trânsito (Volta)' },
        4: { label: 'Viagem Finalizada', color: 'bg-gray-300 cursor-not-allowed', text: 'Finalizado' }
    };

    const advanceStatus = (id: number) => {
        setPassageiros(prev => prev.map(p => {
            if (p.id === id && p.status < 4) {
                return { ...p, status: p.status + 1 };
            }
            return p;
        }));
    };

    const revertStatus = (id: number) => {
        setPassageiros(prev => prev.map(p => {
            if (p.id === id && p.status > 0) {
                return { ...p, status: p.status - 1 };
            }
            return p;
        }));
        setActiveMenuId(null);
    };

    const markAsIndependentReturn = (id: number) => {
        setPassageiros(prev => prev.map(p => {
            if (p.id === id) {
                // Avança direto para status 4 (Finalizado)
                return { ...p, status: 4 };
            }
            return p;
        }));
        setActiveMenuId(null);
    };

    const toggleSelection = (id: number) => {
        setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    const toggleSelectAll = () => {
        if (selectedIds.length === passageiros.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(passageiros.map(p => p.id));
        }
    };

    const handleBulkAdvance = () => {
        if (selectedIds.length === 0) return;

        setPassageiros(prev => prev.map(p => {
            if (selectedIds.includes(p.id) && p.status < 4) {
                return { ...p, status: p.status + 1 };
            }
            return p;
        }));
        setSelectedIds([]);
    };

    const handleVerSemana = () => {
        setShowSemanaModal(true);
    };

    const handleLogout = () => {
        navigate('/login');
    };

    const passageirosFinalizados = passageiros.filter(p => p.status === 4).length;

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-800 pb-24">

            {/* HEADER */}
            <header className="bg-red-700 text-white p-6 rounded-b-3xl shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-10 -mt-10"></div>

                <div className="flex justify-between items-start mb-6 relative z-10">
                    <div className="flex items-center">
                        <div className="bg-white/20 p-2 rounded-lg mr-3">
                            <Bus size={24} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold leading-tight">Olá, Motorista</h1>
                            <p className="text-red-100 text-xs">Boa viagem!</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => alert('Notificações de Manutenção:\n- Troca de óleo em 500km\n- Revisão programada para 15/02')}
                            className="bg-red-800/50 p-2 rounded-lg hover:bg-red-800 transition-colors relative"
                        >
                            <Bell size={20} />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full border border-red-900"></span>
                        </button>
                        <button
                            onClick={handleLogout}
                            className="bg-red-800/50 p-2 rounded-lg hover:bg-red-800 transition-colors"
                        >
                            <LogOut size={20} />
                        </button>
                    </div>
                </div>

                {/* Card da Viagem Principal */}
                <div className="bg-white text-gray-800 rounded-2xl p-5 shadow-sm relative z-10">
                    <div className="flex justify-between items-start mb-3">
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-bold tracking-wide">Viagem de Hoje</p>
                            <div className="flex items-center gap-2">
                                <h2 className="text-xl font-bold text-red-700">{VIAGEM_HOJE.destino}</h2>
                                <a
                                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(VIAGEM_HOJE.destino)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-1.5 bg-red-100 text-red-700 rounded-full hover:bg-red-200 transition-colors"
                                    title="Abrir Navegação GPS"
                                >
                                    <MapIcon size={16} />
                                </a>
                            </div>
                        </div>
                        <div className="bg-red-50 text-red-700 font-bold px-3 py-1 rounded-lg text-sm">
                            {VIAGEM_HOJE.horario}
                        </div>
                    </div>

                    <div className="flex items-center text-sm text-gray-600 mb-2 gap-4">
                        <div className="flex items-center">
                            <Bus size={16} className="mr-2 text-gray-400" />
                            {VIAGEM_HOJE.veiculo}
                        </div>
                        <a
                            href="#"
                            onClick={(e) => { e.preventDefault(); alert('Abrindo documento do veículo (PDF)...'); }}
                            className="flex items-center text-red-600 text-xs font-bold hover:underline"
                        >
                            <FileText size={14} className="mr-1" />
                            Documento
                        </a>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
                        <div className="flex items-center text-sm font-medium">
                            <CheckCircle size={16} className="mr-2 text-green-500" />
                            {passageirosFinalizados} / {passageiros.length} Finalizados
                        </div>
                        <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-green-500 transition-all duration-500"
                                style={{ width: `${(passageirosFinalizados / passageiros.length) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </header>

            {/* CONTEÚDO PRINCIPAL: LISTA DE PASSAGEIROS */}
            <main className="p-5 max-w-lg mx-auto space-y-4">

                <div className="flex justify-between items-center">
                    <h3 className="font-bold text-gray-800 flex items-center">
                        <Users size={18} className="mr-2 text-red-600" />
                        Lista de Passageiros
                    </h3>
                    <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full font-medium">
                        {VIAGEM_HOJE.data}
                    </span>
                </div>

                {/* CONTROLES DE SELEÇÃO */}
                <div className="flex justify-between items-center bg-gray-100 p-2 rounded-lg">
                    <button
                        onClick={toggleSelectAll}
                        className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900"
                    >
                        {selectedIds.length === passageiros.length && passageiros.length > 0 ? (
                            <CheckSquare size={20} className="mr-2 text-red-600" />
                        ) : (
                            <Square size={20} className="mr-2 text-gray-400" />
                        )}
                        {selectedIds.length === passageiros.length ? 'Desmarcar Todos' : 'Selecionar Todos'}
                    </button>
                    {selectedIds.length > 0 && (
                        <span className="text-sm font-bold text-red-600">
                            {selectedIds.length} selecionado(s)
                        </span>
                    )}
                </div>

                {passageiros.map((p) => {
                    const currentConfig = statusConfig[p.status];

                    return (
                        <div
                            className={`bg-white rounded-xl shadow-sm border border-gray-200 transition-all ${p.status === 4 ? 'opacity-70 bg-gray-50' : ''}`}
                        >
                            {/* Cabeçalho do Card */}
                            <div className="p-4 pb-2 border-b border-gray-100 flex justify-between items-start first:rounded-t-xl">
                                <div className="flex items-start">
                                    <button
                                        onClick={() => toggleSelection(p.id)}
                                        className="mt-1 mr-3 text-gray-400 hover:text-red-500 transition-colors"
                                    >
                                        {selectedIds.includes(p.id) ? (
                                            <CheckSquare size={24} className="text-red-600" />
                                        ) : (
                                            <Square size={24} />
                                        )}
                                    </button>
                                    <div>
                                        <div className="flex items-center mb-1">
                                            {p.tipo === 'acompanhante' && (
                                                <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-1.5 py-0.5 rounded mr-2 uppercase tracking-wide">
                                                    Acomp
                                                </span>
                                            )}
                                            <h4 className="font-bold text-gray-800 text-lg leading-tight">
                                                {p.nome}
                                            </h4>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-500">
                                            <Phone size={14} className="mr-1.5" />
                                            {p.telefone}
                                        </div>
                                    </div>
                                </div>
                                {/* Indicador de Status Atual (Badge) */}
                                <div className={`text-[10px] uppercase font-bold px-2 py-1 rounded border ${p.status === 4 ? 'bg-green-100 text-green-700 border-green-200' : 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                                    {currentConfig.text}
                                </div>
                            </div>

                            <div className="p-4 pt-3 space-y-2 bg-white relative">
                                {/* Menu de Ações Extras */}
                                <div className="absolute top-0 right-2">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setActiveMenuId(activeMenuId === p.id ? null : p.id);
                                        }}
                                        className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                                    >
                                        <MoreVertical size={20} />
                                    </button>

                                    {/* Dropdown Menu */}
                                    {activeMenuId === p.id && (
                                        <div className="absolute right-0 top-8 w-56 bg-white rounded-xl shadow-xl border border-gray-100 z-20 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                                            <div className="py-1">
                                                <div className="px-4 py-2 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
                                                    <span className="text-xs font-bold text-gray-500 uppercase">Opções</span>
                                                    <button onClick={() => setActiveMenuId(null)}><X size={14} className="text-gray-400" /></button>
                                                </div>

                                                <button
                                                    onClick={() => revertStatus(p.id)}
                                                    disabled={p.status === 0}
                                                    className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                                                >
                                                    <RotateCcw size={16} className="mr-2 text-blue-600" />
                                                    Corrigir Status Anterior
                                                </button>

                                                <button
                                                    onClick={() => markAsIndependentReturn(p.id)}
                                                    disabled={p.status === 4}
                                                    className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                                                >
                                                    <UserMinus size={16} className="mr-2 text-orange-600" />
                                                    Retornou por conta própria
                                                </button>

                                                <button
                                                    className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 flex items-center border-t border-gray-100"
                                                >
                                                    <AlertCircle size={16} className="mr-2" />
                                                    Reportar Problema
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-start pr-8">
                                    <Building size={16} className="text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm font-bold text-gray-700">{p.hospital}</p>
                                        <p className="text-xs text-gray-500 leading-tight">{p.enderecoHospital}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <Navigation size={16} className="text-blue-500 mr-2 flex-shrink-0" />
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium text-gray-500 text-xs uppercase mr-1">Retorno:</span>
                                        {p.retorno}
                                    </p>
                                </div>
                            </div>

                            {/* Botão de Ação Sequencial */}
                            <button
                                onClick={() => advanceStatus(p.id)}
                                disabled={p.status === 4}
                                className={`w-full py-3 text-sm font-bold text-white flex items-center justify-center transition-colors rounded-b-xl ${currentConfig.color}`}
                            >
                                {p.status === 4 ? (
                                    <span className="flex items-center"><CheckCircle size={16} className="mr-2" /> Atendimento Concluído</span>
                                ) : (
                                    <span className="flex items-center">
                                        {currentConfig.label}
                                        <ArrowRight size={16} className="ml-2" />
                                    </span>
                                )}
                            </button>
                        </div>
                    );
                })}

                {passageiros.length === 0 && (
                    <div className="text-center py-10 text-gray-400">
                        <p>Nenhum passageiro na lista de hoje.</p>
                    </div>
                )}

            </main>

            {/* RODAPÉ FIXO */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-20">
                <div className="max-w-lg mx-auto">
                    <button
                        onClick={handleVerSemana}
                        className="w-full bg-gray-900 hover:bg-black text-white font-bold py-3.5 px-6 rounded-xl shadow-lg flex items-center justify-center transition-transform active:scale-95"
                    >
                        <Calendar size={20} className="mr-2" />
                        Viagens da Semana
                    </button>
                    <button
                        onClick={() => setShowLogbookModal(true)}
                        className="w-full mt-3 bg-white text-gray-800 border border-gray-300 font-bold py-3.5 px-6 rounded-xl shadow-sm flex items-center justify-center transition-transform active:scale-95 hover:bg-gray-50"
                    >
                        <BookOpen size={20} className="mr-2 text-red-600" />
                        Diário de Bordo
                    </button>
                </div>
            </div>

            {/* Modal de Viagens da Semana */}
            <ViagensSemanaModal
                isOpen={showSemanaModal}
                onClose={() => setShowSemanaModal(false)}
            />

            {/* Modal de Diário de Bordo */}
            <LogbookModal
                isOpen={showLogbookModal}
                onClose={() => setShowLogbookModal(false)}
            />

            {/* BARRA DE AÇÃO FLUTUANTE BULK */}
            {
                selectedIds.length > 0 && (
                    <div className="fixed bottom-20 left-4 right-4 z-30 animate-in slide-in-from-bottom-5">
                        <div className="bg-gray-900 text-white rounded-xl shadow-2xl p-4 flex justify-between items-center max-w-lg mx-auto">
                            <div className="flex items-center">
                                <span className="bg-white text-gray-900 font-bold w-8 h-8 rounded-full flex items-center justify-center mr-3">
                                    {selectedIds.length}
                                </span>
                                <span className="font-medium text-sm">Passageiros Selecionados</span>
                            </div>
                            <button
                                onClick={handleBulkAdvance}
                                className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors flex items-center"
                            >
                                Avançar Status
                                <ArrowRight size={16} className="ml-2" />
                            </button>
                        </div>
                    </div>
                )
            }

        </div>
    );
};

export default DashboardMotorista;
