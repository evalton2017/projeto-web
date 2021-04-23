import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { ApoliceComponent } from './apolice/apolice.component';
import { ClienteComponent } from './cliente/cliente.component';

export const routes: Routes = [
    {path: '', component: ClienteComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
