import { Component, OnInit, HostListener } from '@angular/core';
import { User } from '../../interfaces/user';
import { LoginService } from '../../services/login.service';
import { NewsService } from '../../services/news.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit
{

  user: User;
  term: string;

  constructor(private loginService: LoginService, private newsService: NewsService) { }

  ngOnInit(): void
  {
    this.user = this.loginService.getUser();
  }

  ngDoCheck(): void
  {
    this.user = this.loginService.getUser();
  }

  /* Function to log out */
  logout()
  {
    this.user = null;
  }

  setCategoryFilter(categoryFilter: string): void
  {
    this.newsService.setCategoryFilter(categoryFilter);
  }

  setTermsFilter(event): void
  {
    this.newsService.setTermsFilter(event.target.value);
  }
}
