import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { IConfig, NgxMaskModule } from 'ngx-mask';
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
import { ApoliceComponent } from './apolice.component';
import { ConsultaComponent } from './consulta/consulta.component';
import { ApoliceRoutingModule } from './apolice-routing.module';
import { CurrencyMaskModule } from "ng2-currency-mask";
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import localePt from '@angular/common/locales/pt';
import {MatAutocompleteModule} from  '@angular/material/autocomplete';

registerLocaleData(localePt);

const maskConfig: Partial<IConfig> = {
  validation: false,
};
 
@NgModule({
  declarations: [ApoliceComponent, CadastroComponent, ConsultaComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
   // BrowserModule,
    FormsModule,
    
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
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,

    NgxLoadingModule,
    NgxMaskModule.forRoot(maskConfig),
    HttpClientModule,
    CurrencyMaskModule,
    ApoliceRoutingModule
   
  ],
  providers: [
    DatePipe,
    { provide: LOCALE_ID, useValue: 'pt'}],
})
export class ApoliceModule { }
