import { Component, ElementRef, AfterViewInit } from '@angular/core';
import { AuthService, AppGlobals } from 'angular2-google-login';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})

export class AppComponent {

	// Add few students for initial listing
	studentsList = [
	{	
		id : "0",
		first_name : "Sangwin",
		last_name : "Gawande",
		email : "sangwin@gmail.com",
		phone : 9503733178,
		standard : 2,
		subject: "Civil"
	},
	{
		id : "1",
		first_name : "Oman",
		last_name : "Umir",
		email : "oman@gmail.com",
		phone : 8574889658,
		standard : 5,
		subject: "Electrical"
	},
	{
		id : "2",
		first_name : "Tina",
		last_name : "Dillon",
		email : "tina@gmail.com",
		phone : 7485889658,
		standard : 4,
		subject: "Civil"
	},
	{
		id : "3",
		first_name : "John",
		last_name : "Doe",
		email : "john@gmail.com",
		phone : 9685589748,
		standard : 6,
		subject: "Computer Science"
	},
	{
		id : "4",
		first_name : "Peter",
		last_name : "Parker",
		email : "peter@gmail.com",
		phone : 8595856547,
		standard : 8,
		subject: "Mechanical"
	}
	];

	constructor() {
		// Save students to localStorage
		localStorage.setItem('students', JSON.stringify(this.studentsList));
	}
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

  // function onSignIn(googleUser) {
  //   // Useful data for your client-side scripts:
  //   var profile = googleUser.getBasicProfile();
  //   console.log("ID: " + profile.getId()); // Don't send this directly to your server!
  //   console.log('Full Name: ' + profile.getName());
  //   console.log('Given Name: ' + profile.getGivenName());
  //   console.log('Family Name: ' + profile.getFamilyName());
  //   console.log("Image URL: " + profile.getImageUrl());
  //   console.log("Email: " + profile.getEmail());

  //   // The ID token you need to pass to your backend:
  //   var id_token = googleUser.getAuthResponse().id_token;
  //   console.log("ID Token: " + id_token);
  // };

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