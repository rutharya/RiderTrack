import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import {UserService} from "../../shared/services";

describe('ProfileComponent', () => {
  let profileComponent: ProfileComponent;
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let instance;



  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ ProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should show the user\'s first  name', () => {
    fixture.componentInstance.user.firstName = 'Hello World' ;
    fixture.detectChanges();
    expect(fixture.nativeElement.fname).toEqual('Hello World');
  });

  it('should show the user\'s last name', () => {
    fixture.componentInstance.user.lastName = 'Hello World' ;
    fixture.detectChanges();
    expect(fixture.nativeElement.lname).toEqual('Hello World');
  });

  it('should show the user\'s height', () => {
    fixture.componentInstance.user.height = 180 ;
    fixture.detectChanges();
    expect(fixture.nativeElement.fname).toEqual(180);
  });

  it('should show the user\'s weight', () => {
    fixture.componentInstance.user.weight = 75 ;
    fixture.detectChanges();
    expect(fixture.nativeElement.weight).toEqual(75);
  });

  it('should show the user\'s phonenumber', () => {
    fixture.componentInstance.user.phoneNo = 123456789;
    fixture.detectChanges();
    expect(fixture.nativeElement.phonenumber).toEqual(123456789);
  });

  it('should show the user\'s email', () => {
    fixture.componentInstance.user.email = 'a@gmail.com' ;
    fixture.detectChanges();
    expect(fixture.nativeElement.email).toEqual('a@gmail.com');
  });

  it('should show the user\'s address', () => {
    fixture.componentInstance.user.address = '123 euni' ;
    fixture.detectChanges();
    expect(fixture.nativeElement.address).toEqual('123 euni');
  });

 });
