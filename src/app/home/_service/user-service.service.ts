import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(
    private http: HttpClient,
  ) { }

  getAllUsers(){
      return this.http.get(`https://api.github.com/users`)
      .pipe(
          map((res:any) => {
              console.log(res);
              return res;
          }),
          catchError(this.handleError)
      );
  }

  getDetailUser(UserName:string){
      return this.http.get(`https://api.github.com/users/${UserName}/repos`)
      .pipe(
        map((res:any)=>{
            return res;
        }),
        catchError(this.handleError)
      );
  }

  searchUser(SerchString:any){
      return this.http.get(`https://api.github.com/search/users?q=${SerchString}`)
      .pipe(
          map((res:any)=>{
              return res;
          }),
          catchError(this.handleError)
      );
  }

  handleError(error) {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
      } else {
          // server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      window.alert(errorMessage);
      return throwError(errorMessage);
  }
}
