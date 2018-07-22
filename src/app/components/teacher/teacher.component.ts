import { Component, OnInit } from '@angular/core';
import { Routes, Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';

// Components
import { AddStudentComponent } from '../teacher/add-student/add-student.component';
import { StudentListComponent } from './list/student-list.component';
import { StudentDetailsComponent } from './details/student-details.component';
import { AddSubjectComponent } from './add-subject/add-subject.component';
import { TestComponent } from '../../components/teacher/test/test.component';

// Services
import { routerTransition } from '../../services/config/config.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css'],
  animations: [routerTransition()],
  host: {'[@routerTransition]': ''}
})

export class TeacherComponent implements OnInit {
  active:string;
  constructor(private router: Router,private toastr: ToastrService) {
    // Detect route changes for active sidebar menu
    this.router.events.subscribe((val) => {
      this.routeChanged(val);
    });
  }

  ngOnInit() {
  }

  // Detect route changes for active sidebar menu
  routeChanged(val){
    this.active = val.url;
  }

  // Logout User
  logOut(){
    this.toastr.success('Success', "Logged Out Successfully");
    this.router.navigate(['/login']);
  }
}

// Define and export child routes of TeacherComponent
export const teacherChildRoutes : Routes = [
{
  path: 'studentList',
  component: StudentListComponent
},
{
  path: 'addStudent',
  component: AddStudentComponent
},
{
  path: 'studentList/update/:id',
  component: AddStudentComponent
},
{
  path: 'studentList/detail/:id',
  component: StudentDetailsComponent
},
{
  path: 'addSubject',
  component: AddSubjectComponent
},
{
  path: 'test',
  component: TestComponent
}
];
