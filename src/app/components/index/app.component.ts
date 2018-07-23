import { Component, ElementRef, AfterViewInit } from '@angular/core';
//import { AuthService, AppGlobals } from 'angular2-google-login';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})

export class AppComponent {

	constructor() {}
}

declare const gapi: any;

@Component({
  selector: 'google-signin',
  template: '<div class="g-signin2"></div>'
})
export class GoogleSigninComponent implements AfterViewInit {

  private clientId:string = '803664456231-d8o60rr03d73lbjofa5dqrc6v3hskhbf.apps.googleusercontent.com';
  
  private scope = [
    'profile',
    'email',
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/contacts.readonly',
    'https://www.googleapis.com/auth/admin.directory.user.readonly'
  ].join(' ');

  public auth2: any;
  
  public googleInit() {
    
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: this.clientId,
        cookiepolicy: 'single_host_origin',
        scope: this.scope
      });
      this.attachSignin(this.element.nativeElement.firstChild);
    });
  }
  
  public attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        let profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
      }, function (error) {
        console.log(JSON.stringify(error, undefined, 2));
      });
  }

  constructor(private element: ElementRef) {
    console.log('ElementRef: ', this.element);
  }

	// ngOnInit() {
	// 	AppGlobals.GOOGLE_CLIENT_ID = this.clientId;
  // }
  
  ngAfterViewInit() {
    this.googleInit();
  }

}