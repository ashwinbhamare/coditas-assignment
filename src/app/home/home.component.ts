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
                if(res != 'f'){ 
                    this.datasource = res;
                    this.length = res.length;
                    this.user = res;
                    this.isLoadingResults = false;
                }else{
                    this.isLoadingResults = false;
                }
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
      console.log(event);
      this.isLoadingResults = true;
        if(event.trim()){
            this.userService.searchUser(event)
            .subscribe((res:any)=>{
                if(res){

                    if(res != 'f'){
                        this.user = res.items;
                        this.length = res.items.length;
                        this.isLoadingResults = false;
                    }else{
                        this.isLoadingResults = false;
                    }
                }
            })
        }else{
            this.getAllUsers();
        }
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
        }else if(event.target.value == '1'){
            this.user.sort(function(a, b){
                var nameA=a.id, nameB=b.id;
                if (nameA < nameB) //sort string descending
                    return -1;
                if (nameA > nameB)
                    return 1;
                    return 0; //default return value (no sorting)
            });
        }else if(event.target.value == '2'){
            this.user.sort(function(a, b){
                var nameA=a.id, nameB=b.id;
                if (nameA < nameB) //sort string descending
                    return 1;
                if (nameA > nameB)
                    return -1;
                    return 0; //default return value (no sorting)
            });
        } 
    }

}
