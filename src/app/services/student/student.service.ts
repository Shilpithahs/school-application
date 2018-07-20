import { Injectable } from '@angular/core';

@Injectable()
export class StudentService {

  constructor() { }

  // Get all students list via API or any data storage
  getAllStudents() {
    let studentList: any;
    if (localStorage.getItem('students') && localStorage.getItem('students') != '') {
      studentList = {
        code: 200,
        message: "Students List Fetched Successfully",
        data: JSON.parse(localStorage.getItem('students'))
      }
    } else {
      studentList = {
        code: 200,
        message: "Students List Fetched Successfully",
        data: JSON.parse(localStorage.getItem('students'))
      }
    }
    return studentList;
  }

  getAllSubjects() {
    let subjectList: any;
    if (localStorage.getItem('subjects') && localStorage.getItem('subjects') != '') {
      subjectList = {
        code: 200,
        message: "subjects List Fetched Successfully",
        data: JSON.parse(localStorage.getItem('subjects'))
      }
    } else {
      subjectList = {
        code: 200,
        message: "subjects List Fetched Successfully",
        data: JSON.parse(localStorage.getItem('subjects'))
      }
    }
    return subjectList;
  }

  doRegisterStudent(data, index, subject) {
    let studentList = JSON.parse(localStorage.getItem('students'));
    let returnData;
    console.log("index", index);
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
      if(subject != undefined) {
        data['subject'] = subject;
      }
      
      studentList[index] = data;
      localStorage.setItem('students', JSON.stringify(studentList));
      returnData = {
        code: 200,
        message: "Student Successfully Updated",
        data: JSON.parse(localStorage.getItem('students'))
      }
    } else {
      data.id = this.generateRandomID();
      for (var i = 0; i < studentList.length; i++) {
        if (studentList[i].email == data.email) {
          returnData = {
            code: 503,
            message: "Email Address Already In Use",
            data: null
          }
          return returnData;
        }
      }
      data['subject'] = subject;
      studentList.unshift(data);

      localStorage.setItem('students', JSON.stringify(studentList));

      returnData = {
        code: 200,
        message: "Student Successfully Added",
        data: JSON.parse(localStorage.getItem('students'))
      }
    }
    return returnData;
  }

  deleteStudent(index: number) {
    let studentList = JSON.parse(localStorage.getItem('students'));

    studentList.splice(index, 1);

    localStorage.setItem('students', JSON.stringify(studentList));

    let returnData = {
      code: 200,
      message: "Student Successfully Deleted",
      data: JSON.parse(localStorage.getItem('students'))
    }

    return returnData;
  }

  updateStudent(value, id) {
    let studentList = JSON.parse(localStorage.getItem('students'));

    for(var i = 0; i < studentList.length; i++) {
      if(studentList[i].id == id) {
        studentList[i].subjects.value = value;
      }
    }

    localStorage.setItem('students', JSON.stringify(studentList));

    let returnData = {
      code: 200,
      message: "Student Details Updated Successfully",
      data: JSON.parse(localStorage.getItem('students'))
    }

  }

  getStudentDetails(id: number) {
    let studentList = JSON.parse(localStorage.getItem('students'));
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
  getStudentDetailsByEmailId(email: string) {
    var i: number;
    let studentList = JSON.parse(localStorage.getItem('students'));
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


  generateRandomID() {
    var x = Math.floor((Math.random() * Math.random() * 9999));
    return x;
  }

}
