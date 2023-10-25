import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dashboard.model';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit{
  formValue !: FormGroup;
  employeeModelObj : EmployeeModel = new EmployeeModel();
  employeeData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;

  constructor(private formBuilder: FormBuilder,
    private api : ApiService){ }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      firstName : [''],
      lastName : [''],
      email : [''],
      mobile : [''],
      salary : ['']
    })
    this.getAllEmployees();
  }

  postEmployeeDetails(){
    this.employeeModelObj.FirstName = this.formValue.value.firstName;
    this.employeeModelObj.LastName = this.formValue.value.lastName;
    this.employeeModelObj.Email = this.formValue.value.email;
    this.employeeModelObj.Mobile = this.formValue.value.mobile;
    this.employeeModelObj.Salary = this.formValue.value.salary;

    this.api.postEmployee(this.employeeModelObj)
    .subscribe(res => {
      console.log(res);
      alert('Employee Added Successfully');
      let ref = document.getElementById('cancel')
      ref?.click(); 
      this.formValue.reset();
      this.getAllEmployees();
    },
    err => {
      alert('Something went wrong');
    })
  }

  getAllEmployees(){
    this.api.getEmployee()
    .subscribe(res => {
      this.employeeData = res.employeeDetails;
    })
  }

  deleteEmployee(row : any){
    this.api.deleteEmployee(row.id)
    .subscribe(res => {
      alert('Employee Deleted');
      this.getAllEmployees();
    })
  }

  onEdit(row : any){
    this.showAdd = false;
    this.showUpdate = true;
    this.employeeModelObj.Id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
  }

  updateEmployeeDetails(){
    this.employeeModelObj.FirstName = this.formValue.value.firstName;
    this.employeeModelObj.LastName = this.formValue.value.lastName;
    this.employeeModelObj.Email = this.formValue.value.email;
    this.employeeModelObj.Mobile = this.formValue.value.mobile;
    this.employeeModelObj.Salary = this.formValue.value.salary;

    this.api.updateEmployee(this.employeeModelObj)
    .subscribe(res => {
      alert('Updated Successfully');
      let ref = document.getElementById('cancel')
      ref?.click(); 
      this.formValue.reset();
      this.getAllEmployees();
    })
  }

  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
}
