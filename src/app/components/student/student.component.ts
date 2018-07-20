import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

// Components
import { PersonalInfoComponent } from './personal-info/personal-info.component';

// Services
import { routerTransition } from '../../services/config/config.service';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
  animations: [routerTransition()],
  host: { '[@routerTransition]': '' }
})
export class StudentComponent implements OnInit {
  active: string;
  constructor(private router: Router, private toastr: ToastrService) {
    // Detect route changes for active sidebar menu
    this.router.events.subscribe((val) => {
      this.routeChanged(val);
    });
  }

  ngOnInit() {
  }

  // Detect route changes for active sidebar menu
  routeChanged(val) {
    this.active = val.url;
  }

  // Logout User
  logOut() {
    this.toastr.success('Success', "Logged Out Successfully");
    localStorage.removeItem('userData');
    this.router.navigate(['/login']);
  }
}

// Define and export child routes of StudentComponent
export const studentChildRoutes: Routes = [
  {
    path: 'personalInfo',
    component: PersonalInfoComponent
  },
  {
    path: 'personalInfo/:id',
    component: PersonalInfoComponent
  }
];

