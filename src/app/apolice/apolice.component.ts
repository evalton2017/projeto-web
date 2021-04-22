import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Apolice } from '../model/apolice.model';
import { ApoliceService } from '../service/apolice.service';
import { CadastroComponent } from './cadastro/cadastro.component';

@Component({
  selector: 'app-apolice',
  templateUrl: './apolice.component.html',
  styleUrls: ['./apolice.component.css']
})
export class ApoliceComponent implements OnInit {

  apolice: Apolice;
  apolices: Apolice[] = [];
  pesquisa: any = '';

  public loading = false;
  dataSource= new MatTableDataSource();
  colunas: string[] = ['id', 'numero', 'inicio','fim','placa','valor', 'opcoes'];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
  	private fb: FormBuilder, 
  	private snackBar: MatSnackBar,
    private router: Router,
    private ApoliceService: ApoliceService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  	this.listarApolice();
  }

  listarApolice(){
    this.loading = true
    this.ApoliceService.listarApolice()
      .subscribe(
        response =>{
          this.loading = false;
          this.apolices = response;
          this.dataSource.data = response;
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator; 
        },
        err =>{
          this.loading = false;
          const msg: string = "Erro ao carregar as Apolices.";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      )
  }

  cadastrar(): void {
    let dados = {titulo: 'Cadastrar Apolice', acao:'cadastrar'}
    const dialogRef = this.dialog.open(CadastroComponent, {
      width: '40%',
      data: dados
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
      this.apolice = result;
    });
  }

  alterar(apolice: any): void {
    let dados = {titulo: 'Alterar Apolice', acao:'editar', apolice: apolice}
    const dialogRef = this.dialog.open(CadastroComponent, {
      width: '40%',
      data: dados
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
      this.apolice = result;
    });
  }

  excluir(codigo: any): void {
    this.loading = true;
    this.ApoliceService.deletaApolice(codigo)
    .subscribe(
      response =>{
        this.loading = false;
        this.snackBar.open("Apolice deletado com sucesso.", "Sucesso", { duration: 5000 });
        this.ngOnInit();
      },
      err =>{
        this.loading = false;
        this.snackBar.open(err.error.message, "Erro", { duration: 5000 });
      }
    )
  }

  
  pesquisar(){
    let dados  = this.apolices.filter(optionValue => optionValue.numero.toString().includes(this.pesquisa.toString()));
    this.dataSource.data = dados;
  }


}
