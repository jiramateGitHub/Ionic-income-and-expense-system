import { TestBed } from '@angular/core/testing';

import { MCategoriesTypeService } from './m-categories-type.service';

describe('MCategoriesTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MCategoriesTypeService = TestBed.get(MCategoriesTypeService);
    expect(service).toBeTruthy();
  });
});
