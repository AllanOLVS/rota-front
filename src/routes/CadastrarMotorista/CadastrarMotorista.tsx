import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Car } from 'lucide-react';
import { AVAILABLE_VEHICLES } from '../../data/motoristaData';
import type { VeiculoFrota } from '../../data/motoristaData';
import { PageHeader, FormActions } from '../../components';
import { DadosCondutorSection } from '../../components/DadosCondutorSection';
import { CNHSection } from '../../components/CNHSection';
import { FrotaVinculadaSection } from '../../components/FrotaVinculadaSection';

interface FormData {
    nome: string;
    cpf: string;
    dataNascimento: string;
    cnh: string;
    categoriaCnh: string;
    validadeCnh: string;
    telefone: string;
    genero: string;
    veiculosVinculados: VeiculoFrota[];
}

export const CadastrarMotorista: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showVehicleModal, setShowVehicleModal] = useState(false);

    const [formData, setFormData] = useState<FormData>({
        nome: '',
        cpf: '',
        dataNascimento: '',
        cnh: '',
        categoriaCnh: '',
        validadeCnh: '',
        telefone: '',
        genero: '',
        veiculosVinculados: []
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddVehicle = (vehicle: VeiculoFrota) => {
        if (!formData.veiculosVinculados.find(v => v.id === vehicle.id)) {
            setFormData(prev => ({
                ...prev,
                veiculosVinculados: [...prev.veiculosVinculados, vehicle]
            }));
        }
        setShowVehicleModal(false);
    };

    const handleRemoveVehicle = (vehicleId: number) => {
        setFormData(prev => ({
            ...prev,
            veiculosVinculados: prev.veiculosVinculados.filter(v => v.id !== vehicleId)
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            console.log("Motorista Salvo:", formData);
            alert("Motorista cadastrado com sucesso!");
            setLoading(false);
            navigate('/frota');
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-800">

            <PageHeader title="Novo Motorista" icon={Car} />

            <main className="flex-1 p-6 md:p-8 max-w-5xl mx-auto w-full">
                <form onSubmit={handleSubmit} className="space-y-6">

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* COLUNA ESQUERDA: DADOS PESSOAIS (2/3) */}
                        <div className="lg:col-span-2 space-y-6">

                            {/* Dados do Condutor */}
                            <DadosCondutorSection
                                formData={formData}
                                onChange={handleChange}
                            />

                            {/* Dados da CNH */}
                            <CNHSection
                                cnh={formData.cnh}
                                categoriaCnh={formData.categoriaCnh}
                                validadeCnh={formData.validadeCnh}
                                onChange={handleChange}
                            />
                        </div>

                        {/* COLUNA DIREITA: VÍNCULO DE VEÍCULOS (1/3) */}
                        <div className="lg:col-span-1">
                            <FrotaVinculadaSection
                                veiculosVinculados={formData.veiculosVinculados}
                                veiculosDisponiveis={AVAILABLE_VEHICLES}
                                showModal={showVehicleModal}
                                onToggleModal={() => setShowVehicleModal(!showVehicleModal)}
                                onAddVehicle={handleAddVehicle}
                                onRemoveVehicle={handleRemoveVehicle}
                            />
                        </div>
                    </div>

                    <FormActions
                        onCancel={() => navigate('/dashboard')}
                        submitLabel="Salvar Motorista"
                        loading={loading}
                        variant="dark"
                    />
                </form>
            </main>
        </div>
    );
};

export default CadastrarMotorista;
