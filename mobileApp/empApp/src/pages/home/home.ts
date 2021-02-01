import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { EmployeeCreatePage } from './../employee-create/employee-create';
import {  EmployeeServiceProvider } from './../../providers/employee-service/employee-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  employees: any[];
 
  constructor(public navCtrl: NavController, public EmployeeProvider:EmployeeServiceProvider ) {

  }

  ionViewDidLoad(){

   this.EmployeeProvider.getEmployeeDetails().subscribe(data => {
    if (data.success) {
      console.log("success");
      this.employees = data.data;
      console.log(this.employees);
      console.log(data);
    }
  })

  }

  add(){
    this.navCtrl.push(  EmployeeCreatePage );
  }

  delete(id:any){

    var employee_id = id;
    console.log(id);
    this.EmployeeProvider.deleteEmployeeDetails(employee_id).subscribe(data=>{
      if(data.success){

        this.ionViewDidLoad();

      }
    })

  }
   
}
