import { TestBed } from '@angular/core/testing';

import { MCurrentcyService } from './m-currentcy.service';

describe('MCurrentcyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MCurrentcyService = TestBed.get(MCurrentcyService);
    expect(service).toBeTruthy();
  });
});
