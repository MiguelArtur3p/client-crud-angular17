import { Endereco } from "../../cidade/models/endereco";

export interface Cliente
{
    id?: string;
    nome: string;
    cpf: string;
    dataNascimento: string;
    codigoCidade: string
    pais: string;
    endereco: Endereco;
    numeroTelefone: string[];
    numeroCelular: string;
    email: string;
}
