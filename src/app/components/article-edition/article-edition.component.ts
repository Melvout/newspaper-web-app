import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { LoginService } from '../../services/login.service'
import { NewsService } from '../../services/news.service';

import { Article } from '../../interfaces/article';

import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-article-edition',
  templateUrl: './article-edition.component.html',
  styleUrls: ['./article-edition.component.css']
})
export class ArticleEditionComponent implements OnInit
{
  imageError: string;
  cardImageBase64: any;
  isImageSaved: boolean;
  
  articleId: number;
  article: Article;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private newsService: NewsService, private location: Location, private route: ActivatedRoute, private router: Router){ }

  ngOnInit(): void 
  {
    /* If the user is not logged he get redirected to the login page */
    if(!this.isLogged())
    {
      this.router.navigate(['/login']);
    }

    this.article = { title: "", subtitle:"", abstract:"", category: "International", update_date:this.getDate(), is_deleted: false, is_public: true};
    
    this.route.paramMap.subscribe(params =>
    {
      this.articleId = parseInt(params.get('id'), 10);

      /* Edit mode */
      if(this.articleId != 0)
      {
        this.getArticle(this.articleId);
      }
    });
  }

  /* Method to POST a new article to the API
    The article given in parameter must not have an ID in his fields */
  createArticle(): void
  {    
    let articleToCreate = this.article;
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
      if(this.articleId == 0){ console.log("Article created"); }
      else{ console.log("Article updated"); }
      
    }) 
  }

  /* Method to retrieve an article from the API */
  getArticle(id: number)
  {
    this.newsService.getArticle(id).subscribe(article => 
    {
      this.article = article;
    },
    err =>
    {
      console.log("An error has ocurred : " + err.statusText);
    },
    () =>
    {
      console.log("Article received !");
    });
  }

  onSubmit(): void
  {
    if( !this.isLogged() )
    {
      console.log("User not logged");
      return;
    }

    this.createArticle();
  }

  /* Function to know if the user is logged
    If the user is logged : return true
    Else : false
  */
 isLogged(): boolean
 {
   return this.loginService.isLogged();
 }

  /* Method to upload the image */
  fileChangeEvent(fileInput: any) 
  {
    this.imageError = null;

    if (fileInput.target.files && fileInput.target.files[0]) 
    {
      // Size Filter Bytes
      const MAX_SIZE = 20971520;
      const ALLOWED_TYPES = ['image/png', 'image/jpeg'];

      if (fileInput.target.files[0].size > MAX_SIZE)
      {
        this.imageError = 'Maximum size allowed is ' + MAX_SIZE / 1000 + 'Mb';
        return false;
      }

      /*
      if (!_.includes(ALLOWED_TYPES, fileInput.target.files[0].type))
      {
        this.imageError = 'Only Images are allowed ( JPG | PNG )';
        return false;
      }*/

      const reader = new FileReader();
      reader.onload = (e: any) => 
      {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => 
        {
          const imgBase64Path = e.target.result;
          this.cardImageBase64 = imgBase64Path;
          this.isImageSaved = true;

          this.article.image_media_type = fileInput.target.files[0].type;
          const head = this.article.image_media_type.length + 13;
          this.article.image_data = e.target.result.substring(head, e.target.result.length);
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  goBack (): void 
  {
    this.location.back();
  }

  /* Return the current date */
  getDate(): string
  {
    var today: Date = new Date();

    var seconds = today.getSeconds();
    var minutes = today.getMinutes();
    var hour = today.getHours();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    return dd + '-' + mm + '-' + yyyy + " " + hour + ":" + minutes + ":" + seconds;
  }

}
