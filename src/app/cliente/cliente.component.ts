import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Cliente } from '../model/cliente.model';
import { ClienteService } from '../service/cliente.service';
import { CadastroComponent } from './cadastro/cadastro.component';
import {MatDialog} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  cliente: Cliente;
  clientes: Cliente[] = [];
  pesquisa: string = '';

  public loading = false;
  dataSource= new MatTableDataSource();
  colunas: string[] = ['id', 'nome', 'cpf','cidade','opcoes'];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
  	private fb: FormBuilder, 
  	private snackBar: MatSnackBar,
    private router: Router,
    private clienteService: ClienteService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  	this.listarCliente();
  }

  listarCliente(){
    this.loading = true
    this.clienteService.listarCliente()
      .subscribe(
        response =>{
          this.loading = false;
          this.clientes = response;
          this.dataSource.data = response;
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator; 
        },
        err =>{
          this.loading = false;
          const msg: string = "Erro ao carregar os Clientes.";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      )
  }

  cadastrar(): void {
    let dados = {titulo: 'Cadastrar Cliente', acao:'cadastrar'}
    const dialogRef = this.dialog.open(CadastroComponent, {
      width: '40%',
      data: dados
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
      this.cliente = result;
    });
  }

  alterar(cliente: any): void {
    let dados = {titulo: 'Alterar Cliente', acao:'editar', cliente: cliente}
    const dialogRef = this.dialog.open(CadastroComponent, {
      width: '40%',
      data: dados
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
      this.cliente = result;
    });
  }

  excluir(codigo: any): void {
    this.loading = true;
    this.clienteService.deletaCliente(codigo)
    .subscribe(
      response =>{
        this.loading = false;
        this.snackBar.open("Cliente deletado com sucesso.", "Sucesso", { duration: 5000 });
        this.ngOnInit();
      },
      err =>{
        this.loading = false;
        this.snackBar.open(err.error.message, "Erro", { duration: 5000 });
      }
    )
  }

  
  pesquisar(){
    let dados  = this.clientes.filter(optionValue => optionValue.nome.toLowerCase().includes(this.pesquisa.toLowerCase()));
    this.dataSource.data = dados;
  }



}
