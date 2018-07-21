import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidationService } from '../../services/config/config.service';
import { UserService } from '../../services/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { routerTransition } from '../../services/config/config.service';
import { StudentService } from '../../services/student/student.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
	animations: [routerTransition()],
	host: { '[@routerTransition]': '' }
})

export class RegisterComponent {
	private registerForm: FormGroup;
	register: any;

	constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService, private toastr: ToastrService, private studentService: StudentService) {
		this.registerForm = this.formBuilder.group({
			firstName: ['', [Validators.required, ValidationService.firstNameValidator]],
			lastName: ['', [Validators.required, ValidationService.lastNameValidator]],
			email: ['', [Validators.required, ValidationService.emailValidator]],
			password: ['', [Validators.required, ValidationService.passwordValidator]]
		});
	}

	// // Check if user already logged in
	// ngOnInit() {
	// 	if (localStorage.getItem('userData')) {
	// 		this.router.navigate(['/']);
	// 	}
	// }

	// Initicate register
	doRegister() {
		this.register = this.userService.doRegister(this.registerForm.value);
		this.success(this.register);
		// if (this.register.studentData) {
		// 	// this.success(this.register.studentData);
		// 	var id = this.register.studentData.id;
		// 	localStorage.setItem('userData', JSON.stringify(this.register.studentData));
		// 	this.router.navigate(['/student/personalInfo', id]);
		// 	this.toastr.success('Success', "Logged In Successfully");
		// } else {
		// 	let register = this.userService.doRegister(this.registerForm.value);
		// 	this.success(register);
		// }
	}

	// Register success function
	success(data) {
		if (data.data.role == 'admin') {
			localStorage.setItem('userData', JSON.stringify(data.data));
			this.router.navigate(['/admin']);
			this.toastr.success('Success', "Logged In Successfully");
		} else if (data.data.role == 'teacher') {
			localStorage.setItem('userData', JSON.stringify(data.data));
			this.router.navigate(['/teacher']);
			this.toastr.success('Success', "Logged In Successfully");
		} else {
			this.toastr.error('Failed', "Invalid Credentials");
		}
	}

}