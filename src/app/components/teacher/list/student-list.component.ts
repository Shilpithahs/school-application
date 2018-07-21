 import { Component, OnInit } from '@angular/core';
 import { ToastrService } from 'ngx-toastr';

 // Services
 import { StudentService } from '../../../services/student/student.service';
 import { routerTransition } from '../../../services/config/config.service';

 @Component({
 	selector: 'app-student-list',
 	templateUrl: './student-list.component.html',
 	styleUrls: ['./student-list.component.css'],
 	animations: [routerTransition()],
 	host: {'[@routerTransition]': ''}
 })

 export class StudentListComponent implements OnInit {
 	studentList:any;
 	subjectList:any;
	studentListData:any;

	constructor(private studentService:StudentService,private toastr: ToastrService) { }
	 
 	// Call studentList and subjectList function on page load 
 	ngOnInit() {
		this.getStudentList();
		this.getSubjectList();
 	}

 	// Get student list from services
 	getStudentList(){
 		let studentList = this.studentService.getAllStudents();
 		this.success(studentList)
	}
	 
	getSubjectList(){
		this.subjectList = this.studentService.getAllSubjects().data;
	}

 	// Get student list success
 	success(data){
 		this.studentListData = data.data;
 		for (var i = 0; i < this.studentListData.length; i++) {
 			this.studentListData[i].name = this.studentListData[i].first_name +' '+ this.studentListData[i].last_name;
 		}
 	}

 	// Delete a student
 	deleteStudent(index:number){
 		// get confirm box for confirmation
 		let r = confirm("Are you sure?");
 		if (r == true) {
 			let studentDelete = this.studentService.deleteStudent(index);
 			if(studentDelete) {
 				this.toastr.success("Success", "Student Deleted");
 			} 
 			this.getStudentList();
 		}
	}
	 
	// on dropdown select change
	dropDownChanged(value, studentId) {
		this.studentList.forEach(student => {
			if(student.id == studentId) {
				student.subject = value;
				this.updateStudent(student.subject, student.id)
			}
		});
	}
	
	// Update a student
	updateStudent(subject: string, id: number){
		this.subjectList = this.studentService.updateStudent(subject, id);
	}
}