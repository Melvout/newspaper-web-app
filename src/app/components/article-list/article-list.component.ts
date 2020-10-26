import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';

import { ThrowStmt } from '@angular/compiler';

import { LoginService } from '../../services/login.service'
import { Article } from '../../interfaces/article';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit
{

  newsList: Array<Article> = []; // fields : id, id_user, is_public, is_deleted, abstract, subtitle, update_date, category, title, thumbnail_image, thumbnail_image_type
  categoryFilter: string;
  termsFilter: string;
  user: User;
  closeResult: string;

  constructor(private newsService: NewsService, private loginService: LoginService, private router: Router, private modalService: NgbModal){ }

  ngOnInit(): void
  {
    this.getArticles();
    this.categoryFilter = '';
    this.user = this.loginService.getUser();
    this.newsService.changeCategoryFilter.subscribe( (categoryFilter: string) =>
    {
      this.categoryFilter = categoryFilter;
    })
    this.newsService.changeTermsFilter.subscribe( (termsFilter: string) =>
    {
      this.termsFilter = termsFilter;
    })
    this.loginService.changeUserStatus.subscribe( (userStatus: User) =>
    {
      this.user = userStatus;
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
      console.log("News list retrieved");
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

  /* Function to navigate the a specific article details */
  viewArticle(articleID: number): void
  {
    this.router.navigate(['/article-details/' + this.newsList[articleID].id]);
  }

  editArticle(articleID: number): void
  {
    this.router.navigate(['/article-edition/' + this.newsList[articleID].id]);
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
