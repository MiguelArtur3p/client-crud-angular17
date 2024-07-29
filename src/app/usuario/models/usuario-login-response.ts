import { ClaimResponse } from "./claim-response";

export interface UsuarioLoginResponse
{
    id: number;
    email: string;
    senha: string;
    claim: ClaimResponse[];
}