import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppentrybycalenderComponent } from './appentrybycalender.component';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { UserService } from '../user.service';
import { PortService } from '../port.service';
import { ServerService } from '../server.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
//import { RouterTestingModule } from "@angular/router/testing";
describe('AppentrybycalenderComponent', () => {
  let component: AppentrybycalenderComponent;
  let fixture: ComponentFixture<AppentrybycalenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppentrybycalenderComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [UserService, PortService, ServerService,HttpClient,RouterModule,ActivatedRoute, Router],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppentrybycalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create',() => {
      expect(component).toBeTruthy();
    }
  )
});
