import React from 'react';
import { Ambulance, MapPin, Activity, Heart } from 'lucide-react';
import { FeatureTag } from '../FeatureTag';

export const HeroSection: React.FC = () => {
    return (
        <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-gradient-to-br from-red-600 to-red-800 text-white items-center justify-center p-12">

            {/* Elementos de Fundo (Abstrato de Rotas) */}
            <div className="absolute inset-0 opacity-10">
                <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                    <path d="M0 100 C 50 20 80 0 100 50 Z" stroke="white" strokeWidth="0.5" fill="none" />
                </svg>
            </div>

            {/* Círculos decorativos pulse */}
            <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full mix-blend-overlay opacity-10 animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-64 h-64 bg-red-400 rounded-full mix-blend-multiply opacity-20 filter blur-3xl"></div>

            {/* Conteúdo de Destaque */}
            <div className="relative z-10 max-w-lg text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start space-x-4 mb-6">
                    <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
                        <Ambulance size={40} className="text-white" />
                    </div>
                    <Activity size={32} className="text-red-200 animate-bounce" />
                    <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
                        <MapPin size={40} className="text-white" />
                    </div>
                </div>

                <h1 className="text-5xl font-bold mb-4 tracking-tight">
                    Gestão Inteligente de <br />
                    <span className="text-red-200">TFD e Frotas</span>
                </h1>

                <p className="text-lg text-red-100 leading-relaxed mb-8">
                    Simplifique o agendamento de viagens, controle passageiros e gere manifestos de embarque com segurança e eficiência.
                </p>

                <div className="flex space-x-4 text-sm font-medium text-red-100">
                    <FeatureTag icon={Heart} label="Humanização" variant="dark" />
                    <FeatureTag icon={MapPin} label="Logística" variant="dark" />
                </div>
            </div>
        </div>
    );
};
