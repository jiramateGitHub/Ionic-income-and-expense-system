import { TestBed } from '@angular/core/testing';

import { MCategoriesService } from './m-categories.service';

describe('MCategoriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MCategoriesService = TestBed.get(MCategoriesService);
    expect(service).toBeTruthy();
  });
});
