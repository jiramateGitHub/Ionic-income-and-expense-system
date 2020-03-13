import { TestBed } from '@angular/core/testing';

import { MSubCategoriesService } from './m-sub-categories.service';

describe('MSubCategoriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MSubCategoriesService = TestBed.get(MSubCategoriesService);
    expect(service).toBeTruthy();
  });
});
