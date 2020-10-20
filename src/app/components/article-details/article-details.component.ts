import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { Article } from 'src/app/interfaces/article';

import { LoginService } from '../../services/login.service'

import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent implements OnInit
{
  articleId: number;
  article: Article;
  imgUrl: string = "https://picsum.photos/1140/640?random=1";

  constructor(private newsService: NewsService, private loginService: LoginService, private location: Location, private route: ActivatedRoute){ }

  ngOnInit(): void
  {
    this.route.paramMap.subscribe(params =>
    {
      this.articleId = parseInt(params.get('id'), 10);
      this.getArticle(this.articleId);
      console.log(this.articleId);
    });
  }

  getArticle(id: number)
  {
    this.newsService.getArticle(id).subscribe(article => 
    {
      this.article = article;
    },
    err =>
    {
      console.log("An error has ocurred : " + err.statusText); // CHANGES NEEDED
      this.article = null;
    },
    () =>
    {
      console.log("Article got !"); // CHANGES NEEDED
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
