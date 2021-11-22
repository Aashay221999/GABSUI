import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BookentryComponent } from './bookentry.component';

describe('BookentryComponent', () => {
  let component: BookentryComponent;
  let fixture: ComponentFixture<BookentryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookentryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should Show form to book entries',() => {
    expect(component).toHaveClass('form-group');
    }
  )
});
