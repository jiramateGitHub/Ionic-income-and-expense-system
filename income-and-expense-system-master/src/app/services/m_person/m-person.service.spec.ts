import { TestBed } from '@angular/core/testing';

import { MPersonService } from './m-person.service';

describe('MPersonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MPersonService = TestBed.get(MPersonService);
    expect(service).toBeTruthy();
  });
});
