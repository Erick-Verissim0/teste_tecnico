import { Component, Input, OnInit } from '@angular/core';
import { __values } from 'tslib';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  click = document.getElementsByTagName('input');

  

  clear() {
    console.log(this.click);
  }
}
