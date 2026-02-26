import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle, AlertCircle, MapPin, Calendar, Clock, Bus, Download, User } from 'lucide-react';
import html2canvas from 'html2canvas';

export const ConfirmacaoViagem: React.FC = () => {
    const [searchParams] = useSearchParams();
    const [codigo, setCodigo] = useState(searchParams.get('codigo') || '');
    const [status, setStatus] = useState<'initial' | 'loading' | 'success' | 'error'>('initial');

    const handleConfirmar = (e: React.FormEvent) => {
        e.preventDefault();
        if (!codigo) return;

        setStatus('loading');

        // Simula delay de rede
        setTimeout(() => {
            if (codigo.length < 5) {
                setStatus('error');
            } else {
                setStatus('success');
            }
        }, 1500);
    };

    const handleDownload = async () => {
        const card = document.getElementById('comprovante-card');
        if (card) {
            try {
                const canvas = await html2canvas(card, {
                    scale: 2, // Melhor resolução
                    backgroundColor: '#ffffff'
                });

                const image = canvas.toDataURL("image/png");
                const link = document.createElement('a');
                link.href = image;
                link.download = `comprovante-viagem-${codigo}.png`;
                link.click();
            } catch (error) {
                console.error("Erro ao gerar imagem:", error);
                alert("Erro ao baixar o comprovante. Tente novamente.");
            }
        }
    };

    if (status === 'success') {
        return (
            <div className="min-h-screen bg-green-50 flex items-center justify-center p-4 font-sans">
                <div id="comprovante-card" className="bg-white max-w-md w-full rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
                    <div className="bg-green-600 p-8 text-center">
                        <div className="bg-white/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                            <CheckCircle size={40} className="text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-2">Presença Confirmada!</h1>
                        <p className="text-green-100">Sua vaga está garantida na viagem.</p>
                    </div>

                    <div className="p-6 space-y-4">
                        {/* Detalhes do Paciente */}
                        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                            <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wide mb-3 flex items-center">
                                <User size={14} className="mr-1" /> Passageiro
                            </h3>
                            <div>
                                <p className="font-bold text-gray-900 text-lg">Maria de Lourdes Santos</p>
                                <div className="flex items-center mt-1">
                                    <span className="text-xs font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full border border-blue-200">
                                        Com Acompanhante
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Detalhes da Viagem</h3>

                            <div className="space-y-3">
                                <div className="flex items-start">
                                    <MapPin className="text-red-500 mt-1 mr-3 shrink-0" size={18} />
                                    <div>
                                        <p className="font-bold text-gray-800">Salvador (Hosp. Geral)</p>
                                        <p className="text-sm text-gray-500">Destino Principal</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <Calendar className="text-blue-500 mt-1 mr-3 shrink-0" size={18} />
                                    <div>
                                        <p className="font-bold text-gray-800">28 de Janeiro, 2026</p>
                                        <p className="text-sm text-gray-500">Quarta-feira</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <Clock className="text-orange-500 mt-1 mr-3 shrink-0" size={18} />
                                    <div>
                                        <p className="font-bold text-gray-800">04:00 da manhã</p>
                                        <p className="text-sm text-gray-500">Horário de Saída (Ponto Central)</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <Bus className="text-gray-500 mt-1 mr-3 shrink-0" size={18} />
                                    <div>
                                        <p className="font-bold text-gray-800">Van Sprinter - ABC-1234</p>
                                        <p className="text-sm text-gray-500">Motorista: Carlos Silva</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="text-center text-sm text-gray-400">
                            Apresente seu documento RG no embarque.
                        </div>
                    </div>
                </div>

                <div className="fixed bottom-6 left-0 right-0 px-4 flex justify-center">
                    <button
                        onClick={handleDownload}
                        className="bg-gray-900 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:bg-black transition-all flex items-center gap-2"
                    >
                        <Download size={20} />
                        Baixar Comprovante
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
            <div className="bg-white max-w-sm w-full rounded-2xl shadow-xl p-8">
                <div className="text-center mb-8">
                    <img
                        src="/src/assets/brasao_mutuipe.jpg"
                        alt="Brasão"
                        className="h-16 w-16 mx-auto mb-4 rounded-lg object-contain bg-gray-100 p-2"
                        onError={(e) => {
                            // Fallback se imagem não existir
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150';
                        }}
                    />
                    <h2 className="text-xl font-bold text-gray-900">Confirmação de Viagem</h2>
                    <p className="text-gray-500 text-sm mt-1">Prefeitura Municipal de Mutuípe - TFD</p>
                </div>

                <form onSubmit={handleConfirmar} className="space-y-4">
                    <div>
                        <label htmlFor="codigo" className="block text-sm font-medium text-gray-700 mb-1">
                            Código da Viagem
                        </label>
                        <input
                            type="text"
                            id="codigo"
                            value={codigo}
                            onChange={(e) => setCodigo(e.target.value.toUpperCase())}
                            placeholder="Ex: VIAGEM-123"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all text-center uppercase font-bold tracking-widest"
                        />
                    </div>

                    {status === 'error' && (
                        <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm flex items-center">
                            <AlertCircle size={16} className="mr-2 shrink-0" />
                            Código inválido. Tente novamente.
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={status === 'loading' || !codigo}
                        className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-3.5 rounded-lg shadow-lg flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {status === 'loading' ? (
                            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        ) : (
                            'Confirmar Presença'
                        )}
                    </button>
                </form>

                <p className="mt-8 text-center text-xs text-gray-400">
                    Ao confirmar, você concorda com as normas de transporte do TFD.
                </p>
            </div>
        </div>
    );
};
