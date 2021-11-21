import { Component, OnInit } from '@angular/core';
import { AppointmentCalendar } from 'src/app/AppointmentCalendar';
import { ServerService } from 'src/app/server.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ShareAdminUserService } from 'src/app/share-admin-user.service';
import { User } from 'src/app/User';

@Component({
  selector: 'app-admin-cal',
  templateUrl: './admin-cal.component.html',
  styleUrls: ['./admin-cal.component.css']
})
export class AdminCalComponent implements OnInit {
  appointmentCalendars:Array<AppointmentCalendar> = [];
  userObject:User;
  constructor(private sharedUser:ShareAdminUserService, private router:Router, private activatedRoute:ActivatedRoute,private serverComm:ServerService) {

    this.sharedUser.getSharedUser().subscribe(user=>
      {
        this.userObject = user;
      })
    this.appointmentCalendars = this.userObject.getListMyAppointmentCalendars();
    console.log(this.appointmentCalendars);
    
  }

  ngOnInit(): void {
  }
  
  public delete(acID:number)
  {
    this.serverComm.deleteAppointmentCalendarByAcID(acID).subscribe(reponse=>{
      console.log("Deleting");
      console.log(reponse);
      
      this.router.navigate(['admin/adminuser']);
    })
    
  }
  

}
