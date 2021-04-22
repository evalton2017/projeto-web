import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApoliceComponent } from './apolice.component';
import { ConsultaComponent } from './consulta/consulta.component';


const routes: Routes = [
    {path:'apolices', component: ApoliceComponent},
    {path:'apolice/consulta', component: ConsultaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApoliceRoutingModule { }
