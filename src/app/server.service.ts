import { Injectable } from '@angular/core';
import { PortService } from './port.service';
import { HttpClient } from '@angular/common/http';
import { User } from './User';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from './user.service';
import { AppointmentEntity } from './AppointmentEntity';
import { AppointmentCalendar } from './AppointmentCalendar';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  portNo:string;
  constructor(private portNumber:PortService, private http:HttpClient, private userService:UserService) {
    this.portNo = portNumber.getPortNumber();
   }


  public getUser(userName:string):Observable<any>
  {
    return this.http.get<User>('http://localhost:'+ this.portNo+ "/users/"+userName)
    .pipe(
      catchError(error => {
        console.log(error);
        return throwError(error);
        
      })
    );
  }

  public addUser(userID:number,userName:string, mobileNumber:string, DoB:string, email:string, password:string) : Observable<any>
  {
    let jsonObject = {
      'userID':userID,
      'userName':userName,
      'mobileNumber':mobileNumber,
      'Dob':DoB,
      'email':email,
      'isAdmin':false,
      'password':password
    }
    return this.http.post('http://localhost:'+ this.portNo+'/reg/'+DoB, jsonObject)
  }

  public getAppointmentEntriesByOwner(userID:number):Observable<any>
  {
    return this.http.get<AppointmentEntity[]>('http://localhost:'+ this.portNo+"/home/"+ userID.toString());
  }

  public addAppointmentCalendar(acID:number,userID:number, type:string, location:string,description:string):Observable<any>
  {
    let jsonObject = {
      'acID':acID,
      'userID':userID,
      'type':type,
      'location':location,
      'description':description
    }
    console.log(jsonObject);
    
    return this.http.post('http://localhost:'+ this.portNo+'/ac/'+userID.toString()+'/createacform', jsonObject);
  }

  public getAppointmentCalendar(userID:number):Observable<any>
  {
    return this.http.get<AppointmentCalendar[]>('http://localhost:'+ this.portNo+"/ac/"+ userID.toString());
  }

  public deleteAppointmentCalendarByAcID(acID:number):Observable<any>
  {
    return this.http.delete('http://localhost:'+ this.portNo+"/ac/"+ acID.toString());
  }

  public getApprovedAppointmentEntriesByAcID(acID:number):Observable<any>
  {
    return this.http.get<AppointmentEntity[]>('http://localhost:'+ this.portNo+"/ac/"+ acID.toString()+'/approved');
  }

  public getAppointmentEntriesByAcID(acID:number):Observable<any>
  { 
    return this.http.get<AppointmentEntity[]>('http://localhost:'+ this.portNo+"/ac/appEL/"+ acID.toString());
  }


  public getNotApprovedAppointmentEntriesByAcID(acID:number):Observable<any>
  {
    return this.http.get<AppointmentEntity[]>('http://localhost:'+ this.portNo+"/ac/"+ acID.toString()+'/notapproved');
  }
  
  public approveAppointmentEntryByAeID(aeID:number):Observable<any>
  {
    return this.http.put('http://localhost:'+ this.portNo+'/ac/ae/approve/'+aeID.toString(),null);
  }
  public rejectAppointmentEntryByAeID(aeID:number, acID:number):Observable<any>
  {
    return this.http.delete('http://localhost:'+ this.portNo+'/ac/' + acID.toString()+ '/reject/' +aeID.toString());
  }

  public getAppointmentCalendarBySearch(searchText:string, searchCriteria:string):Observable<any>
  {
    return this.http.get<AppointmentCalendar[]>('http://localhost:'+ this.portNo + '/book/search/'+ searchText + '/' + searchCriteria);
  }
  public getUnbookedAppointmentEntitiesByAcIDAndDate(acID:number, date:string):Observable<any>
  {
    return this.http.get<number[]>('http://localhost:'+ this.portNo + '/book/'+acID+'/'+date);
  }

  public addAppointmentEntry(userID:number, acID:number,aeID:number,date:string, isApproved:boolean, timeSlot:number,description:string):Observable<any>
  {
    let jsonObject = {
      'aeID':aeID,
      'date':date,
      'isApproved':false,
      'timeSlot':timeSlot,
      'description':description
    }
    return this.http.post('http://localhost:'+ this.portNo+'/book/'+userID.toString()+'/'+ acID.toString() +'/createaeform', jsonObject);
  }


}
