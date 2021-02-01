import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {  EmployeeServiceProvider } from './../../providers/employee-service/employee-service';
import { HomePage } from '../home/home';

/**
 * Generated class for the EmployeeCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-employee-create',
  templateUrl: 'employee-create.html',
})
export class EmployeeCreatePage {

  employeeName: String;
  mobileNumber:any;
  email:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public Provider: EmployeeServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmployeeCreatePage');
  }

  submit(){
    var employeeDetails = {
      name: this.employeeName,
      email: this.email,
      mobile: this.mobileNumber
    }

    this.Provider.addEmployeeDetails(employeeDetails).subscribe(data=>{
      if(data.success){
        this.navCtrl.push(HomePage);
      }
    })
  }

}
