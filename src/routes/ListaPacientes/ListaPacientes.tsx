import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    User,
    Search,
    Plus,
    ArrowLeft,
    Phone,
    MapPin,
    FileText,
    Filter,
    MoreVertical
} from 'lucide-react';

// Dados Mockados para Exemplo (depois virá do Backend Java)
interface Paciente {
    id: number;
    nome: string;
    cpf: string;
    cns: string;
    telefone: string;
    bairro: string;
    cidade: string;
    tipo: 'Cronico' | 'Eletivo';
}

const MOCK_PACIENTES: Paciente[] = [
    {
        id: 1,
        nome: 'MARIA APARECIDA DA SILVA',
        cpf: '123.456.789-00',
        cns: '700000000000001',
        telefone: '(75) 99999-0001',
        bairro: 'Centro',
        cidade: 'Santo Antônio de Jesus',
        tipo: 'Cronico'
    },
    {
        id: 2,
        nome: 'JOÃO DOS SANTOS SOUZA',
        cpf: '987.654.321-99',
        cns: '700000000000002',
        telefone: '(75) 98888-0002',
        bairro: 'Urbis III',
        cidade: 'Santo Antônio de Jesus',
        tipo: 'Eletivo'
    },
    {
        id: 3,
        nome: 'ANA CLARA ALMEIDA',
        cpf: '456.789.123-44',
        cns: '700000000000003',
        telefone: '(75) 97777-0003',
        bairro: 'São Benedito',
        cidade: 'Santo Antônio de Jesus',
        tipo: 'Eletivo'
    }
];

export const ListaPacientes: React.FC = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [pacientes] = useState<Paciente[]>(MOCK_PACIENTES);

    const filteredPacientes = pacientes.filter(p =>
        p.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.cpf.includes(searchTerm) ||
        p.cns.includes(searchTerm)
    );

    const handleNovoPaciente = () => {
        navigate('/cadastrar-paciente');
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
                        <User className="mr-2" size={24} />
                        Gestão de Pacientes
                    </div>
                </div>
                <div className="hidden sm:block text-sm text-gray-500">
                    Total: {filteredPacientes.length} Registros
                </div>
            </header>

            <main className="p-6 md:p-8 max-w-7xl mx-auto w-full">

                {/* BARRA DE AÇÕES */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Catálogo de Pacientes</h2>
                        <p className="text-gray-500">Consulte, edite e gerencie o histórico dos cidadãos.</p>
                    </div>
                    <button
                        onClick={handleNovoPaciente}
                        className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl font-bold shadow-lg flex items-center transition-all transform hover:-translate-y-0.5"
                    >
                        <Plus size={20} className="mr-2" />
                        Novo Paciente
                    </button>
                </div>

                {/* FILTROS E PESQUISA */}
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-6 flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Buscar por Nome, CPF ou Cartão SUS..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-red-500 transition-all uppercase"
                        />
                    </div>
                    <button className="px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 flex items-center justify-center transition-colors">
                        <Filter size={18} className="mr-2" />
                        <span>Filtros Avançados</span>
                    </button>
                </div>

                {/* LISTA DE CARDS - LAYOUT RESPONSIVO */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPacientes.map((paciente) => (
                        <div
                            key={paciente.id}
                            className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md hover:border-red-200 transition-all group relative overflow-hidden"
                        >
                            {/* Actions Menu (Placeholder) */}
                            <button className="absolute top-4 right-4 text-gray-300 hover:text-gray-600">
                                <MoreVertical size={20} />
                            </button>

                            <div className="flex items-center mb-4">
                                <div className="h-12 w-12 rounded-full bg-red-50 flex items-center justify-center text-red-600 font-bold text-lg mr-4 border border-red-100 group-hover:bg-red-600 group-hover:text-white transition-colors">
                                    {paciente.nome.substring(0, 1)}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800 line-clamp-1">{paciente.nome}</h3>
                                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${paciente.tipo === 'Cronico'
                                            ? 'bg-purple-100 text-purple-700'
                                            : 'bg-blue-100 text-blue-700'
                                        }`}>
                                        {paciente.tipo}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-3 text-sm text-gray-600">
                                <div className="flex items-center">
                                    <FileText size={16} className="mr-2 text-gray-400" />
                                    <span className="font-mono">{paciente.cpf}</span>
                                </div>
                                <div className="flex items-center">
                                    <MapPin size={16} className="mr-2 text-gray-400" />
                                    <span className="truncate">{paciente.bairro}, {paciente.cidade}</span>
                                </div>
                                <div className="flex items-center">
                                    <Phone size={16} className="mr-2 text-gray-400" />
                                    <span>{paciente.telefone}</span>
                                </div>
                            </div>

                            <div className="mt-5 pt-4 border-t border-gray-100 flex gap-2">
                                <button className="flex-1 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 font-medium text-xs transition-colors">
                                    Histórico
                                </button>
                                <button className="flex-1 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 font-medium text-xs transition-colors">
                                    Editar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredPacientes.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 border-dashed">
                        <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                            <Search size={32} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-600">Nenhum paciente encontrado</h3>
                        <p className="text-gray-400 mb-6">Não encontramos registros com o termo "{searchTerm}".</p>
                        <button
                            onClick={() => setSearchTerm('')}
                            className="text-red-600 font-medium hover:underline"
                        >
                            Limpar filtros
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
};

export default ListaPacientes;
