import { TestBed } from '@angular/core/testing';

import { MTransectionService } from './m-transection.service';

describe('MTransectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MTransectionService = TestBed.get(MTransectionService);
    expect(service).toBeTruthy();
  });
});
