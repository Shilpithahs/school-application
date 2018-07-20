import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}

export class qusAns {
  private question: string = '';
  private answer: string = '';
  
}

export class Test {
  private name: string = '';
  private qaSet = new Array<qusAns>();
}
