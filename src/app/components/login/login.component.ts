import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { LoginService } from '../../services/login.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit 
{

  user: User;
  
  constructor(private loginService: LoginService){ }

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
}
