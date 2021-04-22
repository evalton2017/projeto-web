import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Apolice } from 'src/app/model/apolice.model';
import { ApoliceService } from 'src/app/service/apolice.service';
import * as moment from 'moment';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  apoliceForm: FormGroup;
  apolice: Apolice;
  public dados: any;
  public loading = false;
  titulo: string = '';
  acao: string = '';

  constructor(
    public dialogRef: MatDialogRef<CadastroComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
  	private fb: FormBuilder, 
  	private snackBar: MatSnackBar,
    private router: Router,
    private datePipe: DatePipe,
    private apoliceService: ApoliceService) { }

  ngOnInit() {
    this.titulo = this.data.titulo;
    this.acao = this.data.acao;
    if(this.data.acao=='cadastrar'){
      this.gerarForm();
    }else{
      this.preencheForm(this.data.apolice);
    }
  	
  }

  gerarForm() {
  	this.apoliceForm = this.fb.group({
      id: [''],
  		numero: [''],
      inicioVigencia: ['', [Validators.required]],
      fimVigencia: ['', [Validators.required]],
      placa: ['', [Validators.required]],
      valor: ['', [Validators.required]],
  	});
  }

  preencheForm(apolice: Apolice) {
  	this.apoliceForm = this.fb.group({
      id: [apolice.id],
  		numero: [apolice.numero, [Validators.required]],
      inicioVigencia: [this.converteDate(apolice.inicioVigencia), [Validators.required]],
      fimVigencia: [this.converteDate(apolice.fimVigencia), [Validators.required]],
      placa: [apolice.placa, [Validators.required]],
      valor: [apolice.valor, [Validators.required]],
  	});
  }

  salvar(){
    this.loading = true;
    this.montarObjeto(this.apoliceForm.value)
    this.apoliceService.cadastrarApolice(this.apolice)
    .subscribe(
      response =>{
        this.loading = false;
        this.snackBar.open("Apolice cadastrado com sucesso.", "Sucesso", { duration: 5000 });
        this.onNoClick();
      },
      err =>{
        this.loading = false;
        this.snackBar.open(err.error.message, "Erro", { duration: 5000 });
      }
    )
  }

  montarObjeto(objeto: any){
    this.apolice = new Apolice();
    this.apolice.id = objeto.id?objeto.id:null;
    this.apolice.numero = objeto.numero?objeto.numero:null;
    if (typeof(objeto.valor)=='string') {
      this.apolice.valor = parseFloat(objeto.valor);
    }else{
      this.apolice.valor = objeto.valor.toFixed(2);
    }
    this.apolice.fimVigencia = objeto.fimVigencia;
    this.apolice.inicioVigencia = objeto.inicioVigencia;
    this.apolice.placa = objeto.placa;
  }

  alterar(){
    this.loading = true;
    this.montarObjeto(this.apoliceForm.value)
    console.log(this.apolice)
    this.apoliceService.atualizarApolice(this.apoliceForm.value.id, this.apolice)
    .subscribe(
      response =>{
        this.loading = false;
        this.snackBar.open("Apolice atualizado com sucesso.", "Sucesso", { duration: 5000 });
        this.onNoClick();
      },
      err =>{
        this.loading = false;
        this.snackBar.open(err.error.message, "Erro", { duration: 5000 });
      }
    )
  }

  converteDate(date: Date) {
    return this.toDataISO(date);
  }

  toDataISO = function (data) {
    return moment(data, 'DD/MM/YYYY').format('YYYY-MM-DD');
};

  

  validarData() {
    let dataInicial = this.apoliceForm.value.inicioVigencia;
    let dataFinal = this.apoliceForm.value.fimVigencia;
    let hoje = this.converteDate(new Date());

    if (dataInicial > dataFinal) {
      this.snackBar.open('Data Inicial deve ser maior que a data final.', "Erro", { duration: 5000 });
      this.apoliceForm.patchValue({
        fimVigencia: ['']
      })
    }
    if (dataFinal < hoje) {
      this.snackBar.open('Data Inicial deve ser maior que a data atual.', "Erro", { duration: 5000 });
      this.apoliceForm.patchValue({
        fimVigencia: ['']
      })
    }
  }



  onNoClick(): void {
    this.dialogRef.close();
  }


}
