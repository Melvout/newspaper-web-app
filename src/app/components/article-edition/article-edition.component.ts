import { Component, OnInit } from '@angular/core';

import { LoginService } from '../../services/login.service'
import { NewsService } from '../../services/news.service';

import { Article } from '../../interfaces/article';

@Component({
  selector: 'app-article-edition',
  templateUrl: './article-edition.component.html',
  styleUrls: ['./article-edition.component.css']
})
export class ArticleEditionComponent implements OnInit
{

  constructor(private loginService: LoginService, private newsService: NewsService) { }

  ngOnInit(): void {
  }

  /* Method to POST a new article to the API */
  createArticle(articleToCreate: Article): void
  {
    //let articleToCreate: Article = {id: 1, id_user:80, is_public: true, is_deleted: false, abstract: "blabla", subtitle: "sous-titre",update_date:"11/10/2020", category: "National", title: "TITLE", body: "Hello,....", image_data: "BLABLA", image_description: "bla", image_media_type: "jpeg" };
    
    this.newsService.createArticle(articleToCreate).subscribe( elem =>
    {
      console.log(elem);
    },
    err =>
    {
      console.log("An error has occured : " + err);
    },
    () =>
    {
      console.log("Article created");
    }) 
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
