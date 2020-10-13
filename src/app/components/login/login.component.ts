import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { LoginService } from '../../services/login.service'
import { NewsService } from '../../services/news.service';

import { FormBuilder, FormGroup } from '@angular/forms';

import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit
{

  user: User;
  loginForm: FormGroup;

  constructor(private loginService: LoginService, private formBuilder: FormBuilder, private newsService: NewsService, private router: Router)
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
    },
    err =>
    {
      console.log("An error has ocurred : " + err.statusText);
    },
    () =>
    {
      //console.log("User logged");
      //console.log(this.user);
      this.newsService.setUserApiKey(this.loginService.getUser().apikey); // Set the apikey for the current user
      this.router.navigate(['/articles-list']);
    });
  }

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

  onSubmit(userData: { username: string; password: string; })
  {
    this.login(userData.username, userData.password);
    
  }
}
