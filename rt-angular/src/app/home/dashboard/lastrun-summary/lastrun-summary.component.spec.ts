import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastrunSummaryComponent } from './lastrun-summary.component';

describe('LastrunSummaryComponent', () => {
  let component: LastrunSummaryComponent;
  let fixture: ComponentFixture<LastrunSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastrunSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastrunSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
