import { TestBed, inject } from '@angular/core/testing';

import { AbalityService } from './abality.service';

describe('AbalityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AbalityService]
    });
  });

  it('should be created', inject([AbalityService], (service: AbalityService) => {
    expect(service).toBeTruthy();
  }));
});
