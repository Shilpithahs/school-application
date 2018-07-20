import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router';
import { ValidationService } from '../../services/config/config.service';
import { UserService } from '../../services/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { routerTransition } from '../../services/config/config.service';
import { StudentService } from '../../services/student/student.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
	animations: [routerTransition()],
	host: { '[@routerTransition]': '' }
})
export class LoginComponent implements OnInit {
	private loginForm: FormGroup;
	studentLogin: any;
	constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService, private toastr: ToastrService, private studentService: StudentService) {
		this.loginForm = this.formBuilder.group({
			email: ['', [Validators.required, ValidationService.emailValidator]],
			password: ['', [Validators.required, ValidationService.passwordValidator]]
		});
	}

	// Check if user already logged in
	ngOnInit() {
		if (localStorage.getItem('userData')) {
			this.router.navigate(['/']);
		}
	}

	// Initicate login
	doLogin() {
		this.studentLogin = this.studentService.getStudentDetailsByEmailId(this.loginForm.value.email);
		if (this.studentLogin.studentData) {
			// this.success(this.studentLogin.studentData);
			var id = this.studentLogin.studentData.id;
			localStorage.setItem('userData', JSON.stringify(this.studentLogin.studentData));
			this.router.navigate(['/student/personalInfo', id]);
			this.toastr.success('Success', "Logged In Successfully");
		} else {
			let login = this.userService.doLogin(this.loginForm.value);
			this.success(login);
		}
	}

	// Login success function
	success(data) {
		if (data.data.admin) {
			localStorage.setItem('userData', JSON.stringify(data.data));
			this.router.navigate(['/admin']);
			this.toastr.success('Success', "Logged In Successfully");
		} else if (data.data.teacher) {
			localStorage.setItem('userData', JSON.stringify(data.data));
			this.router.navigate(['/teacher']);
			this.toastr.success('Success', "Logged In Successfully");
		} else {
			this.toastr.error('Failed', "Invalid Credentials");
		}

	}

}