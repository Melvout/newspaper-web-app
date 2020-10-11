import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';

import { ThrowStmt } from '@angular/compiler';

import { LoginService } from '../../services/login.service'
import { Article } from '../../interfaces/article';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit 
{

  newsList: Array<Article> = []; // fields : id, id_user, is_public, is_deleted, abstract, subtitle, update_date, category, title, thumbnail_image, thumbnail_image_type

  constructor(private newsService: NewsService, private loginService: LoginService){ }

  ngOnInit(): void 
  {
    this.getArticles();    
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

  /* Function to delete an article using his id in the newsList */
  deleteArticle(articleID: number)
  {
    this.newsService.deleteArticle(this.newsList[articleID]).subscribe( elem =>
    {
      console.log(elem);
    },
    err =>
    {
      console.log("An error has ocurred : " + err);
    },
    () =>
    {
      console.log("Article deleted");
      this.getArticles();
    });
  }


  updateArticle(): void
  {
    let articleToUpdate: Article = this.newsList[0];
    articleToUpdate.abstract = "NEW ABSTRACT !!!!";

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

}
