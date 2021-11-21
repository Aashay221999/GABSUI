import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { AppointmentCalendar } from '../../AppointmentCalendar';
import { UserService } from '../../user.service';
import { ServerService } from '../../server.service';
import { User } from '../../User';
import { AppointmentEntity } from '../../AppointmentEntity';

@Component({
  selector: 'app-calenderdetail',
  templateUrl: './calenderdetail.component.html',
  styleUrls: ['./calenderdetail.component.css']
})
export class CalenderdetailComponent implements OnInit {
  acID:number = 0;  
  appointmentCalender:AppointmentCalendar;
  loggedUser:User;

  constructor(private router:Router, private activatedRoute:ActivatedRoute,private us:UserService, private serverComm:ServerService) {
    this.activatedRoute.params.subscribe((newparams)=>{
        this.acID=parseInt(newparams["AcID"]);
      })
    this.us.getUser().subscribe(user=>{ 
    
      this.loggedUser = user;
      let listAppointmentCalendar:Array<AppointmentCalendar> = [];
      listAppointmentCalendar = user.getListMyAppointmentCalendars(); 
      for(let i = 0; i<listAppointmentCalendar.length; i++)
      {
        if(listAppointmentCalendar[i].getAcID() == this.acID)
        {
          this.appointmentCalender = listAppointmentCalendar[i];
          break;
        }
      }
     })
    

  }
  
  public approve(AeID:number)
  {
    this.serverComm.approveAppointmentEntryByAeID(AeID).subscribe((response)=>{
      console.log(response);
      this.serverComm.getAppointmentEntriesByAcID(this.acID).subscribe((appointmentEntries)=>
      {
        console.log(appointmentEntries);
        let appEnt : Array<AppointmentEntity> = [];
        if (appointmentEntries.length != 0)
        {
          for (let i = 0; i < appointmentEntries.length; i++)
          {
            let date:Date = new Date(appointmentEntries[i].date);
            appEnt.push(new AppointmentEntity(appointmentEntries[i].aeID,
                appointmentEntries[i].appointmentCalendarID,appointmentEntries[i].ownerid, date, 
                appointmentEntries[i].isApproved, appointmentEntries[i].timeSlot, 
                appointmentEntries[i].apointeeid, appointmentEntries[i].description));
          }
        }
        console.log(appEnt[0].getAeID());
        
        this.loggedUser.getLMyAppointmentCalendarByAcid(this.acID).setListAppointmentEntries(appEnt);
        this.us.setUser(this.loggedUser);
      })
    })
  }
  public delete(AeID:number)
  {
    this.serverComm.rejectAppointmentEntryByAeID(AeID, this.acID).subscribe(reponse=>{
      console.log("Deleting");
      console.log(reponse);
      this.serverComm.getAppointmentEntriesByAcID(this.acID).subscribe((appointmentEntries)=>
      {
        console.log("AppointmentEntries ");
        console.log(appointmentEntries);
        let appEnt : Array<AppointmentEntity> = [];
        if (appointmentEntries.length != 0)
        {
          for (let i = 0; i < appointmentEntries.length; i++)
          {
            let date:Date = new Date(appointmentEntries[i].date);
            appEnt.push(new AppointmentEntity(appointmentEntries[i].aeID,
                appointmentEntries[i].appointmentCalendarID,appointmentEntries[i].ownerid, date, 
                appointmentEntries[i].isApproved, appointmentEntries[i].timeSlot, 
                appointmentEntries[i].apointeeid, appointmentEntries[i].description));
          }
        }  
        this.loggedUser.getLMyAppointmentCalendarByAcid(this.acID).setListAppointmentEntries(appEnt);
        this.us.setUser(this.loggedUser);
      })
      
    })
  }

  ngOnInit(): void {
  }

}
