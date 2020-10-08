import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { News } from '../../interfaces/news';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit 
{

  newsList: Array<News> = [];

  constructor(private newsService: NewsService){ }

  ngOnInit(): void 
  {
    this.getArticles();    
  }

  getArticles()
  {
    this.newsService.getArticles().subscribe(list => 
    {
      this.newsList = list;
    },
    err =>
    {
      console.log("An error has ocurred : " + err.statusText); // CHANGES NEEDED
    },
    () =>
    {
      console.log("News list got"); // CHANGES NEEDED
    });
  }

}
