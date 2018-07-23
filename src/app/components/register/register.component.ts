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

	// Initiate register
	doRegister() {
		
		var value: boolean = true;
		this.userService.getAllUsers().subscribe((response: Response) => {
			if(response.status == 200) {
				var data = JSON.parse(response['_body']);
				for(var i = 0; i< data.length; i++) {
					if(data[i]['email'] == this.registerForm.value.email) {
						this.router.navigate(['/login']);
						this.toastr.error('Failed', 'User with this emailID already exsists, try loginin');
						value = false;
					}
				}
				
				if(value) {
					this.userService.doRegister(this.registerForm.value).subscribe((response: Response) => {
						if(response.status == 200) {
							this.router.navigate(['/login']);
							this.toastr.success('Success', 'Registered Successfully');
						}  else {
							this.router.navigate(['/register']);
							this.toastr.error('Failed', 'Register Unsuccessfully');
						}
					});
				}
			}
		});
	}

}