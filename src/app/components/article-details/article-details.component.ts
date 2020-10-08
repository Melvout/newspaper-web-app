import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { Article } from 'src/app/interfaces/article';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent implements OnInit
{

  article: Article;

  constructor(private newsService: NewsService){ }

  ngOnInit(): void
  {
    this.getArticle(1);
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
    },
    () =>
    {
      console.log("Article got !"); // CHANGES NEEDED
    });
  }
}
