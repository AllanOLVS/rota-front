export interface Mensagem {
    id: number;
    motoristaId: number;
    motoristaNome: string;
    motoristaVeiculo: string;
    assunto: string;
    conteudo: string;
    dataEnvio: string;
    horaEnvio: string;
    lida: boolean;
    respondida: boolean;
}

export const MOCK_MENSAGENS: Mensagem[] = [
    {
        id: 1,
        motoristaId: 1,
        motoristaNome: "Carlos Eduardo Silva",
        motoristaVeiculo: "Van Sprinter - ABC-1234",
        assunto: "Problema mecânico no veículo",
        conteudo: "Bom dia! Estou informando que o veículo apresentou um barulho estranho no motor durante a viagem de hoje. Sugiro uma revisão antes da próxima saída. O barulho começou após passar por uma lombada na BR-116. Aguardo orientações.",
        dataEnvio: "2026-02-05",
        horaEnvio: "08:45",
        lida: false,
        respondida: false
    },
    {
        id: 2,
        motoristaId: 2,
        motoristaNome: "José Roberto Almeida",
        motoristaVeiculo: "Micro-ônibus - DEF-5678",
        assunto: "Atraso na viagem de ontem",
        conteudo: "Prezado gestor, gostaria de esclarecer o atraso de 30 minutos na viagem de ontem. Houve um acidente na rodovia que causou congestionamento. Segue em anexo a foto do trânsito como comprovação.",
        dataEnvio: "2026-02-04",
        horaEnvio: "17:30",
        lida: true,
        respondida: true
    },
    {
        id: 3,
        motoristaId: 3,
        motoristaNome: "Marcos Antônio Oliveira",
        motoristaVeiculo: "Van Fiorino - GHI-9012",
        assunto: "Solicitação de folga",
        conteudo: "Solicito folga para o dia 10/02 por motivos pessoais. Já conversei com o colega João que pode me substituir neste dia. Agradeço a compreensão.",
        dataEnvio: "2026-02-04",
        horaEnvio: "14:20",
        lida: true,
        respondida: false
    },
    {
        id: 4,
        motoristaId: 1,
        motoristaNome: "Carlos Eduardo Silva",
        motoristaVeiculo: "Van Sprinter - ABC-1234",
        assunto: "Paciente não compareceu",
        conteudo: "Informo que o paciente João da Silva, agendado para 09h na rota de São Paulo, não compareceu ao ponto de embarque. Aguardei 15 minutos conforme protocolo e segui viagem.",
        dataEnvio: "2026-02-03",
        horaEnvio: "09:25",
        lida: true,
        respondida: true
    },
    {
        id: 5,
        motoristaId: 4,
        motoristaNome: "Pedro Henrique Costa",
        motoristaVeiculo: "Van Ducato - JKL-3456",
        assunto: "Elogio de paciente",
        conteudo: "Quero compartilhar que a paciente Maria José fez um elogio ao serviço de transporte. Ela disse que está muito satisfeita com a pontualidade e o cuidado. Fico feliz em contribuir!",
        dataEnvio: "2026-02-03",
        horaEnvio: "16:00",
        lida: false,
        respondida: false
    },
    {
        id: 6,
        motoristaId: 2,
        motoristaNome: "José Roberto Almeida",
        motoristaVeiculo: "Micro-ônibus - DEF-5678",
        assunto: "Troca de pneu realizada",
        conteudo: "Informo que foi necessária a troca do pneu traseiro esquerdo durante a viagem. Utilizei o estepe e o pneu furado está no porta-malas para análise. Local: Km 45 da BR-381.",
        dataEnvio: "2026-02-02",
        horaEnvio: "11:15",
        lida: true,
        respondida: true
    }
];
