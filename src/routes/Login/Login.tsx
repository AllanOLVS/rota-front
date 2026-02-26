import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Ambulance } from 'lucide-react';
import {
    Input,
    Button,
    Logo,
    Alert,
    HeroSection
} from '../../components';

export const Login: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Simulação de delay de rede
        setTimeout(() => {
            if (email === 'admin' && password === '1234') {
                // Redireciona para o Dashboard após login bem-sucedido
                navigate('/dashboard');
            } else {
                if (!email || !password) {
                    setError('Por favor, preencha todos os campos.');
                } else {
                    setError('Credenciais inválidas. Tente admin/1234');
                }
            }
            setIsLoading(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen w-full flex bg-gray-50">

            {/* LADO ESQUERDO - Visual e Conceitual */}
            <HeroSection />

            {/* LADO DIREITO - Formulário de Login */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-24 relative">

                {/* Header Mobile (só aparece em telas pequenas) */}
                <div className="lg:hidden absolute top-0 left-0 w-full p-6 flex items-center justify-center bg-red-700 text-white shadow-md">
                    <Ambulance className="mr-2" />
                    <span className="font-bold text-xl">Rota Saúde</span>
                </div>

                <div className="w-full max-w-md space-y-8">

                    {/* Cabeçalho do Form */}
                    <div className="text-center lg:text-left">
                        <div className="flex justify-center lg:justify-start items-center mb-2 text-red-600">
                            <Logo variant="default" size="md" />
                        </div>
                        <h2 className="mt-4 text-3xl font-extrabold text-gray-900">
                            Bem-vindo de volta
                        </h2>
                        <p className="mt-2 text-sm text-gray-500">
                            Digite suas credenciais para acessar o painel de gestão.
                        </p>
                    </div>

                    {/* O Formulário */}
                    <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                        <div className="space-y-4">
                            <Input
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="username"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                label="Usuário"
                                icon={User}
                                placeholder="Digite seu usuário"
                            />

                            <Input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                label="Senha"
                                icon={Lock}
                                placeholder="••••••••"
                            />
                        </div>

                        {error && (
                            <Alert variant="error">
                                {error}
                            </Alert>
                        )}

                        <Button
                            type="submit"
                            isLoading={isLoading}
                            loadingText="Acessando sistema..."
                            showArrow
                            fullWidth
                        >
                            Entrar no Sistema
                        </Button>
                    </form>

                    {/* Footer Informativo */}
                    <div className="mt-6 text-center">
                        <p className="text-xs text-gray-400">
                            Sistema desenvolvido para gestão municipal de saúde. <br />
                            Em caso de dúvidas, contate o setor de TI da prefeitura.
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};
