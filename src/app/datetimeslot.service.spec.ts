import { TestBed } from '@angular/core/testing';

import { DatetimeslotService } from './datetimeslot.service';

describe('DatetimeslotService', () => {
  let service: DatetimeslotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatetimeslotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
