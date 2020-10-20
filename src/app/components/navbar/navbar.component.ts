import { Component, OnInit, HostListener } from '@angular/core';
import { User } from '../../interfaces/user';
import { LoginService } from '../../services/login.service';
import { NewsService } from '../../services/news.service';
import { ActivatedRoute, Router} from '@angular/router';
import { Location } from "@angular/common";

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
  showCategories: boolean;

  constructor(private loginService: LoginService, private newsService: NewsService, private router: Router, private location: Location)
  {
    router.events.subscribe(val =>
    {
      if (location.path().includes('list'))
      {
        console.log("OKOK");
        this.showCategories = true;
      } 
      else 
      {
        console.log("NONO");
        this.showCategories = false;
      }
    });
  }

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
