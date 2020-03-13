import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { TabReportPage } from './tab-report.page';

describe('TabReportPage', () => {
  let component: TabReportPage;
  let fixture: ComponentFixture<TabReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabReportPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TabReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
