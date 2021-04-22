import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente } from '../model/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  API = environment.baseApiUrl;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(private http: HttpClient) { }

  listarCliente(): Observable<Cliente[]> {
    return this.http.get<any>(this.API + `clientes`);
  }

  cadastrarCliente(cliente:Cliente): Observable<Cliente>{
    return this.http.post<Cliente>(this.API+`clientes`, cliente, this.httpOptions)
  }

  buscaClientePorId(codigo: any): Observable<Cliente> {
    return this.http.get<any>(this.API + `clientes/${codigo}`);
  }

  atualizarCliente(codigo: any, cliente: Cliente): Observable<any> {
    return this.http.put<any>(this.API+ `clientes/${codigo}`, cliente)
  }

  deletaCliente(codigo: any): Observable<any> {
    return this.http.delete<any>(this.API+ `clientes/${codigo}`)
  }

}
