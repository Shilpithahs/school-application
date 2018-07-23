import { Injectable } from '@angular/core';
import { RequestOptions, Request, RequestMethod, Http, Headers } from '@angular/http';
import { Observable } from '../../../../node_modules/rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class StudentService {

  constructor(private _http: Http) {}

  // Get headers
  private getHeaders() {
    let headers = new Headers();
    headers.append("Content-Type", 'application/json');
    headers.append("Access-Control-Allow-Origin", '*');
    headers.append("Accept-Language", 'en');
    
    return headers;
  }

  // Get all students list
  getAllStudents() {

    let url = "http://localhost:3000/getAllStudents";
    let studentList: any;
    let returnData;
    let requestoptions = new RequestOptions({
      method: RequestMethod.Get,
      url: url,
      headers: this.getHeaders()
    })

    var req = new Request(requestoptions);
		returnData = this._http.request(req)

		return returnData;
  }

  // Get all Subject List
  getAllSubjects(): Observable<Response> {

    let url = "http://localhost:3000/getAllSubjects";
    let subjectList: any;
    let returnData;
    let requestoptions = new RequestOptions({
      method: RequestMethod.Get,
      url: url,
      headers: this.getHeaders()
    })

    var req = new Request(requestoptions);
		returnData = this._http.request(req)

		return returnData;
  }

  // Add subject
  addSubject(data): Observable<Response> {

    let url = "http://localhost:3000/addSubject";
    let returnData;
    let requestoptions = new RequestOptions({
      method: RequestMethod.Post,
      url: url,
      headers: this.getHeaders(),
      body: data
    })

    var req = new Request(requestoptions);
		returnData = this._http.request(req)

		return returnData;
  }

  // Add/Register student to the list
  addStudent(data, index, subject): Observable<object> {

    var studentList: Array<any> = new Array<any>();
    let returnData;
    if (index != null) {
      for (var i = 0; i < studentList.length; i++) {
        if (index != studentList[i]['id'] && studentList[i].email == data.email) {
          returnData = {
            code: 503,
            message: "Email Address Already In Use",
            data: null
          }
          return returnData;
        }
      }

      if (subject != undefined) {
        data['subject'] = subject;
      }
      studentList[index] = data;

      let url = "http://localhost:3000/addSutudent";
        let requestoptions = new RequestOptions({
          method: RequestMethod.Post,
          url: url,
          headers: this.getHeaders(),
          body: data
        })

      this._http.request(new Request(requestoptions))
        .map(res => res.json())

    } else {
      
      data.id = this.generateRandomID();
      data['subject'] = subject;

      let url = "http://localhost:3000/addStudent";
      let requestoptions = new RequestOptions({
        method: RequestMethod.Post,
        url: url,
        headers: this.getHeaders(),
        body: data
      })

      var req = new Request(requestoptions);
      returnData = this._http.request(req)
      
    }
    return returnData;
  }

  // Delete student
  deleteStudent(data): Observable<object> {

    let returnData;
    let url = "http://localhost:3000/deleteStudent";
      let requestoptions = new RequestOptions({
        method: RequestMethod.Delete,
        url: url,
        headers: this.getHeaders(),
        body: data
      })

      var req = new Request(requestoptions);
      returnData = this._http.request(req)
  
      return returnData;
  }

  // Update student
  updateStudent(value): Observable<Response> {

    let returnData;
    let url = "http://localhost:3000/updateStudent";
      let requestoptions = new RequestOptions({
        method: RequestMethod.Put,
        url: url,
        headers: this.getHeaders(),
        body: value
      })

      var req = new Request(requestoptions);
      returnData = this._http.request(req)

    return returnData;
  }

  // Generate randomID
  generateRandomID() {
    var x = Math.floor((Math.random() * Math.random() * 9999));
    return x;
  }

}
