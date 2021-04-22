import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MascaraDirective } from './directives/mascara.directive';


@NgModule({
  declarations: [
    MascaraDirective
],
  exports: [
    MascaraDirective
  ],
  imports: [
    CommonModule
  ],
  providers: [
   // PtBrMatPaginatorIntl
  ]
})
export class SharedModule { }
