import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { StudentListComponent } from '../list/student-list.component';

// Services
import { ValidationService } from '../../../services/config/config.service';
import { StudentService } from '../../../services/student/student.service';
import { routerTransition } from '../../../services/config/config.service';

import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'add-student',
	templateUrl: './add-student.component.html',
	styleUrls: ['./add-student.component.css'],
	animations: [routerTransition()],
	host: { '[@routerTransition]': '' }
})

export class AddStudentComponent implements OnInit {
	// create studentAddForm of type FormGroup 
	private studentAddForm: FormGroup;
	private selectedSubject: string;
	index: any;
	studentList: any;
	subjectList: any;

	@Output() studentForm = new EventEmitter();

	constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private studentService: StudentService, private toastr: ToastrService) {
		// Check for route params
		this.route.params.subscribe(params => {
			this.index = params['id'];
			// check if ID exists in route & call update or add methods accordingly
			if (this.index && this.index != null && this.index != undefined) {
				this.getStudentDetails(this.index);
			} else {
				this.createForm(null);
			}
		});
	}

	ngOnInit() {
		this.getSubjectList();
	}

	// Submit student details form
	addStudent() {

		var value: boolean = true;
		if (this.index && this.index != null && this.index != undefined) {
			this.studentAddForm.value.id = this.index;
			this.studentService.getAllStudents().subscribe((response: Response) => {
				if(response.status == 200) {
					var data = JSON.parse(response['_body']);
					for(var i = 0; i< data.length; i++) {
						if(data[i]['id'] == this.studentAddForm.value.id) {
							data[i]['email'] = this.studentAddForm.value.email;
							data[i]['first_name'] = this.studentAddForm.value.first_name;
							data[i]['last_name'] = this.studentAddForm.value.last_name;
							data[i]['phone'] = this.studentAddForm.value.phone;
							data[i]['standard'] = this.studentAddForm.value.standard;
							data[i]['subject'] = this.studentAddForm.value.subject;

							this.studentService.updateStudent(data[i]).subscribe((response: Response) => {
								if(response.status == 200) {
									window.location.reload();
									this.router.navigate(['/teacher/studentList']);
									this.toastr.success('Success', 'Student details updated successfully');
								}
							});
						}
					}
				}
			});
		} else {

			this.index = null;
			this.studentService.getAllStudents().subscribe((response: Response) => {
				if(response.status == 200) {
					var data = JSON.parse(response['_body']);
					for(var i = 0; i< data.length; i++) {
						if(data[i]['email'] == this.studentAddForm.value.email) {
							this.router.navigate(['/teacher/addStudent']);
							this.toastr.error('Failed', 'Student with this emailID already exsists');
							value = false;
						}
					}
			
					if(value) {
						this.studentService.addStudent(this.studentAddForm.value, this.index, this.selectedSubject).subscribe((response: Response) => {
							if(response.status == 200) {
								this.toastr.success('Success', "Student Added Successfully");
								this.router.navigate(['/teacher/studentList']);
							}  else {
								this.toastr.error('Failed', "Adding Subject Unsuccessfully");
								this.router.navigate(['/teacher/addStudent']);
							}
						});
					}
				}
			})
		}
	}

	// If this is update form, get user details and update form
	getStudentDetails(index: number) {
		this.studentService.getAllStudents().subscribe((response: Response) => {
			if(response.status == 200) {
				var data = JSON.parse(response['_body']);
				for(var i = 0; i< data.length; i++) {
					if(data[i]['id'] == index) {
						let studentDetail = data[i];
						this.createForm(studentDetail);
					}
				}
			}
		})
	}

	// get subject details
	getSubjectList(){
		this.studentService.getAllSubjects().subscribe((response: Response) => {
			if(response.status == 200) {
				this.subjectList = JSON.parse(response['_body']);
			}
		});
	}

	// on dropdown select change
	dropDownChanged(value, studentId) {
		if (studentId != undefined) {
			this.studentList.forEach(student => {
				if (student.id == studentId) {
					student.subject = value;
				}
			});
		}
		else {
			this.selectedSubject = value;
		}
	}

	// If this is update request then auto fill form
	createForm(data) {
		if (data == null) {
			this.studentAddForm = this.formBuilder.group({
				first_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
				last_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
				email: ['', [Validators.required, ValidationService.emailValidator]],
				phone: ['', [Validators.required, ValidationService.checkLimit(5000000000, 9999999999)]],
				standard: ['', [Validators.required, ValidationService.checkLimit(1, 12)]],
			});
		} else {
			this.studentAddForm = this.formBuilder.group({
				first_name: [data.first_name, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
				last_name: [data.last_name, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
				email: [data.email, [Validators.required, ValidationService.emailValidator]],
				phone: [data.phone, [Validators.required, ValidationService.checkLimit(5000000000, 9999999999)]],
				standard: [data.standard, [Validators.required, ValidationService.checkLimit(1, 12)]],
				subject: [data.subject, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
			});
		}
	}

}
