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

  newsList: Array<News> = []; // fields : id, id_user, is_public, is_deleted, abstract, subtitle, update_date, category, title, thumbnail_image, thumbnail_image_type

  constructor(private newsService: NewsService){ }

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
    });
  }

}
