import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApoliceComponent } from './apolice.component';
import { ConsultaComponent } from './consulta/consulta.component';


const routes: Routes = [
  { path: '', component: ApoliceComponent, children:[
    {path: 'consulta', component: ConsultaComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApoliceRoutingModule { }

