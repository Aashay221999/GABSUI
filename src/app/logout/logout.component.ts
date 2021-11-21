import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { User } from '../User';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  userObject:User;
  constructor(private userService:UserService, private router:Router) {
    this.userService.getUser().subscribe(user=>{
      this.userObject = user;
      this.userObject.setIsLoggedIn(false);
    })
    this.userService.setUser(this.userObject)
    this.router.navigate(['login']);
   }

  ngOnInit(): void {
  }

}
