import { Component, OnInit } from '@angular/core'; 
import { UserServiceService } from './_service/user-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userDetail:any;
  user:any;
  constructor(private userService: UserServiceService) { }
  
  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers(){
    this.userService.getAllUsers()
    .subscribe((res:any)=>{
        if(res){
          
          this.user = res;
        }
    })
  }

  getUserDetail(username){
    this.userService.getDetailUser(username)
    .subscribe((res:any)=>{
        if(res){
          this.userDetail = res
          console.log(res);
        }
    })
  }

}
