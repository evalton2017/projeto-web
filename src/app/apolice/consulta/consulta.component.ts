import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Apolice } from 'src/app/model/apolice.model';
import { ConsultaApolice } from 'src/app/model/consulta-apolice.model';
import { ApoliceService } from 'src/app/service/apolice.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  consulta: ConsultaApolice;
  apolices: Apolice[] = [];
  pesquisa: any = '';

  public loading = false;
  dataSource = new MatTableDataSource();
  colunas: string[] = ['id', 'numero', 'inicio', 'fim', 'placa', 'valor', 'opcoes'];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private ApoliceService: ApoliceService
  ) {
    this.consulta = new ConsultaApolice();
  }

  ngOnInit() {
    this.dataSource.data = []
  }

  consultarApolice() {
    this.loading = true
    this.ApoliceService.consultaApolice(this.pesquisa)
      .subscribe(
        response => {
          this.loading = false;
          this.consulta = response;
        },
        err => {
          this.loading = false;
          this.snackBar.open(err.error.message, "Erro", { duration: 5000 });
        }
      )
  }


}
