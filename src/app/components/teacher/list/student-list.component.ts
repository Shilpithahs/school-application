 import { Component, OnInit, Input } from '@angular/core';
 import { ToastrService } from 'ngx-toastr';

 // Services
 import { StudentService } from '../../../services/student/student.service';
 import { routerTransition } from '../../../services/config/config.service';
import { Router } from '../../../../../node_modules/@angular/router';

 @Component({
 	selector: 'app-student-list',
 	templateUrl: './student-list.component.html',
 	styleUrls: ['./student-list.component.css'],
 	animations: [routerTransition()],
 	host: {'[@routerTransition]': ''}
 })

 export class StudentListComponent implements OnInit {
	 static updateForm(arg0: any): any {
		 throw new Error("Method not implemented.");
	 }
 	studentList:any;
 	subjectList:any;
	studentListData:any;

	@Input() studentForm;

	constructor(private studentService:StudentService, private toastr: ToastrService, private router: Router) { }
	 
 	// Call studentList and subjectList function on page load 
 	ngOnInit() {
		this.getStudentList();
	}

 	// Get all student list
 	getStudentList(){
		this.studentService.getAllStudents().subscribe((response: Response) => {
			if(response.status == 200) {
				this.studentList = JSON.parse(response['_body']);
				this.router.navigate(['/teacher/studentList']);
				this.toastr.success('Success', 'Successfully loaded student list');
			}
		});
	}

 	// Delete a student
 	deleteStudent(index:number){

		this.studentService.getAllStudents().subscribe((response: Response) => {
			if(response.status == 200) {
				var data = JSON.parse(response['_body']);
				for(var i = 0; i< data.length; i++) {
					if(data[i]['id'] == index) {
						this.studentService.deleteStudent({id: data[i].id}).subscribe((response: Response) => {
							if(response.status == 200) {
								this.getStudentList();
								window.location.reload();
								this.router.navigate(['/teacher/studentList']);
								this.toastr.success('Success', 'Student Deleted Successfully');
							} else {
								this.router.navigate(['/teacher/studentList']);
								this.toastr.error('Failed', 'Unable to delete student detail');
							}
						});
					}
				}
			}
		});
	}
	
}