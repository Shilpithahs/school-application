import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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

export class LoginComponent {
	private loginForm: FormGroup;
	studentLogin: any;

	constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService, private toastr: ToastrService, private studentService: StudentService) {
		this.loginForm = this.formBuilder.group({
			email: ['', [Validators.required, ValidationService.emailValidator]],
			password: ['', [Validators.required, ValidationService.passwordValidator]]
		});
	}

	// Initicate login
	doLogin() {
		var value: boolean = true;
		this.userService.getAllUsers().subscribe((response: Response) => {
			if(response.status == 200) {
				var data = JSON.parse(response['_body']);
				for(var i = 0; i< data.length; i++) {
					if(data[i]['email'] == this.loginForm.value.email) {
						if(data[i]['password'] == this.loginForm.value.password) {
							value = false;
							this.success(data[i]);
						} else {
							this.router.navigate(['/login']);
							this.toastr.error('Failed', 'Wrong password, reenter the password');
							value = false;
						}
					}
				}

				if(value) {
					this.router.navigate(['/register']);
					this.toastr.error('Failed', 'emailID doesnt exsists, please register first for login');
				}	
			}
		});
	}

	// Login success function
	success(data) {
		if (data.role == 'admin') {
			this.router.navigate(['/admin']);
			this.toastr.success('Success', "Logged In Successfully");
		} else if (data.role == 'teacher') {
			this.router.navigate(['/teacher']);
			this.toastr.success('Success', "Logged In Successfully");
		} else if (data.role == 'student') {
			this.router.navigate(['/student']);
			localStorage.setItem('studentUser', data.email);
			this.toastr.success('Success', "Logged In Successfully");
		} else {
			this.toastr.error('Failed', "Invalid Credentials");
		}
	}

}