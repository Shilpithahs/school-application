import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.css']
})

export class AddSubjectComponent implements OnInit {
  subject_name;
  private subjectList = new Array<Subject>();
  constructor(private toastr: ToastrService) { }

  ngOnInit() {}
  
  //Add subject to the SubjectList
  public addSubject() {
    var value: boolean = true;
    if(this.subjectList.length != 0) {
      for (var i = 0; i < this.subjectList.length; i++) {
        if(this.subjectList[i]['name'] === this.subject_name) {
          this.toastr.error('Failed', "Name Already Exists");
          value = false;
        }
      }
      if(value)
      {
        this.subjectList.push(new Subject(this.subject_name));
        localStorage.setItem('subjects', JSON.stringify(this.subjectList));
        this.toastr.success('Success', "Subject added Successfully");
      }
    } else {
      this.subjectList.push(new Subject(this.subject_name));
      localStorage.setItem('subjectList', JSON.stringify(this.subjectList));
      this.toastr.success('Success', "Subject added Successfully");
    }
  }
}

export class Subject {
  private name: string = '';

  constructor(name: string) {
    this.name = name;
  }
}
