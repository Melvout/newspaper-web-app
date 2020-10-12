import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticleListComponent } from './components/article-list/article-list.component';
import { ArticleEditionComponent } from './components/article-edition/article-edition.component';
import { ArticleDetailsComponent } from './components/article-details/article-details.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/articles-list', pathMatch: 'full' },
  { path: 'articles-list', component: ArticleListComponent },
  { path: 'article-edition/:id', component: ArticleEditionComponent },
  { path: 'article-details/:id', component: ArticleDetailsComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
