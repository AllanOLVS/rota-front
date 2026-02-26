import React, { useState, useEffect } from 'react';
import {
    X,
    User,
    Shield,
    Key,
    Eye,
    EyeOff,
    Save,
    Trash2
} from 'lucide-react';

export interface UserFormData {
    id: number | null;
    name: string;
    email: string;
    role: string;
    status: string;
    cpf: string;
    rg: string;
    birthDate: string;
    password: string;
    confirmPassword: string;
}

interface CadastroUsuarioModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: UserFormData) => void;
    onDelete?: (data: UserFormData) => void;
    userToEdit?: UserFormData | null;
}

export const CadastroUsuarioModal: React.FC<CadastroUsuarioModalProps> = ({
    isOpen,
    onClose,
    onSave,
    onDelete,
    userToEdit = null
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState<UserFormData>({
        id: null,
        name: '',
        email: '',
        role: 'Atendente',
        status: 'Ativo',
        cpf: '',
        rg: '',
        birthDate: '',
        password: '',
        confirmPassword: ''
    });

    // Atualiza o formulário quando abre ou quando o usuário para edição muda
    useEffect(() => {
        if (isOpen) {
            if (userToEdit) {
                // Modo Edição: Carrega dados e limpa campos de senha
                setFormData({
                    ...userToEdit,
                    password: '',
                    confirmPassword: ''
                });
            } else {
                // Modo Novo Cadastro: Limpa tudo
                setFormData({
                    id: null,
                    name: '',
                    email: '',
                    role: 'Atendente',
                    status: 'Ativo',
                    cpf: '',
                    rg: '',
                    birthDate: '',
                    password: '',
                    confirmPassword: ''
                });
            }
            setShowPassword(false);
        }
    }, [isOpen, userToEdit]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validação básica de senha para novos usuários
        if (!formData.id && formData.password !== formData.confirmPassword) {
            alert("As senhas não conferem!");
            return;
        }

        // Envia os dados para o componente pai
        onSave(formData);
    };

    const handleDelete = () => {
        if (onDelete && formData.id) {
            if (window.confirm(`Tem certeza que deseja excluir o usuário ${formData.name}?`)) {
                onDelete(formData);
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 fade-in">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all scale-100 flex flex-col max-h-[90vh]">

                {/* Cabeçalho do Modal */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center flex-shrink-0">
                    <h3 className="font-bold text-gray-800 flex items-center">
                        <User className="mr-2 text-red-600" size={20} />
                        {formData.id ? 'Editar Dados do Usuário' : 'Cadastrar Novo Usuário'}
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-red-600 transition-colors rounded-full p-1 hover:bg-gray-100"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Corpo do Formulário (Com Scroll) */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto custom-scrollbar">

                    {/* 1. Dados Pessoais */}
                    <div className="space-y-4">
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider border-b pb-2 mb-4 flex items-center">
                            <User size={14} className="mr-1" /> Informações Pessoais
                        </h4>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo *</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none uppercase"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">CPF</label>
                                <input
                                    type="text"
                                    name="cpf"
                                    value={formData.cpf}
                                    onChange={handleChange}
                                    placeholder="000.000.000-00"
                                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">RG</label>
                                <input
                                    type="text"
                                    name="rg"
                                    value={formData.rg}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Data de Nascimento</label>
                            <input
                                type="date"
                                name="birthDate"
                                value={formData.birthDate}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none text-gray-600"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Institucional *</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none"
                                required
                            />
                        </div>
                    </div>

                    {/* 2. Segurança e Acesso */}
                    <div className="space-y-4 pt-2">
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider border-b pb-2 mb-4 flex items-center">
                            <Shield size={14} className="mr-1" /> Acesso e Segurança
                        </h4>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Perfil de Acesso</label>
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none bg-white"
                                >
                                    <option value="Atendente">Atendente</option>
                                    <option value="Gerente">Gerente</option>
                                    <option value="Admin">Admin TI</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none bg-white"
                                >
                                    <option value="Ativo">Ativo</option>
                                    <option value="Inativo">Inativo</option>
                                </select>
                            </div>
                        </div>

                        {/* 3. Definição de Senha */}
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-2">
                            <div className="flex justify-between items-center mb-3">
                                <label className="block text-sm font-bold text-gray-700 flex items-center">
                                    <Key size={16} className="mr-1 text-gray-500" />
                                    {formData.id ? 'Alterar Senha (Opcional)' : 'Definir Senha de Acesso *'}
                                </label>

                                <div className="flex items-center space-x-3">
                                    {formData.id && (
                                        <button type="button" className="text-xs text-red-600 hover:underline">
                                            Esqueceu?
                                        </button>
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-gray-400 hover:text-gray-600"
                                        title={showPassword ? "Ocultar senha" : "Ver senha"}
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder={formData.id ? "Nova Senha" : "Senha *"}
                                        className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-red-500 outline-none"
                                        required={!formData.id}
                                    />
                                </div>
                                <div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Confirmar Senha"
                                        className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-red-500 outline-none"
                                        required={!formData.id}
                                    />
                                </div>
                            </div>
                            {!formData.id && (
                                <p className="text-xs text-gray-500 mt-2">
                                    A senha deve conter no mínimo 6 caracteres.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Rodapé com Ações */}
                    <div className="flex items-center justify-between pt-4 mt-2 border-t border-gray-100">
                        {formData.id ? (
                            <button
                                type="button"
                                onClick={handleDelete}
                                className="text-red-600 hover:text-red-800 text-sm font-medium flex items-center px-3 py-2 rounded-lg hover:bg-red-50 transition-colors"
                            >
                                <Trash2 size={16} className="mr-2" /> Excluir
                            </button>
                        ) : (
                            <div></div>
                        )}

                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 shadow-md transition-colors flex items-center"
                            >
                                <Save size={16} className="mr-2" />
                                {formData.id ? 'Salvar Alterações' : 'Cadastrar Usuário'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            {/* Estilos locais para animação e scroll */}
            <style>{`
        .fade-in { animation: fadeIn 0.2s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #ccc; border-radius: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #aaa; }
      `}</style>
        </div>
    );
};

export default CadastroUsuarioModal;
