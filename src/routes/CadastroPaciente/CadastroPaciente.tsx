import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    User,
    Users,
    MapPin,
    Search,
    Calendar,
    CreditCard,
    Phone,
    FileText,
    Accessibility
} from 'lucide-react';
import { PageHeader, FormSection, FormActions } from '../../components';

interface FormData {
    nome: string;
    rg: string;
    cpf: string;
    dataNascimento: string;
    telefone: string;
    cns: string;
    genero: string;
    cep: string;
    bairro: string;
    logradouro: string;
    numero: string;
    referencia: string;
    complemento: string;
    necessitaAcompanhante: boolean;
    nomeAcompanhante: string;
    rgAcompanhante: string;
    necessitaCadeiraRodas: boolean;
    necessitaAssentoInfantil: boolean;
    necessitaCarroAdaptado: boolean;
}

export const CadastroPaciente: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        nome: '',
        rg: '',
        cpf: '',
        dataNascimento: '',
        telefone: '',
        cns: '',
        genero: '',
        cep: '',
        bairro: '',
        logradouro: '',
        numero: '',
        referencia: '',
        complemento: '',
        necessitaAcompanhante: false,
        nomeAcompanhante: '',
        rgAcompanhante: '',
        necessitaCadeiraRodas: false,
        necessitaAssentoInfantil: false,
        necessitaCarroAdaptado: false
    });

    const handleBuscarCep = () => {
        if (formData.cep.length >= 8) {
            setLoading(true);
            setTimeout(() => {
                setFormData(prev => ({
                    ...prev,
                    bairro: 'Centro',
                    logradouro: 'Av. Getúlio Vargas'
                }));
                setLoading(false);
            }, 1000);
        } else {
            alert("Digite um CEP válido para buscar.");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Dados salvos:", formData);
        alert("Paciente cadastrado com sucesso!");
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-800">

            <PageHeader title="Novo Paciente" icon={User} />

            <main className="flex-1 p-6 md:p-8 max-w-5xl mx-auto w-full">
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* SEÇÃO 1: DADOS PESSOAIS */}
                    <FormSection
                        title="Dados Pessoais"
                        subtitle="Informações de identificação do cidadão"
                        icon={FileText}
                        variant="primary"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                            {/* Nome Completo */}
                            <div className="col-span-1 md:col-span-2 lg:col-span-3">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo *</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                        <User size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        name="nome"
                                        value={formData.nome}
                                        onChange={handleChange}
                                        className="pl-10 w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all uppercase"
                                        placeholder="DIGITE O NOME COMPLETO"
                                        required
                                    />
                                </div>
                            </div>

                            {/* CPF */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">CPF *</label>
                                <input
                                    type="text"
                                    name="cpf"
                                    value={formData.cpf}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none"
                                    placeholder="000.000.000-00"
                                    required
                                />
                            </div>

                            {/* RG */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">RG</label>
                                <input
                                    type="text"
                                    name="rg"
                                    value={formData.rg}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none"
                                    placeholder="00.000.000-00"
                                />
                            </div>

                            {/* Data Nascimento */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Data de Nascimento *</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                        <Calendar size={18} />
                                    </div>
                                    <input
                                        type="date"
                                        name="dataNascimento"
                                        value={formData.dataNascimento}
                                        onChange={handleChange}
                                        className="pl-10 w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none text-gray-600"
                                        required
                                    />
                                </div>
                            </div>

                            {/* CNS (Cartão SUS) */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Cartão Nacional de Saúde (CNS)</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                        <CreditCard size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        name="cns"
                                        value={formData.cns}
                                        onChange={handleChange}
                                        className="pl-10 w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none"
                                        placeholder="000 0000 0000 0000"
                                    />
                                </div>
                            </div>

                            {/* Telefone */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Telefone / WhatsApp *</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                        <Phone size={18} />
                                    </div>
                                    <input
                                        type="tel"
                                        name="telefone"
                                        value={formData.telefone}
                                        onChange={handleChange}
                                        className="pl-10 w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none"
                                        placeholder="(00) 00000-0000"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Sexo/Gênero */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Sexo / Gênero</label>
                                <select
                                    name="genero"
                                    value={formData.genero}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none bg-white"
                                >
                                    <option value="">Selecione...</option>
                                    <option value="M">Masculino</option>
                                    <option value="F">Feminino</option>
                                    <option value="O">Outro</option>
                                </select>
                            </div>

                            {/* Necessita de Acompanhante */}
                            <div className="col-span-1 md:col-span-2 lg:col-span-3 mt-2">
                                <label className="flex items-start space-x-3 p-4 border border-blue-100 rounded-lg bg-blue-50 cursor-pointer hover:bg-blue-100 transition-colors">
                                    <div className="flex items-center h-5">
                                        <input
                                            type="checkbox"
                                            name="necessitaAcompanhante"
                                            checked={formData.necessitaAcompanhante}
                                            onChange={handleChange}
                                            className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-blue-900">Necessita de Acompanhante?</span>
                                        <span className="text-xs text-blue-700 mt-1">
                                            Marque esta opção se o paciente for criança, idoso ou possuir alguma condição que exija a presença de um responsável/acompanhante na viagem.
                                        </span>
                                    </div>
                                </label>
                            </div>

                            {/* Detalhes do Acompanhante (Condicional) */}
                            {formData.necessitaAcompanhante && (
                                <div className="col-span-1 md:col-span-2 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-blue-50 border border-blue-100 rounded-lg animate-in fade-in slide-in-from-top-4">
                                    <div className="md:col-span-2 flex items-center text-blue-800 font-bold border-b border-blue-200 pb-2 mb-2">
                                        <Users size={16} className="mr-2" />
                                        Dados do Acompanhante
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Acompanhante *</label>
                                        <input
                                            type="text"
                                            name="nomeAcompanhante"
                                            value={formData.nomeAcompanhante}
                                            onChange={handleChange}
                                            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none uppercase"
                                            required={formData.necessitaAcompanhante}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">RG / CPF do Acompanhante *</label>
                                        <input
                                            type="text"
                                            name="rgAcompanhante"
                                            value={formData.rgAcompanhante}
                                            onChange={handleChange}
                                            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                                            required={formData.necessitaAcompanhante}
                                        />
                                    </div>
                                </div>
                            )}

                        </div>
                    </FormSection>

                    {/* SEÇÃO 3: NECESSIDADES ESPECIAIS */}
                    <FormSection
                        title="Necessidades Especiais"
                        subtitle="Informações para transporte adequado"
                        icon={Accessibility}
                        variant="secondary"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg bg-white cursor-pointer hover:bg-gray-50 transition-colors">
                                <input
                                    type="checkbox"
                                    name="necessitaCadeiraRodas"
                                    checked={formData.necessitaCadeiraRodas}
                                    onChange={handleChange}
                                    className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
                                />
                                <span className="text-gray-700 font-medium">Usa Cadeira de Rodas</span>
                            </label>

                            <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg bg-white cursor-pointer hover:bg-gray-50 transition-colors">
                                <input
                                    type="checkbox"
                                    name="necessitaCarroAdaptado"
                                    checked={formData.necessitaCarroAdaptado}
                                    onChange={handleChange}
                                    className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
                                />
                                <span className="text-gray-700 font-medium">Precisa de Carro Adaptado</span>
                            </label>

                            <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg bg-white cursor-pointer hover:bg-gray-50 transition-colors">
                                <input
                                    type="checkbox"
                                    name="necessitaAssentoInfantil"
                                    checked={formData.necessitaAssentoInfantil}
                                    onChange={handleChange}
                                    className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
                                />
                                <span className="text-gray-700 font-medium">Cadeirinha / Assento Infantil</span>
                            </label>
                        </div>
                    </FormSection>

                    {/* SEÇÃO 2: DADOS DE ENDEREÇO */}
                    <FormSection
                        title="Endereço Residencial"
                        subtitle="Localização para busca e entrega do paciente"
                        icon={MapPin}
                        variant="secondary"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                            {/* CEP com Busca */}
                            <div className="col-span-1 lg:col-span-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">CEP</label>
                                <div className="relative flex">
                                    <input
                                        type="text"
                                        name="cep"
                                        value={formData.cep}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-l-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none"
                                        placeholder="00000-000"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleBuscarCep}
                                        className="bg-gray-100 hover:bg-gray-200 border border-l-0 border-gray-300 text-gray-600 px-3 rounded-r-lg transition-colors flex items-center justify-center"
                                        disabled={loading}
                                    >
                                        {loading ? <div className="animate-spin h-5 w-5 border-2 border-red-500 border-t-transparent rounded-full"></div> : <Search size={18} />}
                                    </button>
                                </div>
                            </div>

                            {/* Bairro */}
                            <div className="col-span-1 lg:col-span-3">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Bairro</label>
                                <input
                                    type="text"
                                    name="bairro"
                                    value={formData.bairro}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none bg-gray-50"
                                    readOnly={loading}
                                />
                            </div>

                            {/* Logradouro */}
                            <div className="col-span-1 md:col-span-2 lg:col-span-3">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Logradouro (Rua, Av, Praça)</label>
                                <input
                                    type="text"
                                    name="logradouro"
                                    value={formData.logradouro}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none"
                                />
                            </div>

                            {/* Número */}
                            <div className="col-span-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Número</label>
                                <input
                                    type="text"
                                    name="numero"
                                    value={formData.numero}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none"
                                />
                            </div>

                            {/* PONTO DE REFERÊNCIA - CAMPO DESTAQUE */}
                            <div className="col-span-1 md:col-span-2 lg:col-span-3">
                                <label className="block text-sm font-bold text-red-700 mb-1 flex items-center">
                                    <MapPin size={16} className="mr-1" />
                                    Ponto de Referência (Onde o motorista deve parar) *
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="referencia"
                                        value={formData.referencia}
                                        onChange={handleChange}
                                        className="w-full border-2 border-red-100 bg-red-50/30 rounded-lg p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none placeholder-red-300/70"
                                        placeholder="Ex: Em frente ao Mercadinho do João, Próximo à Escola..."
                                        required
                                    />
                                    <div className="absolute right-3 top-3 text-xs text-red-400 font-medium bg-red-50 px-2 py-0.5 rounded">
                                        Crucial para o Motorista
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Essa informação sairá destacada no relatório de viagem.</p>
                            </div>

                            {/* Complemento */}
                            <div className="col-span-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Complemento</label>
                                <input
                                    type="text"
                                    name="complemento"
                                    value={formData.complemento}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none"
                                    placeholder="Casa A, Apto 101..."
                                />
                            </div>
                        </div>
                    </FormSection>

                    <FormActions
                        onCancel={() => navigate('/dashboard')}
                        submitLabel="Salvar Cadastro"
                        variant="red"
                    />
                </form>
            </main>
        </div >
    );
};

export default CadastroPaciente;
