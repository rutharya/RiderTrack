import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiderEventsComponent } from './rider-events.component';

describe('RiderEventsComponent', () => {
  let component: RiderEventsComponent;
  let fixture: ComponentFixture<RiderEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiderEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiderEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
