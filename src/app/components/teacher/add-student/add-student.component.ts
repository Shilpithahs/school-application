import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

// Services
import { ValidationService } from '../../../services/config/config.service';
import { StudentService } from '../../../services/student/student.service';
import { routerTransition } from '../../../services/config/config.service';
import { Subject } from '../../../components/teacher/add-subject/add-subject.component';

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
	doRegister() {
		if (this.index && this.index != null && this.index != undefined) {
			this.studentAddForm.value.id = this.index
		} else {
			this.index = null;
		}
		let studentRegister = this.studentService.doRegisterStudent(this.studentAddForm.value, this.index, this.selectedSubject);
		if (studentRegister) {
			if (studentRegister.code == 200) {
				this.toastr.success(studentRegister.message, "Success");
				this.router.navigate(['/']);
			} else {
				this.toastr.error(studentRegister.message, "Failed");
			}
		}
	}

	// If this is update form, get user details and update form
	getStudentDetails(index: number) {
		let studentDetail = this.studentService.getStudentDetails(index);
		this.createForm(studentDetail);
	}

	// get subject details
	getSubjectList() {
		this.subjectList = this.studentService.getAllSubjects().data;
	}

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
				first_name: [data.studentData.first_name, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
				last_name: [data.studentData.last_name, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
				email: [data.studentData.email, [Validators.required, ValidationService.emailValidator]],
				phone: [data.studentData.phone, [Validators.required, ValidationService.checkLimit(5000000000, 9999999999)]],
				standard: [data.studentData.standard, [Validators.required, ValidationService.checkLimit(1, 12)]],
				subject: [data.studentData.subject, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
			});
		}
	}

}
