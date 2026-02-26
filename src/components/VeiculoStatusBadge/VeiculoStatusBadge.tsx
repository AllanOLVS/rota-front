import React from 'react';

type VeiculoStatus = 'disponivel' | 'em_uso' | 'manutencao';

interface VeiculoStatusBadgeProps {
    status: VeiculoStatus;
}

const styles: Record<VeiculoStatus, string> = {
    disponivel: 'bg-green-100 text-green-700 border-green-200',
    em_uso: 'bg-blue-100 text-blue-700 border-blue-200',
    manutencao: 'bg-red-100 text-red-700 border-red-200',
};

const labels: Record<VeiculoStatus, string> = {
    disponivel: 'DISPONÍVEL',
    em_uso: 'EM TRÂNSITO',
    manutencao: 'MANUTENÇÃO',
};

export const VeiculoStatusBadge: React.FC<VeiculoStatusBadgeProps> = ({ status }) => {
    return (
        <span className={`px-2 py-1 rounded-full text-xs font-bold border ${styles[status] || styles.disponivel}`}>
            {labels[status] || labels.disponivel}
        </span>
    );
};
