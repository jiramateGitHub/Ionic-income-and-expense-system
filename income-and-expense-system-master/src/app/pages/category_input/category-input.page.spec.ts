import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CategoryInputPage } from './category-input.page';

describe('CategoryInputPage', () => {
  let component: CategoryInputPage;
  let fixture: ComponentFixture<CategoryInputPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryInputPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryInputPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
