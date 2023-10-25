import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public loginAPIUrl : string = "http://localhost:5169/api/Login/";

  public employeeAPIUrl : string = "http://localhost:5169/api/Employee/";

  constructor(private http : HttpClient) { }

  postEmployee(data : any){
    return this.http.post<any>(`${this.employeeAPIUrl}add_employee`, data)
    .pipe(map((res:any) => {
      return res;
    }))
  }

  getEmployee(){
    return this.http.get<any>(`${this.employeeAPIUrl}get_all_employees`)
    .pipe(map((res:any) => {
      return res;
    }))
  }

  updateEmployee(data : any){
    return this.http.put<any>(`${this.employeeAPIUrl}update_employee`, data)
    .pipe(map((res:any) => {
      return res;
    }))
  }

  deleteEmployee(id : number){
    return this.http.delete<any>(`${this.employeeAPIUrl}delete_employee/`+id)
    .pipe(map((res:any) => {
      return res;
    }))
  }

  signUp(employeeObj : any){
    return this.http.post<any>(`${this.loginAPIUrl}signup`, employeeObj);
  }

  login(employeeObj : any){
    return this.http.post<any>(`${this.loginAPIUrl}login`, employeeObj);
  }
}
