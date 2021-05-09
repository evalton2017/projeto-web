import { Cliente } from "./cliente.model";

export class Apolice {
    public id: number;
    public numero: number;
    public inicioVigencia: Date;
    public fimVigencia: Date;
    public placa: string;
    public valor: number;
    public cliente: Cliente
    
}