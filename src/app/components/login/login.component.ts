import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  registerForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email:  new FormControl(''),
    password : new FormControl(''),
    passwordAgree : new FormControl('')
  });

  loginForm = new FormGroup({
    email:  new FormControl(''),
    password : new FormControl('')
  });

  constructor() {

   }

  ngOnInit() {
  }

  register(){

  };

  login(){
    
  }

}
