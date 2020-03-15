import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WalletInputPage } from './wallet-input.page';

describe('WalletInputPage', () => {
  let component: WalletInputPage;
  let fixture: ComponentFixture<WalletInputPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletInputPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WalletInputPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
