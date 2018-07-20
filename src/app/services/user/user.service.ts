import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {

	constructor() { }

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

	// doRegister(data){
		// 	return this.http.post('user-add.php',data);	
		// }
	}
