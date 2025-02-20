import { EventEmitter, Injectable, Output } from '@angular/core';
import { Article } from '../interfaces/article';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class NewsService 
{

  private newsUrl = 'http://sanger.dia.fi.upm.es/pui-rest-news/articles';  // URL to web api
  private articleUrl = 'http://sanger.dia.fi.upm.es/pui-rest-news/article';  // URL to web api

  private categoryFilter: string;
  

  @Output() changeCategoryFilter: EventEmitter<string> = new EventEmitter();
  @Output() changeTermsFilter: EventEmitter<string> = new EventEmitter();
  constructor(private http: HttpClient) { this.categoryFilter = ''; }

  // Set the corresponding APIKEY accordig to the received by email
  private APIKEY: string;
  private APIKEY_ANON = 'DEV_TEAM_1331';

  private httpOptions = 
  {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'PUIRESTAUTH apikey=' + this.APIKEY_ANON
    })
  };

  // Modifies the APIKEY with the received value
  setUserApiKey(apikey: string) 
  {
    this.APIKEY = apikey;
    this.httpOptions = 
    {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'PUIRESTAUTH apikey=' + this.APIKEY
      })
    };
    console.log('Apikey successfully changed ' + this.APIKEY);
  }

  setAnonymousApiKey() 
  {
    this.setUserApiKey(this.APIKEY_ANON);
  }

  /* Returns the list of news with the following fields:
    id
    id_user
    is_public
    is_deleted
    abstract
    subtitle
    update_date
    category
    title
    thumbnail_image
    thumbnail_media_type */
  getArticles(): Observable<Article[]> 
  {
    return this.http.get<Article[]>(this.newsUrl, this.httpOptions);
  }

  deleteArticle(article: Article | number): Observable<Article> 
  {
    const id = typeof article === 'number' ? article : article.id;
    const url = `${this.articleUrl}/${id}`;
    return this.http.delete<Article>(url, this.httpOptions);
  }

  /* Returns an article which contains the following elements:
    id
    id_user
    is_public
    is_deleted
    abstract
    subtitle
    update_date
    category
    title
    body
    image_data
    image_description
    image_media_type
  */
  getArticle(id: number): Observable<Article> 
  {
    console.log('Requesting article id=' + id);
    const url = `${this.articleUrl}/${id}`;
    return this.http.get<Article>(url, this.httpOptions);
  }

  updateArticle(article: Article): Observable<Article> 
  {
    console.log('Updating article id=' + article.id);
    return this.http.post<Article>(this.articleUrl, article, this.httpOptions);
  }

  createArticle(article: Article): Observable<Article>
  {
    console.log('Creating article');
    console.log(article);
    return this.http.post<Article>(this.articleUrl, article, this.httpOptions);
  }

  /* Method to emit event when category filter changes */
  setCategoryFilter(categoryFilter: string): void
  {
    this.categoryFilter = categoryFilter;
    this.changeCategoryFilter.emit(this.categoryFilter);
  }

  /* Method to emit event when term filter changes */
  setTermsFilter(termsFilter: string): void
  {
    this.changeTermsFilter.emit(termsFilter);
  }
}
