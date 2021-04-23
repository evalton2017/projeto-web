import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/model/cliente.model';
import { ClienteService } from 'src/app/service/cliente.service';
import { CpfValidator } from 'src/app/shared/validators/cpf.validator';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  form: FormGroup;
  cliente: Cliente;
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
    private clienteService: ClienteService) { }

  ngOnInit() {
    this.titulo = this.data.titulo;
    this.acao = this.data.acao;
    if(this.data.acao=='cadastrar'){
      this.gerarForm();
    }else{
      this.preencheForm(this.data.cliente);
    }
  	
  }

  gerarForm() {
  	this.form = this.fb.group({
      id: ['', []],
      nome: ['', [Validators.required, Validators.minLength(3)]],
      cpf: ['', [Validators.required, CpfValidator]],
  		cidade: ['', [Validators.required, Validators.minLength(3)]],
  		uf: ['', [Validators.required, Validators.maxLength(2)]],
  	});
  }

  preencheForm(cliente: Cliente) {
  	this.form = this.fb.group({
      id: [cliente.id, [Validators.required]],
  		nome: [cliente.nome, [Validators.required, Validators.minLength(3)]],
  		cpf: [cliente.cpf, [Validators.required, CpfValidator]],
  		cidade: [cliente.cidade, [Validators.required, Validators.minLength(3)]],
  		uf: [cliente.uf, [Validators.required, Validators.maxLength(2)]],
  	});
  }

  salvar(){
    this.loading = true;
    this.clienteService.cadastrarCliente(this.form.value)
    .subscribe(
      response =>{
        this.loading = false;
        this.snackBar.open("Cliente cadastrado com sucesso.", "Sucesso", { duration: 5000 });
        this.onNoClick();
      },
      err =>{
        this.loading = false;
        this.snackBar.open(err.error.message, "Erro", { duration: 5000 });
      }
    )
  }

  alterar(){
    this.loading = true;
    this.clienteService.atualizarCliente(this.form.value.id, this.form.value)
    .subscribe(
      response =>{
        this.loading = false;
        this.snackBar.open("Cliente atualizado com sucesso.", "Sucesso", { duration: 5000 });
        this.onNoClick();
      },
      err =>{
        this.loading = false;
        this.snackBar.open(err.error.message, "Erro", { duration: 5000 });
      }
    )
  }

  onNoClick(): void {
    this.dialogRef.close();
  }



  verificaValidTouched(campo){
    if(this.form.get(campo).errors !== null){
      return this.form.get(campo).errors.cpf && !this.form.get(campo).errors.required;
    }
  }

  aplicaCssErro(campo){
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    }
  }
}
