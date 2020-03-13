import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TransferInputPage } from './transfer-input.page';

describe('TransferInputPage', () => {
  let component: TransferInputPage;
  let fixture: ComponentFixture<TransferInputPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferInputPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TransferInputPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
