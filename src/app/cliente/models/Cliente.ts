export interface Cliente
{
    id?: number;
    nomeCliente: string;
    cpf: string;
    dataNascimento: Date;
    cidade: string;
    uf: string;
    pais: string;
    endereco: {
        rua: string;
        numeroCasa: string;
        bairro: string;
    };
    numeroTelefone: string[];
    numeroCelular: string;
    emailCliente: string;
}
