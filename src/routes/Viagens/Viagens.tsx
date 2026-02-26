import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Viagem } from '../../data/mockData';
import { MOCK_VIAGENS, MOCK_PASSAGEIROS } from '../../data/mockData';
import { Header } from '../../components/Header';
import { ViagensList } from '../../components/ViagensList';
import { ViagemDetail } from '../../components/ViagemDetail';
import { PrintStyles } from '../../components/PrintStyles';

type ViewType = 'list' | 'detail';

export const Viagens: React.FC = () => {
    const navigate = useNavigate();
    const [view, setView] = useState<ViewType>('list');
    const [selectedViagem, setSelectedViagem] = useState<Viagem | null>(null);

    const handleOpenViagem = (viagem: Viagem) => {
        setSelectedViagem(viagem);
        setView('detail');
    };

    const handleBackToList = () => {
        setView('list');
        setSelectedViagem(null);
    };

    const handleNovaViagem = () => {
        navigate('/nova-viagem');
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
            <Header />

            <main className="max-w-7xl mx-auto p-6 print:p-0 print:w-full">
                {view === 'list' && (
                    <ViagensList
                        viagens={MOCK_VIAGENS}
                        onViagemClick={handleOpenViagem}
                        onNovaViagem={handleNovaViagem}
                    />
                )}

                {view === 'detail' && selectedViagem && (
                    <ViagemDetail
                        viagem={selectedViagem}
                        passageiros={MOCK_PASSAGEIROS}
                        onBack={handleBackToList}
                    />
                )}
            </main>

            <PrintStyles />
        </div>
    );
};

export default Viagens;
