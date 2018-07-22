import { Injectable } from '@angular/core';
import { RequestOptions, Request, RequestMethod, Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from '../../../../node_modules/rxjs/Observable';


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

	getAllUsers(): Observable<Response> {
		// get all registered users
		var url = "http://localhost:3000/getAllUsers";
		var returnData;
		var requestoptions = new RequestOptions({
			method: RequestMethod.Get,
			url: url,
			headers: this.getHeaders()
		})

		var req = new Request(requestoptions);
		returnData = this._http.request(req)

		return returnData;
	}

	doRegister(data): Observable<Response> {

		// adding role to the user
		if(data.firstName == 'admin'){
			data.role = 'admin';
		} else if(data.firstName == 'teacher') {
			data.role = 'teacher';
		} else {
			data.role = 'student';
		}
		
		// register new user
		var returnData;
		var url = "http://localhost:3000/registerUser";
		var requestoptions = new RequestOptions({
			method: RequestMethod.Post,
			url: url,
			headers: this.getHeaders(),
			body: data
		})

		var req = new Request(requestoptions);
		returnData = this._http.request(req)

		return returnData;
	}

}

