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
      // this.studentDetail = this.studentService.getStudentDetails(params['id']).studentData;
      console.log(this.studentDetail);
    });
  }

  ngOnInit() { 
    this.getStudentDetailsByEmailId(); 
  }

  // Get student details 
  getStudentDetailsByEmailId() {

    this.emailId = localStorage.getItem('studentUser');
    this.studentService.getAllStudents().subscribe((response: Response) => {
      if(response.status == 200) {
        var data = JSON.parse(response['_body']);
        for(var i = 0; i< data.length; i++) {
          if(data[i]['email'] == this.emailId) {
            this.studentDetail = data[i];
            this.router.navigate(['/student/personalInfo']);
            this.toastr.success('Success', 'Successfully Loaded Personal Information');
          }
        }
      }
      // if(response.status == 200) {
      //   console.log('-------------personalinfo', response);
      //   this.toastr.success('Success', "Successfully loaded student detail");
      // }
    })
    // if (getStudentDetail) {
    //   this.studentDetail = getStudentDetail.studentData;
    //   this.toastr.success(getStudentDetail.message, "Success");
    // }
  }

}
