import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public registerForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email:  new FormControl('', Validators.required),
    password : new FormControl('', Validators.required),
    passwordAgree : new FormControl('', Validators.required)
  });

  loginForm = new FormGroup({
    email:  new FormControl(''),
    password : new FormControl('')
  });

  constructor(private http: HttpClient) {

   }

  ngOnInit() {
  }

  register(){
    let data = {
      user: {
        firstName: this.registerForm.get('firstName').value,
        lastName:  this.registerForm.get('lastName').value,
        email:   this.registerForm.get('email').value,
        password :  this.registerForm.get('password').value
      }
    }
    if (this.registerForm.valid) {
      this.http.post(environment.baseUrl+'reg.php', data, {responseType: 'text'}).subscribe(res=>{
        console.log(res);
      })
    }
    
    // this.http.post()
  };

  login(){
    
  }

}
