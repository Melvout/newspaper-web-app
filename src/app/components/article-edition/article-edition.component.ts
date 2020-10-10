import { Component, OnInit } from '@angular/core';

import { LoginService } from '../../services/login.service'

@Component({
  selector: 'app-article-edition',
  templateUrl: './article-edition.component.html',
  styleUrls: ['./article-edition.component.css']
})
export class ArticleEditionComponent implements OnInit
{

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }


  /* Function to know if the user is logged
    If the user is logged : return true
    Else : false
  */
  isLogged(): boolean
  {
    return this.loginService.isLogged();
  }

}
