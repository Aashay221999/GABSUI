import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MyCalenderComponent } from './my-calender.component';

describe('MyCalenderComponent', () => {
  let component: MyCalenderComponent;
  let fixture: ComponentFixture<MyCalenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyCalenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should Show button to create new calender',() => {
    expect(component).toHaveClass('create');
    }
  )
});
