import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Apolice } from '../model/apolice.model';
import { ConsultaApolice } from '../model/consulta-apolice.model';

@Injectable({
  providedIn: 'root'
})
export class ApoliceService {

  API = environment.baseApiUrl;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(private http: HttpClient) { }

  listarApolice(): Observable<Apolice[]> {
    return this.http.get<any>(this.API + `apolices`);
  }

  cadastrarApolice(apolice: Apolice): Observable<Apolice> {
    return this.http.post<Apolice>(this.API + `apolices`, apolice, this.httpOptions)
  }

  buscaApolicePorId(codigo: any): Observable<Apolice> {
    return this.http.get<any>(this.API + `apolices/${codigo}`);
  }

  atualizarApolice(codigo: any, apolice: Apolice): Observable<any> {
    return this.http.put<any>(this.API + `apolices/${codigo}`, apolice)
  }

  deletaApolice(codigo: any): Observable<any> {
    return this.http.delete<any>(this.API + `apolices/${codigo}`)
  }

  consultaApolice(numero: any): Observable<ConsultaApolice> {
    return this.http.get<any>(this.API + `apolices/consulta/${numero}`);
  }


}
