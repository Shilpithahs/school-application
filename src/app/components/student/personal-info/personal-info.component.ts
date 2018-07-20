import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

// Services
import { StudentService } from '../../../services/student/student.service';
import { routerTransition } from '../../../services/config/config.service';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css'],
  animations: [routerTransition()],
  host: { '[@routerTransition]': '' }
})
export class PersonalInfoComponent implements OnInit {
  emailId: string;
  studentDetail: any;
  constructor(private router: Router, private route: ActivatedRoute, private studentService: StudentService, private toastr: ToastrService) {
    // Get user detail emailId number sent in params
    this.route.params.subscribe(params => {
      this.studentDetail = this.studentService.getStudentDetails(params['id']).studentData;
      console.log(this.studentDetail);
    });
  }

  ngOnInit() { }

  // Get student details 
  getStudentDetailsByEmailId(emailId: string) {
    let getStudentDetail = this.studentService.getStudentDetailsByEmailId(emailId);
    if (getStudentDetail) {
      this.studentDetail = getStudentDetail.studentData;
      this.toastr.success(getStudentDetail.message, "Success");
    }
  }

}
