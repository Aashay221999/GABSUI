import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBookedEntryComponent } from './admin-booked-entry.component';

describe('AdminBookedEntryComponent', () => {
  let component: AdminBookedEntryComponent;
  let fixture: ComponentFixture<AdminBookedEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBookedEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBookedEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
