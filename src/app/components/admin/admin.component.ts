import { Component, OnInit } from '@angular/core';
import { ToastrService } from '../../../../node_modules/ngx-toastr';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
  }

  // Logout User
  logOut(){
    this.toastr.success('Success', "Logged Out Successfully");
    this.router.navigate(['/login']);
  }

}