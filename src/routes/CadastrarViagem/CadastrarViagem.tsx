import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from 'lucide-react';
import {
    MOCK_DESTINOS,
    MOCK_MOTORISTAS,
    MOCK_VEICULOS
} from '../../data/viagemData';
import { MOCK_VIAGENS } from '../../data/mockData';
import type { Veiculo } from '../../data/viagemData';
import { PageHeader, FormActions } from '../../components';
import { RoteiroSection } from '../../components/RoteiroSection';
import { FrotaSection } from '../../components/FrotaSection';

interface FormData {
    destino: string;
    data: string;
    horario: string;
    localSaida: string;
    motoristaId: string;
    veiculoId: string;
    observacoes: string;
}

export const CadastrarViagem: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        destino: '',
        data: '',
        horario: '04:00',
        localSaida: 'Frente da Prefeitura',
        motoristaId: '',
        veiculoId: '',
        observacoes: ''
    });

    const [selectedVeiculo, setSelectedVeiculo] = useState<Veiculo | null>(null);

    useEffect(() => {
        if (formData.veiculoId) {
            const veiculo = MOCK_VEICULOS.find(v => v.id.toString() === formData.veiculoId);
            setSelectedVeiculo(veiculo || null);
        } else {
            setSelectedVeiculo(null);
        }
    }, [formData.veiculoId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!formData.motoristaId || !formData.veiculoId) {
            alert("Por favor, selecione um motorista e um veículo para criar a viagem.");
            setLoading(false);
            return;
        }

        // Mock API call simulation
        setTimeout(() => {
            const motorista = MOCK_MOTORISTAS.find(m => m.id.toString() === formData.motoristaId);
            const veiculo = MOCK_VEICULOS.find(v => v.id.toString() === formData.veiculoId);

            const novaViagem = {
                id: Date.now(),
                data: formData.data,
                destino: formData.destino,
                motorista: motorista?.nome || 'Não identificado',
                veiculo: veiculo?.modelo || 'Não identificado',
                lotacao: 0,
                capacidade: veiculo?.capacidade || 0,
                status: 'pendente' as const,
                saida: formData.horario
            };

            // Adiciona ao mock global (hack para SPA sem backend)
            MOCK_VIAGENS.unshift(novaViagem);

            console.log("Viagem Criada:", novaViagem);
            alert("Viagem cadastrada com sucesso! Agora você pode adicionar passageiros.");
            setLoading(false);
            navigate('/viagens');
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-800">

            <PageHeader title="Nova Viagem" icon={Navigation} />

            <main className="flex-1 p-6 md:p-8 max-w-4xl mx-auto w-full">
                <form onSubmit={handleSubmit} className="space-y-8">

                    {/* SEÇÃO 1: ROTEIRO */}
                    <RoteiroSection
                        formData={formData}
                        destinos={MOCK_DESTINOS}
                        onChange={handleChange}
                    />

                    {/* SEÇÃO 2: FROTA */}
                    <FrotaSection
                        formData={formData}
                        motoristas={MOCK_MOTORISTAS}
                        veiculos={MOCK_VEICULOS}
                        selectedVeiculo={selectedVeiculo}
                        onChange={handleChange}
                    />

                    <FormActions
                        onCancel={() => navigate('/dashboard')}
                        submitLabel="Criar Viagem"
                        loading={loading}
                        variant="red"
                    />
                </form>
            </main>

            {/* Estilo para animação */}
            <style>{`
                .animate-pulse-once {
                    animation: pulse-light 1s ease-out;
                }
                @keyframes pulse-light {
                    0% { transform: scale(0.98); opacity: 0.5; }
                    50% { transform: scale(1.01); opacity: 1; }
                    100% { transform: scale(1); }
                }
            `}</style>
        </div>
    );
};

export default CadastrarViagem;
