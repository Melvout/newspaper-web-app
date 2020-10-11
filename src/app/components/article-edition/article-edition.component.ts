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

  newsList: Array<Article> = [];

  constructor(private loginService: LoginService, private newsService: NewsService) { }

  ngOnInit(): void {
  }

  /* Method to POST a new article to the API
    The article given in parameter must not have an ID in his fields */
  createArticle(articleToCreate: Article): void
  {    
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

  /* Method to update an article
    The paramater article must have an existing ID in his fields */
  updateArticle(articleToUpdate: Article): void
  {
    this.newsService.updateArticle(articleToUpdate).subscribe( elem =>
    {
      console.log(elem);
    },
    err =>
    {
      console.log("An error has occured : " + err);
    },
    () =>
    {
      console.log("Article updated");
      this.getArticles();
    })
  }


  /* Function to initialize the lists of all the articles from the API */
  getArticles(): void
  {
    this.newsService.getArticles().subscribe(list => 
    {
      this.newsList = list;
    },
    err =>
    {
      this.newsList = null;
      console.log("An error has ocurred : " + err);
    },
    () =>
    {
      console.log("News list got"); // CHANGES NEEDED
      console.log(this.newsList);
    });
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
