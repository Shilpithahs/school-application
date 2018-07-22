import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from '../../../services/student/student.service';
// import { FormGroup } from '../../../../../node_modules/@angular/forms';
import { Router } from '../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.css']
})

export class AddSubjectComponent implements OnInit {
  subjectName;
  private subjectList;
  // create subjectForm of type FormGroup 
  // private subjectForm: FormGroup;
  constructor(private studentService: StudentService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {}
  
  //Add subject to the SubjectList
  public addSubject() {
    
    this.studentService.addSubject(this.subjectName).subscribe((response: Response) => {
      console.log('response subject--------', response);
      if (response.status == 200) {
				this.toastr.success('Success', "Subject Added Successfully");
				this.router.navigate(['/teacher/addSubject']);
			} else {
				this.toastr.error('Failed', "Adding Subject Unsuccessfully");
			}
    })
  }

}
