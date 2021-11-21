import { ServerService } from '../../server.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentCalendar } from '../../AppointmentCalendar';
import { UserService } from '../../user.service';
import { User } from '../../User';

@Component({
  selector: 'app-my-calender',
  templateUrl: './my-calender.component.html',
  styleUrls: ['./my-calender.component.css']
})
export class MyCalenderComponent implements OnInit {

  appCalenderList:Array<AppointmentCalendar>=[];
  userID:number=0;
  

  constructor(private router:Router,private ss:ServerService,private us:UserService) {   
    this.us.getUser().subscribe(user=>{ 
             
      this.userID = user.getuserID();
      this.appCalenderList = user.getListMyAppointmentCalendars();    
     })
  
} 

  ngOnInit(): void {
    
  }
  createCal(){
  
    this.router.navigate(['guser/createCal']);
    
  }


}


