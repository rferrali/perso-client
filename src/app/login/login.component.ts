import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { User } from '../model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup; 
  usr: User; 

  onSubmit() {
    this.authenticationService.login(
      this.loginForm.get('email').value, 
      this.loginForm.get('password').value
    )
  }

  constructor(
    private fb: FormBuilder, 
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required], 
      password: ['', Validators.required]
    })
    this.authenticationService.currentUser.
    subscribe(usr => {this.usr = usr}); 
  }

}
