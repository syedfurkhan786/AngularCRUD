import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { UserModel } from '../shared/model/user.model';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  public signupForm !: FormGroup;
  public signUpObj = new UserModel();

  constructor(private formBuilder : FormBuilder, private router : Router, private api : ApiService){}
  ngOnInit(): void{
    this.signupForm = this.formBuilder.group({
      fullname : ["", Validators.required],
      email : ["", Validators.required],
      password : ["", Validators.required],
      mobile : ["", Validators.required],
      usertype : ["", Validators.required]
    })
  }

  signUp(){
    this.api.signUp(this.signupForm.value)
    .subscribe(res => {
      alert(res.message);
      this.signupForm.reset();
      this.router.navigate(['login']);
    })
  }
}
