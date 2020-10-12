import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit 
{

  user: User;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void 
  {
    this.user = this.loginService.getUser();
  }

  ngDoCheck(): void
  {
    this.user = this.loginService.getUser();
  }

}
