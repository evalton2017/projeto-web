import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'

export const routes: Routes = [
//    { path: '', pathMatch: 'full', loadChildren:'app/cliente/clientes.module#ClientesModule'},
    { path: 'clientes', loadChildren:()=> import('./cliente/clientes.module').then(m=>m.ClientesModule)},
    { path: 'apolices', loadChildren:()=> import('./apolice/apolice.module').then(m=>m.ApoliceModule)},
    {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
