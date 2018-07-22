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
    
    this.subjectList = this.studentService.addSubject(this.subjectName);
    if (this.subjectList) {
			if (this.subjectList['code'] == 200) {
				this.toastr.success(this.subjectList['message'], "Success");
				this.router.navigate(['/teacher/addSubject']);
			} else {
				this.toastr.error(this.subjectList['message'], "Failed");
			}
    }
  }
  //   var value: boolean = true;
  //   if(this.subjectList.length != 0) {
  //     for (var i = 0; i < this.subjectList.length; i++) {
  //       if(this.subjectList[i]['name'] === this.subject_name) {
  //         this.toastr.error('Failed', "Name Already Exists");
  //         value = false;
  //       }
  //     }
  //     if(value)
  //     {
  //       this.subjectList.push(new Subject(this.subject_name));
  //       localStorage.setItem('subjects', JSON.stringify(this.subjectList));
  //       this.toastr.success('Success', "Subject added Successfully");
  //     }
  //   } else {
  //     this.subjectList.push(new Subject(this.subject_name));
  //     localStorage.setItem('subjectList', JSON.stringify(this.subjectList));
  //     this.toastr.success('Success', "Subject added Successfully");
  //   }
  // }

}
