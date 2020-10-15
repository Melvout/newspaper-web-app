import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { LoginService } from '../../services/login.service'
import { NewsService } from '../../services/news.service';

import { FormBuilder, FormGroup } from '@angular/forms';

import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit
{

  userData: {username: string, password: string};
  user: User;
  correctCredentials: boolean;
  //loginForm: FormGroup;

  constructor(private loginService: LoginService, private formBuilder: FormBuilder, private newsService: NewsService, private router: Router)
  {
   
  }

  ngOnInit(): void
  {
    this.userData = { username: "", password: ""};
    this.correctCredentials = true;
  }

  /* Function to login as a user to add, edit or delete articles by using the login service */
  login(name: string, pwd: string, loginForm: NgForm)
  {
    this.loginService.login(name, pwd).subscribe( user =>
    {
      this.user = user;
    },
    err =>
    {
      this.correctCredentials = false;
      loginForm.form.reset();
      loginForm.form.markAsPristine(); // Reset the form + display a feedback message
      console.log("An error has ocurred : " + err.statusText);
    },
    () =>
    {
      this.newsService.setUserApiKey(this.loginService.getUser().apikey); // Set the apikey for the current user
      this.router.navigate(['/articles-list']); // Navigate to the articles-list
    });
  }

  /*login(name: string, pwd: string, loginForm: NgForm)
  {
    this.loginService.login(name, pwd).subscribe( user =>
    {
      console.log(user);
      this.user = user;
      this.newsService.setUserApiKey(this.loginService.getUser().apikey); // Set the apikey for the current user
      this.router.navigate(['/articles-list']);
    });
  }*/

  /* Function to log out via the login service */
  logout(): void
  {
    this.loginService.logout();
    this.user = this.loginService.getUser();
    this.newsService.setAnonymousApiKey(); // Restoring anonymous apikey
  }

  /* Function to know if the user is logged
    If the user is logged : return true
    Else : false
    */
  isLogged(): boolean
  {
    return this.loginService.isLogged();
  }

  onSubmit(loginForm: NgForm)
  {
    //this.login(userData.username, userData.password);
    this.login(this.userData.username, this.userData.password, loginForm);
  }

  onFocus()
  {
    this.correctCredentials = true;
  }
}
