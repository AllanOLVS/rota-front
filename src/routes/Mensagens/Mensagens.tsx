import React, { useState, useEffect } from 'react';
import {
    MessageSquare,
    Mail,
    MailOpen,
    Clock,
    Search,
    Filter,
    X
} from 'lucide-react';
import { PageHeader } from '../../components';
import { MessageCard } from '../../components/MessageCard';
import { MessageDetailModal } from '../../components/MessageDetailModal';
import { MOCK_MENSAGENS, type Mensagem } from '../../data/messagesData';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ElementType;
    color: 'blue' | 'green' | 'amber' | 'purple';
}

const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-emerald-50 text-emerald-600',
    amber: 'bg-amber-50 text-amber-600',
    purple: 'bg-purple-50 text-purple-600'
};

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white rounded-xl border border-gray-100 p-4 sm:p-5 shadow-sm">
        <div className="flex items-center gap-3">
            <div className={`h-10 w-10 sm:h-12 sm:w-12 rounded-xl flex items-center justify-center ${colorClasses[color]}`}>
                <Icon size={20} className="sm:w-6 sm:h-6" />
            </div>
            <div>
                <p className="text-xs sm:text-sm text-gray-500">{title}</p>
                <p className="text-lg sm:text-2xl font-bold text-gray-900">{value}</p>
            </div>
        </div>
    </div>
);

export const Mensagens: React.FC = () => {
    const [mensagens, setMensagens] = useState<Mensagem[]>(MOCK_MENSAGENS);
    const [filteredMensagens, setFilteredMensagens] = useState<Mensagem[]>(MOCK_MENSAGENS);
    const [selectedMensagem, setSelectedMensagem] = useState<Mensagem | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Filtros
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<'todas' | 'nao-lidas' | 'lidas'>('todas');
    const [showFilters, setShowFilters] = useState(false);

    // Aplicar filtros
    useEffect(() => {
        let result = mensagens;

        // Filtro de busca
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            result = result.filter(m =>
                m.motoristaNome.toLowerCase().includes(term) ||
                m.assunto.toLowerCase().includes(term) ||
                m.conteudo.toLowerCase().includes(term)
            );
        }

        // Filtro de status
        if (statusFilter === 'nao-lidas') {
            result = result.filter(m => !m.lida);
        } else if (statusFilter === 'lidas') {
            result = result.filter(m => m.lida);
        }

        // Ordenar por data (mais recentes primeiro)
        result = [...result].sort((a, b) => {
            const dateA = new Date(`${a.dataEnvio}T${a.horaEnvio}`);
            const dateB = new Date(`${b.dataEnvio}T${b.horaEnvio}`);
            return dateB.getTime() - dateA.getTime();
        });

        setFilteredMensagens(result);
    }, [mensagens, searchTerm, statusFilter]);

    // Estatísticas
    const totalMensagens = mensagens.length;
    const naoLidas = mensagens.filter(m => !m.lida).length;
    const ultimaMensagem = mensagens.length > 0
        ? mensagens.sort((a, b) => new Date(`${b.dataEnvio}T${b.horaEnvio}`).getTime() - new Date(`${a.dataEnvio}T${a.horaEnvio}`).getTime())[0]
        : null;

    const handleOpenMessage = (mensagem: Mensagem) => {
        setSelectedMensagem(mensagem);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedMensagem(null);
    };

    const handleMarkAsRead = (id: number) => {
        setMensagens(prev => prev.map(m =>
            m.id === id ? { ...m, lida: true } : m
        ));
        if (selectedMensagem?.id === id) {
            setSelectedMensagem(prev => prev ? { ...prev, lida: true } : null);
        }
    };

    const clearFilters = () => {
        setSearchTerm('');
        setStatusFilter('todas');
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
            <PageHeader
                title="Central de Mensagens"
                icon={MessageSquare}
            />

            <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
                {/* Cards de Estatísticas */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    <StatCard
                        title="Total de Mensagens"
                        value={totalMensagens}
                        icon={MessageSquare}
                        color="blue"
                    />
                    <StatCard
                        title="Não Lidas"
                        value={naoLidas}
                        icon={Mail}
                        color="amber"
                    />
                    <StatCard
                        title="Última Mensagem"
                        value={ultimaMensagem ? `${ultimaMensagem.horaEnvio}` : '-'}
                        icon={Clock}
                        color="purple"
                    />
                </div>

                {/* Barra de Filtros */}
                <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                    <div className="flex flex-col sm:flex-row gap-3">
                        {/* Campo de Busca */}
                        <div className="flex-1 relative">
                            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Buscar por motorista, assunto ou conteúdo..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Botões de Filtro */}
                        <div className="flex gap-2">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className={`
                                    flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors
                                    ${showFilters
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }
                                `}
                            >
                                <Filter size={16} />
                                <span className="hidden sm:inline">Filtros</span>
                            </button>

                            {(searchTerm || statusFilter !== 'todas') && (
                                <button
                                    onClick={clearFilters}
                                    className="flex items-center gap-1 px-3 py-2.5 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
                                >
                                    <X size={16} />
                                    <span className="hidden sm:inline">Limpar</span>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Filtros Expandidos */}
                    {showFilters && (
                        <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-2">
                            <button
                                onClick={() => setStatusFilter('todas')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${statusFilter === 'todas'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                Todas
                            </button>
                            <button
                                onClick={() => setStatusFilter('nao-lidas')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${statusFilter === 'nao-lidas'
                                    ? 'bg-amber-500 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                <Mail size={14} className="inline mr-1" />
                                Não Lidas ({naoLidas})
                            </button>
                            <button
                                onClick={() => setStatusFilter('lidas')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${statusFilter === 'lidas'
                                    ? 'bg-green-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                <MailOpen size={14} className="inline mr-1" />
                                Lidas
                            </button>
                        </div>
                    )}
                </div>

                {/* Lista de Mensagens */}
                <div className="space-y-3">
                    {filteredMensagens.length > 0 ? (
                        filteredMensagens.map(mensagem => (
                            <MessageCard
                                key={mensagem.id}
                                mensagem={mensagem}
                                onClick={() => handleOpenMessage(mensagem)}
                            />
                        ))
                    ) : (
                        <div className="bg-white rounded-xl border border-gray-100 p-8 sm:p-12 text-center">
                            <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MessageSquare size={32} className="text-gray-400" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-700 mb-2">
                                Nenhuma mensagem encontrada
                            </h3>
                            <p className="text-sm text-gray-500">
                                {searchTerm || statusFilter !== 'todas'
                                    ? 'Tente ajustar os filtros de busca.'
                                    : 'Você não possui mensagens no momento.'
                                }
                            </p>
                        </div>
                    )}
                </div>
            </main>

            {/* Modal de Detalhes */}
            {selectedMensagem && (
                <MessageDetailModal
                    mensagem={selectedMensagem}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onMarkAsRead={handleMarkAsRead}
                />
            )}
        </div>
    );
};

export default Mensagens;
