import { Injectable } from '@angular/core';
import { RequestOptions, Request, RequestMethod, Http, Headers } from '@angular/http';
import { Observable } from '../../../../node_modules/rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class StudentService {
  // private studentList: StudentListObject;

  constructor(private _http: Http) {}

  // Get headers
  private getHeaders() {
    let headers = new Headers();
    headers.append("Content-Type", 'application/json');
    headers.append("Access-Control-Allow-Origin", '*');
    headers.append("Accept-Language", 'en');
    return headers;
  }

  // Get all students list via API or any data storage
  getAllStudents() {
    
    // if (localStorage.getItem('students') && localStorage.getItem('students') != '') {
    //   studentList = {
    //     code: 200,
    //     message: "Students List Fetched Successfully",
    //     data: JSON.parse(localStorage.getItem('students'))
    //   }
    // } else {
    //   studentList = {
    //     code: 200,
    //     message: "Students List Fetched Successfully",
    //     data: JSON.parse(localStorage.getItem('students'))
    //   }
    // }
    // return studentList;

    let url = "http://localhost:3000/studentList";
    let studentList: any;
    let returnData;
    let requestoptions = new RequestOptions({
      method: RequestMethod.Get,
      url: url,
      headers: this.getHeaders()
    })

    this._http.request(new Request(requestoptions))
      .map(res => res.json())
      .subscribe(Response => { 
        studentList = Response; 
        console.log('get------', studentList) 
      });
      returnData = {
        code: 200,
        message: "Student Successfully Updated",
        data: studentList
      }

    return returnData;
  }

  // Get all Subject List
  getAllSubjects() {
    // let subjectList: any;
    // if (localStorage.getItem('subjects') && localStorage.getItem('subjects') != '') {
    //   subjectList = {
    //     code: 200,
    //     message: "subjects List Fetched Successfully",
    //     data: JSON.parse(localStorage.getItem('subjects'))
    //   }
    // } else {
    //   subjectList = {
    //     code: 200,
    //     message: "subjects List Fetched Successfully",
    //     data: JSON.parse(localStorage.getItem('subjects'))
    //   }
    // }
    // return subjectList;

    let url = "http://localhost:3000/subjectList";
    let subjectList: any;
    let returnData;
    let requestoptions = new RequestOptions({
      method: RequestMethod.Get,
      url: url,
      headers: this.getHeaders()
    })

    this._http.request(new Request(requestoptions))
      .map(res => res.json())
      .subscribe(Response => { 
        subjectList = Response; 
        console.log('get------', subjectList) 
      });
      returnData = {
        code: 200,
        message: "Student Successfully Updated",
        data: subjectList
      }

    return returnData;
  }

  // Add/Register student to the list
  doRegisterStudent(data, index, subject): Observable<object> {
    var studentList: Array<any> = new Array<any>();
    // let url = "http://localhost:3000/getAll";
    // let requestoptions = new RequestOptions({
    //   method: RequestMethod.Get,
    //   url: url,
    //   headers: this.getHeaders()
    // })
    // var studentList;
    // this._http.request(new Request(requestoptions))
    //   .map(res => res.json())
    //   .subscribe(Response => { 
    //     studentList = Response; 
    //     console.log('get------', studentList) 
    //   });

    // let studentList = JSON.parse(localStorage.getItem('students'));
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

      let url = "http://localhost:3000/studentList";
        let requestoptions = new RequestOptions({
          method: RequestMethod.Post,
          url: url,
          headers: this.getHeaders(),
          body: data
        })

        this._http.request(new Request(requestoptions))
          .map(res => res.json())
            .subscribe(Response => { 
              studentList = Response; 
              console.log('pots----', studentList);
            });

      // localStorage.setItem('students', JSON.stringify(studentList));

      returnData = {
        code: 200,
        message: "Student Successfully Updated",
        data: studentList
      }
    } else {
      // data.id = this.generateRandomID();
      // if(this.studentList != undefined) {
      //   for (var i = 0; i < this.studentList.length; i++) {
      //     if (studentList[i].email == data.email) {
      //       returnData = {
      //         code: 503,
      //         message: "Email Address Already In Use",
      //         data: null
      //       }
      //       return returnData;
      //     }
      //   }
      // }
      
      data.id = this.generateRandomID();
      data['subject'] = subject;
      studentList = data;

      let url = "http://localhost:3000/studentList";
      let requestoptions = new RequestOptions({
        method: RequestMethod.Post,
        url: url,
        headers: this.getHeaders(),
        body: studentList
      })

      this._http.request(new Request(requestoptions))
        .map(res => res.json())
          .subscribe(Response => { 
            studentList = Response; 
            console.log('pots----', studentList);
          });

      // localStorage.setItem('students', JSON.stringify(studentList));
      returnData = {
        code: 200,
        message: "Student Successfully Added",
        data: studentList
      }
    }
    return returnData;
  }

  // Delete student
  deleteStudent(index: number) {
    // let studentList = JSON.parse(localStorage.getItem('students'));

    // studentList.splice(index, 1);

    // localStorage.setItem('students', JSON.stringify(studentList));

    // let returnData = {
    //   code: 200,
    //   message: "Student Successfully Deleted",
    //   data: JSON.parse(localStorage.getItem('students'))
    // }

    // return returnData;

    let studentList = this.getAllStudents();
    let returnData;
    studentList.splice(index, 1);

    let url = "http://localhost:3000/studentList";
      let requestoptions = new RequestOptions({
        method: RequestMethod.Post,
        url: url,
        headers: this.getHeaders(),
        body: studentList
      })

      this._http.request(new Request(requestoptions))
        .map(res => res.json())
          .subscribe(Response => { 
            studentList = Response;
          });

      returnData = {
        code: 200,
        message: "Student Successfully Deleted",
        data: studentList
      }

    return returnData;
  }

  // Update student
  updateStudent(value, id) {
    // let studentList = JSON.parse(localStorage.getItem('students'));

    // for (var i = 0; i < studentList.length; i++) {
    //   if (studentList[i].id == id) {
    //     studentList[i].subjects.value = value;
    //   }
    // }

    // localStorage.setItem('students', JSON.stringify(studentList));

    // let returnData = {
    //   code: 200,
    //   message: "Student Details Updated Successfully",
    //   data: JSON.parse(localStorage.getItem('students'))
    // }

    let studentList = this.getAllStudents();
    let returnData;

    for (var i = 0; i < studentList.length; i++) {
      if (studentList[i].id == id) {
        studentList[i].subjects.value = value;
      }
    }

    let url = "http://localhost:3000/studentList";
      let requestoptions = new RequestOptions({
        method: RequestMethod.Post,
        url: url,
        headers: this.getHeaders(),
        body: studentList
      })

      this._http.request(new Request(requestoptions))
        .map(res => res.json())
          .subscribe(Response => { 
            studentList = Response;
          });

      returnData = {
        code: 200,
        message: "Student Details Updated Successfully",
        data: studentList
      }

    return returnData;
  }

  // Get all student details
  getStudentDetails(id: number) {
    // let studentList = JSON.parse(localStorage.getItem('students'));
    // var i: number;
    // for (i = 0; i < studentList.length; i++) {
    //   if (studentList[i].id == id) {
    //     break;
    //   }
    // }

    // let returnData = {
    //   code: 200,
    //   message: "Student Details Fetched",
    //   studentData: studentList[i]
    // }

    // return returnData;

    let studentList = this.getAllStudents();

    var i: number;
    for (i = 0; i < studentList.length; i++) {
      if (studentList[i].id == id) {
        break;
      }
    }

    let returnData = {
      code: 200,
      message: "Student Details Fetched",
      studentData: studentList[i]
    }

    return returnData;
  }

  // Get all student by emailId
  getStudentDetailsByEmailId(email: string) {

    let studentList = this.getAllStudents();
    var i: number;
    // let studentList = JSON.parse(localStorage.getItem('students'));
    for (i = 0; i < studentList.length; i++) {
      if (studentList[i].email == email) {
        break;
      }
    }

    let returnData = {
      code: 200,
      message: "Student Details Fetched",
      studentData: studentList[i]
    }

    return returnData;
  }

  // Generate randomID
  generateRandomID() {
    var x = Math.floor((Math.random() * Math.random() * 9999));
    return x;
  }

}

// export class StudentListObject {
//   private id: string = '';
//   private first_name: string = '';
//   private last_name: string = '';
//   private email: string = '';
//   private phone: string = '';
//   private standard: string = '';
//   private subject: string = '';
// }

