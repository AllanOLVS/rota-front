import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Settings,
    Building,
    Printer,
    Users,
    Database,
    Save,
    ChevronLeft,
    Bell,
    Lock,
    Mail,
    Shield,
    CheckCircle
} from 'lucide-react';
import { CadastroUsuarioModal, type UserFormData } from '../../components/CadastroUsuarioModal';

export const Configuracoes: React.FC = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('geral');
    const [loading, setLoading] = useState(false);

    // Estados do Formulário Geral
    const [config, setConfig] = useState({
        nomePrefeitura: 'Prefeitura Municipal de Mutuípe',
        secretaria: 'Secretaria Municipal de Saúde',
        cidadeBase: 'Mutuípe - BA',
        emailContato: 'tfd@exemplo.ba.gov.br',
        cabecalhoRelatorio: 'Transporte Sanitário / TFD',
        exibirCpfRelatorio: false,
        exibirRodapeAssinatura: true,
        antecedenciaAgendamento: '24',
        notificarMotorista: true,
        notificarPacienteWhatsapp: false
    });

    // --- ESTADOS PARA GESTÃO DE USUÁRIOS ---
    const [showUserModal, setShowUserModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<UserFormData | null>(null);
    const [userList, setUserList] = useState([
        {
            id: 1,
            name: 'Ana Silva',
            email: 'ana.transportes@pref.gov.br',
            role: 'Gerente',
            status: 'Ativo',
            cpf: '123.456.789-00',
            rg: '12.345.678-90',
            birthDate: '1985-05-20'
        },
        {
            id: 2,
            name: 'João Santos',
            email: 'joao.atendimento@pref.gov.br',
            role: 'Atendente',
            status: 'Ativo',
            cpf: '987.654.321-11',
            rg: '98.765.432-10',
            birthDate: '1992-10-15'
        },
        {
            id: 3,
            name: 'Marcos Oliveira',
            email: 'marcos.ti@pref.gov.br',
            role: 'Admin',
            status: 'Inativo',
            cpf: '000.111.222-33',
            rg: '00.111.222-33',
            birthDate: '1988-03-30'
        },
    ]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setConfig(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSave = () => {
        setLoading(true);
        setTimeout(() => {
            alert("Configurações salvas com sucesso!");
            setLoading(false);
        }, 1500);
    };

    const handleBack = () => {
        navigate('/dashboard');
    };

    // --- FUNÇÕES DE GESTÃO DE USUÁRIOS ---

    const handleOpenUserModal = (user: typeof userList[0] | null = null) => {
        if (user) {
            // Clona para edição
            setSelectedUser({ ...user, password: '', confirmPassword: '' });
        } else {
            // Novo usuário
            setSelectedUser(null);
        }
        setShowUserModal(true);
    };

    const handleCloseUserModal = () => {
        setShowUserModal(false);
        setSelectedUser(null);
    };

    const handleSaveUser = (formData: UserFormData) => {
        if (formData.id) {
            // Atualizar existente
            const { password, confirmPassword, ...userToSave } = formData;
            setUserList(prev => prev.map(u => u.id === formData.id ? userToSave as typeof u : u));
        } else {
            // Criar novo (simulando ID)
            const { password, confirmPassword, ...userToSave } = formData;
            setUserList(prev => [...prev, { ...userToSave, id: Date.now() } as typeof prev[0]]);
        }
        handleCloseUserModal();
    };

    const handleDeleteUser = (formData: UserFormData) => {
        setUserList(prev => prev.filter(u => u.id !== formData.id));
        handleCloseUserModal();
    };

    // Componente de Item do Menu Lateral
    const TabButton = ({ id, label, icon: Icon, description }: {
        id: string;
        label: string;
        icon: React.FC<{ size?: number }>;
        description: string;
    }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`w-full flex items-center p-4 rounded-xl border transition-all duration-200 text-left mb-3 group
        ${activeTab === id
                    ? 'bg-red-50 border-red-200 shadow-sm'
                    : 'bg-white border-transparent hover:bg-gray-50'
                }`}
        >
            <div className={`p-2 rounded-lg mr-4 ${activeTab === id ? 'bg-white text-red-600 shadow-sm' : 'bg-gray-100 text-gray-500 group-hover:bg-white'}`}>
                <Icon size={20} />
            </div>
            <div>
                <span className={`block font-bold text-sm ${activeTab === id ? 'text-red-700' : 'text-gray-700'}`}>
                    {label}
                </span>
                <span className="text-xs text-gray-400 font-medium">{description}</span>
            </div>
        </button>
    );

    return (
        <div className="min-h-screen bg-gray-50 p-6 font-sans text-gray-800 flex justify-center relative">

            {/* MODAL DE CADASTRO/EDIÇÃO DE USUÁRIO */}
            <CadastroUsuarioModal
                isOpen={showUserModal}
                onClose={handleCloseUserModal}
                onSave={handleSaveUser}
                onDelete={handleDeleteUser}
                userToEdit={selectedUser}
            />



            <div className="w-full max-w-6xl fade-in">

                {/* CABEÇALHO */}
                <div className="mb-8 flex items-center justify-between">
                    <div className="flex items-center">
                        <button
                            onClick={handleBack}
                            className="mr-4 text-gray-500 hover:text-red-600 transition-colors p-2 rounded-full hover:bg-gray-200"
                            title="Voltar"
                        >
                            <ChevronLeft size={28} />
                        </button>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                                <Settings className="mr-2 text-red-600" /> Configurações do Sistema
                            </h2>
                            <p className="text-sm text-gray-500">Personalize o comportamento e dados da aplicação.</p>
                        </div>
                    </div>

                    {/* Botão de Salvar Global */}
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="px-6 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-black font-medium shadow-lg transition-all flex items-center disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Salvando...' : (
                            <>
                                <Save size={18} className="mr-2" />
                                Salvar Alterações
                            </>
                        )}
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                    {/* MENU LATERAL (ABAS) */}
                    <div className="lg:col-span-1">
                        <nav>
                            <TabButton id="geral" label="Identidade" icon={Building} description="Dados da Prefeitura" />
                            <TabButton id="impressao" label="Impressão & Relatórios" icon={Printer} description="Layout do Manifesto" />
                            <TabButton id="usuarios" label="Controle de Acesso" icon={Users} description="Gestão de Usuários" />
                        </nav>
                    </div>

                    {/* ÁREA DE CONTEÚDO */}
                    <div className="lg:col-span-3">

                        {/* ABA: GERAL */}
                        {activeTab === 'geral' && (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 fade-in">
                                <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center border-b pb-4">
                                    <Building className="mr-2 text-gray-400" /> Identidade Visual e Dados
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Entidade (Prefeitura) *</label>
                                        <input
                                            type="text"
                                            name="nomePrefeitura"
                                            value={config.nomePrefeitura}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none"
                                        />
                                        <p className="text-xs text-gray-400 mt-1">Este nome aparecerá no topo de todas as telas e relatórios.</p>
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Secretaria / Departamento</label>
                                        <input
                                            type="text"
                                            name="secretaria"
                                            value={config.secretaria}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Cidade Base</label>
                                        <input
                                            type="text"
                                            name="cidadeBase"
                                            value={config.cidadeBase}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email de Contato / Suporte</label>
                                        <div className="relative">
                                            <Mail size={18} className="absolute left-3 top-3 text-gray-400" />
                                            <input
                                                type="email"
                                                name="emailContato"
                                                value={config.emailContato}
                                                onChange={handleInputChange}
                                                className="w-full border border-gray-300 rounded-lg p-2.5 pl-10 focus:ring-2 focus:ring-red-500 outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ABA: IMPRESSÃO */}
                        {activeTab === 'impressao' && (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 fade-in">
                                <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center border-b pb-4">
                                    <Printer className="mr-2 text-gray-400" /> Configuração de Manifestos (PDF)
                                </h3>

                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Título do Manifesto de Viagem</label>
                                        <input
                                            type="text"
                                            name="cabecalhoRelatorio"
                                            value={config.cabecalhoRelatorio}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none"
                                        />
                                        <p className="text-xs text-gray-400 mt-1">Ex: "Lista de Passageiros - TFD", "Controle de Viagem"</p>
                                    </div>

                                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50">
                                        <div>
                                            <span className="font-bold text-sm text-gray-800 block">Ocultar CPF Parcialmente</span>
                                            <span className="text-xs text-gray-500">Nos relatórios impressos, exibir apenas os primeiros dígitos do CPF por segurança (LGPD).</span>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                name="exibirCpfRelatorio"
                                                checked={config.exibirCpfRelatorio}
                                                onChange={handleInputChange}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                                        </label>
                                    </div>

                                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50">
                                        <div>
                                            <span className="font-bold text-sm text-gray-800 block">Rodapé para Assinatura</span>
                                            <span className="text-xs text-gray-500">Incluir campos de assinatura do Motorista e Responsável no final da página.</span>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                name="exibirRodapeAssinatura"
                                                checked={config.exibirRodapeAssinatura}
                                                onChange={handleInputChange}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ABA: USUÁRIOS (AGORA COM MODAL) */}
                        {activeTab === 'usuarios' && (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 fade-in">
                                <div className="flex justify-between items-center mb-6 border-b pb-4">
                                    <h3 className="text-lg font-bold text-gray-800 flex items-center">
                                        <Users className="mr-2 text-gray-400" /> Gestão de Acesso
                                    </h3>
                                    <button
                                        onClick={() => handleOpenUserModal(null)}
                                        className="text-sm bg-red-100 text-red-700 px-3 py-1.5 rounded-lg font-bold hover:bg-red-200 transition-colors shadow-sm flex items-center"
                                    >
                                        <Users size={16} className="mr-1" /> + Novo Usuário
                                    </button>
                                </div>

                                <div className="overflow-hidden border border-gray-200 rounded-xl">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Nome</th>
                                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Email</th>
                                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Perfil</th>
                                                <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {userList.map((u) => (
                                                <tr
                                                    key={u.id}
                                                    onClick={() => handleOpenUserModal(u)}
                                                    className="hover:bg-red-50 cursor-pointer transition-colors group"
                                                    title="Clique para editar"
                                                >
                                                    <td className="px-6 py-4 text-sm font-medium text-gray-900 group-hover:text-red-700">{u.name}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-500">{u.email}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-500">
                                                        <span className={`px-2 py-1 rounded text-xs font-bold ${u.role === 'Admin' ? 'bg-purple-100 text-purple-700' :
                                                            u.role === 'Gerente' ? 'bg-blue-100 text-blue-700' :
                                                                'bg-gray-100 text-gray-700'
                                                            }`}>
                                                            {u.role}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-right text-sm">
                                                        <span className={`font-bold text-xs px-2 py-1 rounded-full border flex items-center justify-end w-fit ml-auto ${u.status === 'Ativo'
                                                            ? 'bg-green-50 text-green-700 border-green-100'
                                                            : 'bg-red-50 text-red-700 border-red-100'
                                                            }`}>
                                                            {u.status === 'Ativo' ? <CheckCircle size={10} className="mr-1" /> : <Lock size={10} className="mr-1" />}
                                                            {u.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    {userList.length === 0 && (
                                        <div className="p-8 text-center text-gray-500">
                                            Nenhum usuário cadastrado.
                                        </div>
                                    )}
                                </div>
                                <p className="text-xs text-gray-400 mt-4 text-center flex items-center justify-center">
                                    <span className="bg-gray-100 p-1 rounded mr-2">Dica</span>
                                    Clique em um usuário na tabela para editar ou excluir.
                                </p>
                            </div>
                        )}

                    </div>
                </div>
            </div>

            <style>{`
        .fade-in { animation: fadeIn 0.3s ease-in-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #ccc; border-radius: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #aaa; }
      `}</style>
        </div>
    );
};

export default Configuracoes;
