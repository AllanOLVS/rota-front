import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    MapPin,
    Search,
    Plus,
    ArrowLeft,
    Building,
    Phone,
    Navigation,
    Filter
} from 'lucide-react';
import { DetalhesDestinoModal, type DestinoData } from '../../components/DetalhesDestinoModal';
import { CadastroDestinoModal, type DestinoFormData } from '../../components/CadastroDestinoModal';

// --- DADOS MOCKADOS ---
const MOCK_DESTINOS: DestinoData[] = [
    {
        id: 1,
        nomeLocal: 'Hospital Regional (HRSAJ)',
        cidade: 'Santo Antônio de Jesus',
        uf: 'BA',
        bairro: 'Centro',
        logradouro: 'Rua Cosme e Damião',
        numero: 'S/N',
        telefone: '(75) 3632-1000',
        referencia: 'Próximo à BR-101',
        observacoes: 'Entrada de ambulâncias pelos fundos.',
        cep: '44570-000'
    },
    {
        id: 2,
        nomeLocal: 'Hospital Geral do Estado (HGE)',
        cidade: 'Salvador',
        uf: 'BA',
        bairro: 'Brotas',
        logradouro: 'Av. Vasco da Gama',
        numero: 'S/N',
        telefone: '(71) 3357-9000',
        referencia: 'Ao lado do Hemoba',
        observacoes: 'Portaria 2 para pacientes eletivos.',
        cep: '40286-901'
    },
    {
        id: 3,
        nomeLocal: 'Clínica do Rim',
        cidade: 'Feira de Santana',
        uf: 'BA',
        bairro: 'Kalilândia',
        logradouro: 'Rua Barão de Cotegipe',
        numero: '123',
        telefone: '(75) 3221-5555',
        referencia: 'Em frente à praça',
        observacoes: '',
        cep: '44001-000'
    }
];

export const ListaDestinos: React.FC = () => {
    const navigate = useNavigate();
    const [destinos, setDestinos] = useState<DestinoData[]>(MOCK_DESTINOS);
    const [searchTerm, setSearchTerm] = useState('');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isCadastroModalOpen, setIsCadastroModalOpen] = useState(false);
    const [selectedDestino, setSelectedDestino] = useState<DestinoData | null>(null);

    // Filtragem
    const filteredDestinos = destinos.filter(d =>
        d.nomeLocal.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.cidade.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Botão "Novo Destino" - Abre modal de cadastro
    const handleNoveDestino = () => {
        setIsCadastroModalOpen(true);
    };

    // Salvar novo destino
    const handleSaveNovoDestino = (data: DestinoFormData) => {
        const novoDestino: DestinoData = {
            ...data,
            id: Date.now() // Gera ID temporário
        };
        setDestinos(prev => [...prev, novoDestino]);
        setIsCadastroModalOpen(false);
        alert(`Destino "${data.nomeLocal}" cadastrado com sucesso!`);
    };

    // Clique no Card - Abre o Modal de Detalhes/Edição
    const handleOpenDetalhes = (destino: DestinoData) => {
        setSelectedDestino(destino);
        setIsEditModalOpen(true);
    };

    const handleUpdateDestino = (updatedDestino: DestinoData) => {
        setDestinos(prev => prev.map(d => d.id === updatedDestino.id ? updatedDestino : d));
        setIsEditModalOpen(false);
    };

    const handleDeleteDestino = (id: number) => {
        setDestinos(prev => prev.filter(d => d.id !== id));
        setIsEditModalOpen(false);
    };

    const handleBack = () => {
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-800">

            {/* HEADER */}
            <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 sticky top-0 z-20 shadow-sm">
                <div className="flex items-center">
                    <button
                        onClick={handleBack}
                        className="mr-4 text-gray-500 hover:text-red-600 transition-colors p-2 rounded-full hover:bg-gray-100"
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <div className="flex items-center text-red-700 font-bold text-xl">
                        <MapPin className="mr-2" size={24} />
                        Gestão de Destinos
                    </div>
                </div>
                <div className="hidden sm:block text-sm text-gray-500">
                    Locais de Tratamento & Rotas
                </div>
            </header>

            <main className="p-6 md:p-8 max-w-7xl mx-auto w-full">

                {/* BARRA DE AÇÕES */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Locais Cadastrados</h2>
                        <p className="text-gray-500">Gerencie hospitais, clínicas e pontos de parada.</p>
                    </div>
                    <button
                        onClick={handleNoveDestino}
                        className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl font-bold shadow-lg flex items-center transition-all transform hover:-translate-y-0.5"
                    >
                        <Plus size={20} className="mr-2" />
                        Novo Destino
                    </button>
                </div>

                {/* FILTROS E PESQUISA */}
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-6 flex gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Buscar por nome do hospital ou cidade..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-red-500 transition-all"
                        />
                    </div>
                    <button className="px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 flex items-center transition-colors">
                        <Filter size={18} className="mr-2" />
                        <span className="hidden sm:inline">Filtros</span>
                    </button>
                </div>

                {/* GRID DE DESTINOS */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredDestinos.map((destino) => (
                        <div
                            key={destino.id}
                            onClick={() => handleOpenDetalhes(destino)}
                            className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md hover:border-red-200 cursor-pointer transition-all group relative overflow-hidden"
                        >
                            {/* Barra lateral decorativa */}
                            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gray-200 group-hover:bg-red-500 transition-colors"></div>

                            <div className="flex justify-between items-start mb-4 pl-3">
                                <div className="bg-red-50 p-3 rounded-xl text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
                                    <Building size={24} />
                                </div>
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider bg-gray-100 px-2 py-1 rounded">
                                    {destino.uf}
                                </span>
                            </div>

                            <div className="pl-3">
                                <h3 className="text-lg font-bold text-gray-800 mb-1 leading-tight group-hover:text-red-700 transition-colors">
                                    {destino.nomeLocal}
                                </h3>
                                <p className="text-sm font-medium text-gray-600 flex items-center mb-3">
                                    <MapPin size={14} className="mr-1 text-gray-400" />
                                    {destino.cidade}
                                </p>

                                <div className="space-y-2 mt-4 pt-4 border-t border-gray-100">
                                    <div className="flex items-center text-sm text-gray-500">
                                        <Phone size={14} className="mr-2" />
                                        {destino.telefone || 'Sem telefone'}
                                    </div>
                                    <div className="flex items-start text-sm text-gray-500">
                                        <Navigation size={14} className="mr-2 mt-0.5 flex-shrink-0" />
                                        <span className="truncate">{destino.logradouro}, {destino.numero}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredDestinos.length === 0 && (
                    <div className="text-center py-20">
                        <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                            <MapPin size={32} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-600">Nenhum destino encontrado</h3>
                        <p className="text-gray-400">Tente buscar por outro termo ou cadastre um novo local.</p>
                    </div>
                )}

            </main>

            {/* MODAL DE DETALHES/EDIÇÃO */}
            <DetalhesDestinoModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSave={handleUpdateDestino}
                onDelete={handleDeleteDestino}
                destinoToEdit={selectedDestino}
            />

            {/* MODAL DE CADASTRO */}
            <CadastroDestinoModal
                isOpen={isCadastroModalOpen}
                onClose={() => setIsCadastroModalOpen(false)}
                onSave={handleSaveNovoDestino}
            />

        </div>
    );
};

export default ListaDestinos;
