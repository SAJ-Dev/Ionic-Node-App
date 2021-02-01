import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmployeeCreatePage } from './employee-create';

@NgModule({
  declarations: [
    EmployeeCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(EmployeeCreatePage),
  ],
})
export class EmployeeCreatePageModule {}
