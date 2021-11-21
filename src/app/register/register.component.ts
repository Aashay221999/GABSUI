import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  error: string = "";
  constructor(private formBuilder: FormBuilder, private router: Router, private serverComm:ServerService) {
    this.registerForm = new FormGroup({
            userID: new FormControl('', [Validators.required, Validators.max(9999999999)]),
            username: new FormControl('', Validators.required),
            password: new FormControl('', [Validators.required, Validators.minLength(6)]),
            email: new FormControl('', [Validators.required, Validators.email]),
            mobile: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
            dob :new FormControl('', Validators.required)
        });
   }

  ngOnInit(): void {
    
    }
  
  public onSubmit():void {
   
    this.serverComm.addUser(this.registerForm.value.userID, this.registerForm.value.username, 
        this.registerForm.value.mobile, this.registerForm.value.dob, this.registerForm.value.email, this.registerForm.value.password)
      .subscribe(response=>{
        if(response == true)
        {
          console.log("User Inserted");
          this.router.navigate(['login']);
        }
        else
        {
          this.error = "Username already Exists";
        }
      })
    


  }
}
