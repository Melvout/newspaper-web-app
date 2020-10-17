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
  currentFilter: string;

  constructor(private loginService: LoginService, private newsService: NewsService) { }

  ngOnInit(): void
  {
    this.currentFilter = '';
    this.user = this.loginService.getUser();
  }

  ngDoCheck(): void
  {
    this.user = this.loginService.getUser();
  }

  /* Function to log out via the login service */
  logout(): void
  {
    this.loginService.logout();
    this.user = this.loginService.getUser();
    this.newsService.setAnonymousApiKey(); // Restoring anonymous apikey
  }

  setCategoryFilter(categoryFilter: string): void
  {
    this.currentFilter = categoryFilter;
    this.newsService.setCategoryFilter(categoryFilter);
  }

  setTermsFilter(event): void
  {
    this.newsService.setTermsFilter(event.target.value);
  }
}
