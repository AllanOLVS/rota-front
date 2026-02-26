import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    History,
    Download,
    FileText,
    User,
    MapPin,
    Printer
} from 'lucide-react';
import { MOCK_HISTORY } from '../../data/historyData';
import type { HistoricoViagem } from '../../data/historyData';
import { PageHeader } from '../../components';
import { HistoryStatCard } from '../../components/HistoryStatCard';
import { HistoryFiltersPanel } from '../../components/HistoryFiltersPanel';
import { HistoryTable } from '../../components/HistoryTable';

interface Filters {
    dataInicio: string;
    dataFim: string;
    motorista: string;
    cidade: string;
    hospital: string;
    paciente: string;
}

export const Historico: React.FC = () => {
    const navigate = useNavigate();

    const [filters, setFilters] = useState<Filters>({
        dataInicio: '',
        dataFim: '',
        motorista: '',
        cidade: '',
        hospital: '',
        paciente: ''
    });

    const [filteredData, setFilteredData] = useState<HistoricoViagem[]>(MOCK_HISTORY);

    useEffect(() => {
        let result = MOCK_HISTORY;

        if (filters.motorista) {
            result = result.filter(v => v.motorista.toLowerCase().includes(filters.motorista.toLowerCase()));
        }
        if (filters.cidade) {
            result = result.filter(v => v.destino.toLowerCase().includes(filters.cidade.toLowerCase()));
        }
        if (filters.hospital) {
            result = result.filter(v => v.hospital.toLowerCase().includes(filters.hospital.toLowerCase()));
        }
        if (filters.paciente) {
            result = result.filter(v =>
                v.pacientes.some(p => p.toLowerCase().includes(filters.paciente.toLowerCase()))
            );
        }
        if (filters.dataInicio) {
            result = result.filter(v => v.data >= filters.dataInicio);
        }
        if (filters.dataFim) {
            result = result.filter(v => v.data <= filters.dataFim);
        }

        setFilteredData(result);
    }, [filters]);

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const clearFilters = () => {
        setFilters({
            dataInicio: '',
            dataFim: '',
            motorista: '',
            cidade: '',
            hospital: '',
            paciente: ''
        });
    };

    const handleView = (id: number) => {
        console.log('Visualizar viagem:', id);
        navigate(`/viagens/${id}`);
    };

    const handlePrint = (id: number) => {
        console.log('Imprimir viagem:', id);
    };

    const totalPassageiros = filteredData.reduce((acc, curr) => acc + curr.passageiros, 0);
    const viagensCanceladas = filteredData.filter(v => v.status === 'cancelada').length;

    const headerActions = (
        <>
            <button className="flex-1 sm:flex-none flex items-center justify-center px-3 sm:px-4 py-2 bg-white border border-gray-300 rounded-lg text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                <Download size={16} className="mr-1 sm:mr-2" />
                <span className="hidden xs:inline">Exportar </span>Excel
            </button>
            <button className="flex-1 sm:flex-none flex items-center justify-center px-3 sm:px-4 py-2 bg-red-600 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-red-700 transition-colors shadow-sm">
                <Printer size={16} className="mr-1 sm:mr-2" />
                <span className="hidden xs:inline">Relatório </span>PDF
            </button>
        </>
    );

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-800">

            <PageHeader
                title="Histórico de Viagens"
                icon={History}
                rightContent={headerActions}
            />

            <main className="p-6 max-w-7xl mx-auto w-full space-y-6">

                {/* CARDS DE RESUMO */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <HistoryStatCard
                        title="Viagens Encontradas"
                        value={filteredData.length}
                        icon={FileText}
                        color="blue"
                    />
                    <HistoryStatCard
                        title="Pacientes Transportados"
                        value={totalPassageiros}
                        icon={User}
                        color="green"
                    />
                    <HistoryStatCard
                        title="Viagens Canceladas"
                        value={viagensCanceladas}
                        icon={History}
                        color="red"
                    />
                    <HistoryStatCard
                        title="Veículo Mais Usado"
                        value="Van Sprinter"
                        icon={MapPin}
                        color="purple"
                    />
                </div>

                {/* ÁREA DE FILTROS */}
                <HistoryFiltersPanel
                    filters={filters}
                    onChange={handleFilterChange}
                    onClear={clearFilters}
                />

                {/* TABELA DE RESULTADOS */}
                <HistoryTable
                    data={filteredData}
                    onView={handleView}
                    onPrint={handlePrint}
                />
            </main>
        </div>
    );
};

export default Historico;
