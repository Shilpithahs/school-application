import { Injectable } from '@angular/core';
import { RequestOptions, Request, RequestMethod, Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class UserService {

	constructor(private _http: Http) { }

	// Get headers
	private getHeaders() {
		let headers = new Headers();
		headers.append("Content-Type", 'application/json');
		headers.append("Access-Control-Allow-Origin", '*');
		headers.append("Accept-Language", 'en');
		return headers;
	}

	doLogin(data){
		if (data.email == "admin@gmail.com" && data.password == "admin123") {
			var incStr = data.email;
			if(incStr.includes('admin')) {
				data.admin = true;
				return {
					code : 200,
					message : "Login Successful",
					data : data
				};
			}
		} else if (data.email == "teacher@gmail.com" && data.password == "teacher123") {
			var incStr = data.email;
			if(incStr.includes('teacher')) {
				data.teacher = true;
				return {
					code : 200,
					message : "Login Successful",
					data : data
				};
			}
		}  else if (data.email == "student@gmail.com" && data.password == "student123") {
			var incStr = data.email;
			if(incStr.includes('student')) {
				data.student = true;
				return {
					code : 200,
					message : "Login Successful",
					data : data
				};
			}
		} else {
			return {
				code : 503,
				message : "Invalid Credentials",
				data : null
			};
		}
	}

	doRegister(data) {
		if(data.firstName == 'admin'){
			data.role = 'admin';
		} else if(data.firstName == 'teacher') {
			data.role = 'teacher';
		} else {
			data.role = 'student';
		}
		let user;
		let returnData;
		let url = "http://localhost:3000/user";
		  let requestoptions = new RequestOptions({
			method: RequestMethod.Post,
			url: url,
			headers: this.getHeaders(),
			body: data
		  })
	
		  this._http.request(new Request(requestoptions))
			.map(res => res.json())
			  .subscribe(Response => { 
				user = Response; 
				console.log('post register user----', user);
			  });
	
		  returnData = {
			code: 200,
			message: "User Registered Successfully Added",
			data: user
		  }
		return returnData;
	  }
	
	}
