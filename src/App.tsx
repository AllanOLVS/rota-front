import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import {
  Login,
  Dashboard,
  Viagens,
  CadastroPaciente,
  Historico,
  CadastrarViagem,
  CadastrarMotorista,
  CadastrarVeiculo,
  FrotaManager,
  Configuracoes,
  ListaDestinos,
  ListaPacientes,
  ConfirmacaoViagem,
  Mensagens
} from './routes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota pública */}
        <Route path="/login" element={<Login />} />
        <Route path="/confirmar-viagem" element={<ConfirmacaoViagem />} />

        {/* Rotas protegidas */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/viagens" element={<Viagens />} />
        <Route path="/cadastrar-paciente" element={<CadastroPaciente />} />
        <Route path="/historico" element={<Historico />} />
        <Route path="/nova-viagem" element={<CadastrarViagem />} />
        <Route path="/frota" element={<FrotaManager />} />
        <Route path="/cadastrar-motorista" element={<CadastrarMotorista />} />
        <Route path="/cadastrar-veiculo" element={<CadastrarVeiculo />} />
        <Route path="/configuracoes" element={<Configuracoes />} />
        <Route path="/lista-destinos" element={<ListaDestinos />} />
        <Route path="/pacientes" element={<ListaPacientes />} />
        <Route path="/mensagens" element={<Mensagens />} />

        {/* Redireciona raiz para login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Rota 404 */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

