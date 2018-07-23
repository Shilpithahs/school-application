import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from '../../../services/student/student.service';
import { Router } from '../../../../../node_modules/@angular/router';
import { FormGroup, FormBuilder, Validators } from '../../../../../node_modules/@angular/forms';
import { ValidationService } from '../../../services/config/config.service';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.css']
})

export class AddSubjectComponent implements OnInit {
  subjectName;
  register: any;
  public subject: Subject;
  // create subjectForm of type FormGroup 
  private subjectForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private studentService: StudentService, private router: Router, private toastr: ToastrService) {
    this.subjectForm = this.formBuilder.group({
			subjectName: ['', [Validators.required, ValidationService.subjectNameValidator]]
		});
   }

  ngOnInit() {}
  
  //Add subject to the SubjectList
  public addSubject() {

    var value: boolean = true;
    this.studentService.getAllSubjects().subscribe((response: Response) => {
      if(response.status == 200) {
        var data = JSON.parse(response['_body']);
			for(var i = 0; i< data.length; i++) {
				if(data[i]['name'] == this.subjectForm.value.subjectName) {
					this.router.navigate(['/teacher/addSubject']);
					this.toastr.error('Failed', 'Subject name already exsists');
					value = false;
				}
			}
	
			if(value) {
				this.subject = new Subject(this.subjectForm.value.subjectName);
				this.studentService.addSubject(this.subject).subscribe((response: Response) => {
					if(response.status == 200) {
						this.toastr.success('Success', "Subject Added Successfully");
						this.router.navigate(['/teacher/addSubject']);
					}  else {
						this.toastr.error('Failed', "Adding Subject Unsuccessfully");
						this.router.navigate(['/teacher/addSubject']);
					}
				});
			}
		}
    })
  }

}

export class Subject {
  public name: string = '';

  constructor(name: string) {
    this.name = name;
  }
  
}
