import React from 'react';
import { StatsCard } from '../StatsCard';

interface DailyStat {
    label: string;
    value: string | number;
    sub?: string;
}

interface DailySummaryProps {
    stats?: DailyStat[];
}

const defaultStats: DailyStat[] = [
    { label: 'Viagens Hoje', value: '03', sub: '2 confirmadas' },
    { label: 'Pacientes Agendados', value: '14', sub: '3 acompanhantes' },
    { label: 'Veículos Disponíveis', value: '05', sub: 'Frota total: 08' },
];

export const DailySummary: React.FC<DailySummaryProps> = ({
    stats = defaultStats,
}) => {
    return (
        <div className="mt-10 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-bold text-gray-700 mb-4">Resumo do Dia</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                    <StatsCard
                        key={index}
                        label={stat.label}
                        value={stat.value}
                        sub={stat.sub}
                    />
                ))}
            </div>
        </div>
    );
};
