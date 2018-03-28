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
    fixture.componentInstance.fname = 'Hello World' ;
    fixture.detectChanges();
    expect(fixture.nativeElement.fname).toEqual('Hello World');
  });

  it('should show the user\'s last name', () => {
    fixture.componentInstance.lname = 'Hello World' ;
    fixture.detectChanges();
    expect(fixture.nativeElement.lname).toEqual('Hello World');
  });

  it('should show the user\'s height', () => {
    fixture.componentInstance.height = 180 ;
    fixture.detectChanges();
    expect(fixture.nativeElement.fname).toEqual(180);
  });

  it('should show the user\'s weight', () => {
    fixture.componentInstance.weight = 75 ;
    fixture.detectChanges();
    expect(fixture.nativeElement.weight).toEqual(75);
  });

  it('should show the user\'s phonenumber', () => {
    fixture.componentInstance.phonenumber = '0123456789' ;
    fixture.detectChanges();
    expect(fixture.nativeElement.phonenumber).toEqual('0123456789');
  });

  it('should show the user\'s email', () => {
    fixture.componentInstance.email = 'a@gmail.com' ;
    fixture.detectChanges();
    expect(fixture.nativeElement.email).toEqual('a@gmail.com');
  });

  it('should show the user\'s address', () => {
    fixture.componentInstance.address = '123 euni' ;
    fixture.detectChanges();
    expect(fixture.nativeElement.address).toEqual('123 euni');
  });

  it('should show the user\'s address2', () => {
    fixture.componentInstance.fname = 'Hello World' ;
    fixture.detectChanges();
    expect(fixture.nativeElement.address2).toEqual('Hello World');
  });

  it('should show the user\'s city', () => {
    fixture.componentInstance.city = 'Hello World' ;
    fixture.detectChanges();
    expect(fixture.nativeElement.city).toEqual('Hello World');
  });

  it('should show the user\'s zipcode', () => {
    fixture.componentInstance.zipcode = 'Hello World' ;
    fixture.detectChanges();
    expect(fixture.nativeElement.zipcode).toEqual('Hello World');
  });

  it('should show the user\'s state', () => {
    fixture.componentInstance.state = 'Hello World' ;
    fixture.detectChanges();
    expect(fixture.nativeElement.state).toEqual('Hello World');
  });

 });
