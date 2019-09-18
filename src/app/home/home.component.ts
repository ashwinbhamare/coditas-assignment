import { Component, OnInit, ViewChild } from '@angular/core'; 
import { UserServiceService } from './_service/user-service.service'; 
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "sort"
})

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  userDetail:any;
  user:any;
  datasource: null;
  length:number;
  p: number = 1;  
  isLoadingResults = true;
  sortorder = 'login';  
  hasClass:any;9

  constructor(private userService: UserServiceService) { }
  
  ngOnInit() {
    this.getAllUsers(); //loading user data
  }

  // get all users
  getAllUsers(event=""){
      this.isLoadingResults = true;
      this.userService.getAllUsers()
      .subscribe((res:any)=>{
          if(res){ 
              this.datasource = res;
              this.length = res.length;
              this.user = res;
              this.isLoadingResults = false;
          }
      })
  } 

  // Get UserDetail
  getUserDetail(event, username){
    this.isLoadingResults = true;
      if(event.target.textContent == 'Details'){
          event.target.textContent = 'Collapse';
      }else if(event.target.textContent == 'Collapse'){
        event.target.textContent = 'Details';
      }
      
      this.userService.getDetailUser(username)
      .subscribe((res:any)=>{
          if(res){
              this.userDetail = res;
              this.isLoadingResults = false;
          }
      })
  }

  // Get Searched User
  searchUser(event){
      this.isLoadingResults = true;
      this.userService.searchUser(event.target.value)
      .subscribe((res:any)=>{
          if(res){
              this.user = res.items;
              console.log(this.user);
              this.isLoadingResults = false;
          }
      })
  }

  // Sort User Array
  sort(event){
      if(event.target.value == 'a'){
          this.user.sort(function(a, b){
              var nameA=a.login.toLowerCase(), nameB=b.login.toLowerCase();
              if (nameA < nameB) //sort string ascending
                  return -1;
              if (nameA > nameB)
                  return 1;
                  return 0; //default return value (no sorting)
          });
      }else if(event.target.value == 'z'){ 
        this.user.sort(function(a, b){
            var nameA=a.login.toLowerCase(), nameB=b.login.toLowerCase();
            if (nameA < nameB) //sort string descending
                return 1;
            if (nameA > nameB)
                return -1;
                return 0; //default return value (no sorting)
          });
      }
    }

}
