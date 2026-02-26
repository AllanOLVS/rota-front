import React from 'react';
import { User, Clock, Mail, MailOpen } from 'lucide-react';
import type { Mensagem } from '../../data/messagesData';

interface MessageCardProps {
    mensagem: Mensagem;
    onClick: () => void;
}

export const MessageCard: React.FC<MessageCardProps> = ({ mensagem, onClick }) => {
    const inicialNome = mensagem.motoristaNome.charAt(0).toUpperCase();

    return (
        <button
            onClick={onClick}
            className={`
                group w-full text-left p-4 sm:p-5 rounded-xl border transition-all duration-300
                hover:shadow-md hover:-translate-y-0.5
                ${mensagem.lida
                    ? 'bg-white border-gray-100'
                    : 'bg-blue-50/50 border-blue-200 shadow-sm'
                }
            `}
        >
            <div className="flex items-start gap-3 sm:gap-4">
                {/* Avatar */}
                <div className={`
                    flex-shrink-0 h-10 w-10 sm:h-12 sm:w-12 rounded-full flex items-center justify-center
                    text-white font-bold text-sm sm:text-base
                    ${mensagem.lida ? 'bg-gray-400' : 'bg-blue-600'}
                `}>
                    {inicialNome}
                </div>

                {/* Conteúdo */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className={`
                            text-sm sm:text-base truncate
                            ${mensagem.lida ? 'font-medium text-gray-700' : 'font-bold text-gray-900'}
                        `}>
                            {mensagem.motoristaNome}
                        </h4>

                        {/* Status Badge */}
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                            {mensagem.lida ? (
                                <MailOpen size={14} className="text-gray-400" />
                            ) : (
                                <span className="flex items-center gap-1 px-2 py-0.5 bg-blue-600 text-white text-xs font-medium rounded-full">
                                    <Mail size={12} />
                                    Nova
                                </span>
                            )}
                        </div>
                    </div>

                    <p className={`
                        text-sm mb-2 truncate
                        ${mensagem.lida ? 'text-gray-600' : 'font-medium text-gray-800'}
                    `}>
                        {mensagem.assunto}
                    </p>

                    <p className="text-xs sm:text-sm text-gray-500 line-clamp-2 mb-2">
                        {mensagem.conteudo}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                            <User size={12} />
                            {mensagem.motoristaVeiculo.split(' - ')[0]}
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {mensagem.dataEnvio.split('-').reverse().join('/')} às {mensagem.horaEnvio}
                        </span>
                    </div>
                </div>
            </div>
        </button>
    );
};
