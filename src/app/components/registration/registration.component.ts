import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface UserData {
  name: string;
  phone: number;
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements AfterViewInit {
  form!: FormGroup;

  displayedColumns: string[] = ['name', 'phone'];

  dataSource: UserData[] = [];

  @ViewChild(MatSort) sort: MatSort;

  constructor(private liveAnnouncer: LiveAnnouncer) {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
    });

    this.dataSource = [];
  }

  ngOnInit(): void {}

  clear(): void {
    this.form.reset();
  }

  saveData(): void {
    const name = this.form.get('name')?.value;
    const phone = this.form.get('phone')?.value;

    this.dataSource.push({ name, phone });

    this.dataSource = [...this.dataSource];

    this.clear();
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction} final`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
}
