import { TestBed } from '@angular/core/testing';

import { MWalletService } from './m-wallet.service';

describe('MWalletService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MWalletService = TestBed.get(MWalletService);
    expect(service).toBeTruthy();
  });
});
