import React from 'react';

export const PrintStyles: React.FC = () => {
    return (
        <style>{`
      @media print {
        @page { margin: 1cm; size: landscape; }
        body { background: white; -webkit-print-color-adjust: exact; }
        .print\\:hidden { display: none !important; }
        .print\\:block { display: block !important; }
        .print\\:w-full { width: 100% !important; max-width: none !important; }
        .print\\:shadow-none { box-shadow: none !important; }
        .print\\:border-none { border: none !important; }
      }
      .fade-in { animation: fadeIn 0.3s ease-in; }
      @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
    `}</style>
    );
};
