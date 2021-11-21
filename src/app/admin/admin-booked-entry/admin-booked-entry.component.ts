import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/User';
import { AppointmentEntity } from 'src/app/AppointmentEntity';
import { ServerService } from 'src/app/server.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ShareAdminUserService } from 'src/app/share-admin-user.service';

@Component({
  selector: 'app-admin-booked-entry',
  templateUrl: './admin-booked-entry.component.html',
  styleUrls: ['./admin-booked-entry.component.css']
})
export class AdminBookedEntryComponent implements OnInit {
  appointmentEntries:Array<AppointmentEntity> = []
  userObject:User;
  userID:number;
  constructor(private sharedUser:ShareAdminUserService, private router:Router, private activatedRoute:ActivatedRoute,private serverComm:ServerService) 
  {
    this.activatedRoute.params.subscribe((newparams)=>{
        this.userID=parseInt(newparams["id"]);
      })
    this.sharedUser.getSharedUser().subscribe(user=>
      {
        this.userObject = user;
      })
    this.appointmentEntries = this.userObject.getListMyBookedAppointmentEntries();

  }

  ngOnInit(): void {
  }
  public delete(AeID:number)
  {
    this.serverComm.rejectAppointmentEntryByAeID(AeID, 1).subscribe(reponse=>{
      console.log("Deleting");
      console.log(reponse);
      this.router.navigate(['admin/adminuser']);
    })
  }

}
