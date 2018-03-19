import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MystatsSummaryComponent } from './mystats-summary.component';

describe('MystatsSummaryComponent', () => {
  let component: MystatsSummaryComponent;
  let fixture: ComponentFixture<MystatsSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MystatsSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MystatsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
