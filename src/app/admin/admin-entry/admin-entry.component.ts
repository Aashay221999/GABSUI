import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/User';
import { AppointmentEntity } from 'src/app/AppointmentEntity';
import { ServerService } from 'src/app/server.service';
import { ShareAdminUserService } from 'src/app/share-admin-user.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-entry',
  templateUrl: './admin-entry.component.html',
  styleUrls: ['./admin-entry.component.css']
})
export class AdminEntryComponent implements OnInit {

  appointmentEntries:Array<AppointmentEntity> = []
  userObject:User;
  acID:number;
  constructor(private sharedUser:ShareAdminUserService, private router:Router, private activatedRoute:ActivatedRoute,private serverComm:ServerService) 
  {
    this.activatedRoute.params.subscribe((newparams)=>{
        this.acID=parseInt(newparams["acid"]);
      })
    this.sharedUser.getSharedUser().subscribe(user=>
      {
        this.userObject = user;
      })
  
    this.appointmentEntries = this.userObject.getLMyAppointmentCalendarByAcid(this.acID).getListAppointmentEntries();

  }

  ngOnInit(): void {
  }
  public delete(AeID:number)
  {
    this.serverComm.rejectAppointmentEntryByAeID(AeID, this.acID).subscribe(reponse=>{
      console.log("Deleting");
      console.log(reponse);
      
      this.router.navigate(['admin/adminuser']);
    })
  }

}
