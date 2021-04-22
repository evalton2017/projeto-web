import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { ClientesModule } from './cliente/clientes.module';
import { NgxLoadingModule } from 'ngx-loading';
import { ApoliceModule } from './apolice/apolice.module';
import {MatSidenavModule} from '@angular/material/sidenav'


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ClientesModule,
    ApoliceModule,
    //modulos material
    MatToolbarModule,
    MatIconModule,
    NgxLoadingModule,
    MatSidenavModule,

    AppRoutingModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
