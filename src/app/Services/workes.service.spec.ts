import { TestBed } from '@angular/core/testing';

import { WorkesService } from './workes.service';

describe('WorkesService', () => {
  let service: WorkesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
