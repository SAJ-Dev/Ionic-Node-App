import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";

/*
  Generated class for the EmployeeServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EmployeeServiceProvider {

  url = "http://localhost:5000/";

  constructor(public http: HttpClient) {
    console.log('Hello EmployeeServiceProvider Provider');
  }

  getEmployeeDetails(): Observable<any> {
    return this.http.get(this.url + "employee/all/get");
  }

  addEmployeeDetails(data:any): Observable<any> {
    return this.http.post(this.url + "employeelist/add",data);
  }

  deleteEmployeeDetails(data:any): Observable<any> {
    return this.http.delete(this.url + "employee/delete/"+ data);
  }


}
