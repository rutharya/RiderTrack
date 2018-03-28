import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPwdComponent } from './forgot-pwd.component';

describe('ForgotPwdComponent', () => {
  let component: ForgotPwdComponent;
  let fixture: ComponentFixture<ForgotPwdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPwdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show the page_title', () => {
    fixture.componentInstance.page_title = 'Hello World' ;
    fixture.detectChanges();
    expect(fixture.nativeElement.fname).toEqual('Hello World');
  });

});
