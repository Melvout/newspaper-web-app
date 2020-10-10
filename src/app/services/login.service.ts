import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class LoginService 
{

  private user: User;

  private loginUrl = 'http://sanger.dia.fi.upm.es/pui-rest-news/login';

  private message: string;

  private httpOptions =
  {
    headers: new HttpHeaders()
      .set('Content-Type', 'x-www-form-urlencoded')
  };

  constructor(private http: HttpClient) { }

  /* Function to know if the user is logged
    If the user is logged : return true
    Else : false
    */
  isLogged(): boolean
  {
    return this.user != null;
  }

  /* Function to login as a user to add, edit or delete articles */
  login(name: string, pwd: string): Observable<User> 
  {
    const usereq = new HttpParams()
      .set('username', name)
      .set('passwd', pwd);

    return this.http.post<User>(this.loginUrl, usereq).pipe(
      tap(user => 
      {
        this.user = user;
      })
    );
  }

  /* Return the user */
  getUser() 
  {
    return this.user;
  }

  /* Function to log out */
  logout()
  {
    this.user = null;
  }


  private handleError<T>(operation = 'operation', result?: T)
  {
    return (error: any): Observable<T> =>
    {
      this.user = null;
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
