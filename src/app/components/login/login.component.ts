import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { LoginService } from '../../services/login.service'

import { FormBuilder, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit 
{

  user: User;
  loginForm: FormGroup;

  constructor(private loginService: LoginService, private formBuilder: FormBuilder)
  {
    this.loginForm = this.formBuilder.group(
    {
        username: '',
        password: ''
    });
  }


  ngOnInit(): void
  {

  }

  /* Function to login as a user to add, edit or delete articles by using the login service */
  login(name: string, pwd: string)
  {
    this.loginService.login(name, pwd).subscribe( user => 
    {
      this.user = user;
      console.log(user);
    },
    err =>
    {
      console.log("An error has ocurred : " + err.statusText); // CHANGES NEEDED
    },
    () =>
    {
      console.log("User logged"); // CHANGES NEEDED
    });
  }

  /* Function to log out via the login service */
  logout(): void
  {
    this.loginService.logout();
    this.user = this.loginService.getUser();
  }

  /* Function to know if the user is logged
    If the user is logged : return true
    Else : false
    */
  isLogged(): boolean
  {
    return this.loginService.isLogged();
  }

  onSubmit(userData: { username: string; password: string; })
  {
    this.login(userData.username, userData.password);
  }
}
