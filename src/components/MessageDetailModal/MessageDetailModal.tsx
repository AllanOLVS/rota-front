import React from 'react';
import { X, Car, Clock, Calendar, CheckCircle } from 'lucide-react';
import type { Mensagem } from '../../data/messagesData';

interface MessageDetailModalProps {
    mensagem: Mensagem;
    isOpen: boolean;
    onClose: () => void;
    onMarkAsRead: (id: number) => void;
}

export const MessageDetailModal: React.FC<MessageDetailModalProps> = ({
    mensagem,
    isOpen,
    onClose,
    onMarkAsRead
}) => {
    if (!isOpen) return null;

    const inicialNome = mensagem.motoristaNome.charAt(0).toUpperCase();

    const handleMarkAsRead = () => {
        onMarkAsRead(mensagem.id);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between p-4 sm:p-5 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-white">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                            {inicialNome}
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 text-sm sm:text-base">
                                {mensagem.motoristaNome}
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-500 flex items-center gap-1">
                                <Car size={12} />
                                {mensagem.motoristaVeiculo}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-5">
                    {/* Subject */}
                    <div className="mb-4">
                        <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                            {mensagem.assunto}
                        </h4>
                        <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                                <Calendar size={14} />
                                {mensagem.dataEnvio.split('-').reverse().join('/')}
                            </span>
                            <span className="flex items-center gap-1">
                                <Clock size={14} />
                                {mensagem.horaEnvio}
                            </span>
                        </div>
                    </div>

                    {/* Message Body */}
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                        <p className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-wrap">
                            {mensagem.conteudo}
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 sm:p-5 border-t border-gray-100 bg-gray-50 flex flex-col sm:flex-row gap-3">
                    {!mensagem.lida && (
                        <button
                            onClick={handleMarkAsRead}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                        >
                            <CheckCircle size={18} />
                            Marcar como lida
                        </button>
                    )}
                    <button
                        onClick={onClose}
                        className={`
                            flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-colors
                            ${mensagem.lida
                                ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
                            }
                        `}
                    >
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    );
};
