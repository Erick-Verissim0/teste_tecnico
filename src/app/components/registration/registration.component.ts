import { LiveAnnouncer } from '@angular/cdk/a11y';
import { DataSource } from '@angular/cdk/collections';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSortModule, MatSort, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';

export interface UserData {
  name: string;
  phone: string;
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements AfterViewInit {
  form!: FormGroup;

  displayedColumns: any[] = ['name', 'phone'];

  dataSource: UserData[] = [];

  initialDataSource: UserData[] = [];

  constructor(private _liveAnnouncer: LiveAnnouncer) {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
    });
    this.dataSource = [];
  }

  @ViewChild(MatSort) sort: MatSort = new MatSort();

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
      this._liveAnnouncer.announce(`Sorted ${sortState.direction} ending`);
      console.log(' if ');
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
      console.log(' else ');
    }
  }

  // SORT

  ngAfterViewInit() {
    this.dataSource.sort((a, b) => (a.name < b.name ? -1 : 1));
    console.log('to aqui');
  }

  // SEARCH

  applySearch(event: Event) {
    const searchValue = (event.target as HTMLInputElement).value;
    console.log(searchValue);
    this.dataSource = this.initialDataSource;
    if (searchValue)
      this.dataSource = this.dataSource.filter(
        (value) =>
          value.name.startsWith(searchValue.trim().toLowerCase()) ||
          value.phone.startsWith(searchValue.trim().toLowerCase())
      );
  }

  // DELETE (tá faltando fazer)
}
