import { ClaimResponse } from "./claim-response";

export interface UsuarioCadastroRequest
{
    id: string;
    email: string;
    password: string;
    confirmPassword: string;
    empresaId: string;
    permissoes: ClaimResponse[];
}