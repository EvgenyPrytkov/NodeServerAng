import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { API } from '../../environments/constants';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  // httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-type': 'application/json'
  //   })
  // }

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(API.users)
      .pipe(tap(_ => console.log('users fetched')))
  }

  getUser(id: number): Observable<User[]> {
    const url = `${API.users}/users/${id}`;
    return this.http.get<User[]>(url)
      .pipe(tap(_ => console.log(`fetched user id = ${id}`)),
        catchError(this.handleError<User[]>(`getUser id=${id}`)));
  }

  updateUser(user: User) {
    return this.http.post((API.users + "/users"), user)
      .pipe(
        // return this.http.put(API.users, user, this.httpOptions).pipe(
        tap(_ => console.log(`updated user id= ${user.id}`)),
        catchError(this.handleError<any>('updateUser'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    }
  }
}
