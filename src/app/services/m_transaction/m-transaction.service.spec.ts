import { TestBed } from '@angular/core/testing';

import { MTransactionService } from './m-transaction.service';

describe('MTransactionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MTransactionService = TestBed.get(MTransactionService);
    expect(service).toBeTruthy();
  });
});
