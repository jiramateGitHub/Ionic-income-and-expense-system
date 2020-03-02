import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TransactionInputPage } from './transaction-input.page';

describe('TransactionInputPage', () => {
  let component: TransactionInputPage;
  let fixture: ComponentFixture<TransactionInputPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionInputPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionInputPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
