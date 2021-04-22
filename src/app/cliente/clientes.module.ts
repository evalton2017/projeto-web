import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { ClienteComponent } from './cliente.component';
import { NgxLoadingModule } from 'ngx-loading';

import { RouterModule } from '@angular/router';

import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { CadastroComponent } from './cadastro/cadastro.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { BrowserModule } from '@angular/platform-browser';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';

const maskConfig: Partial<IConfig> = {
  validation: false,
};
 
@NgModule({
  declarations: [ClienteComponent, CadastroComponent],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    BrowserModule,
    FormsModule,

    CommonModule,
    RouterModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatTooltipModule,
    MatIconModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,

    NgxLoadingModule,
    NgxMaskModule.forRoot(maskConfig),
    HttpClientModule
   
  ]
})
export class ClientesModule { }
