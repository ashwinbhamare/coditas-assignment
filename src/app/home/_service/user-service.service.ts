import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

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
          })
      )
  }

  getDetailUser(UserName:string){
      return this.http.get(`https://api.github.com/users/${UserName}/repos`)
      .pipe(
        map((res:any)=>{
            return res;
        })
      )
  }

}
