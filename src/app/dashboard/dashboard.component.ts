import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder, FormGroup } from '@angular/forms';
import { group } from '@angular/animations';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { AddStudentComponent } from './add-student/add-student.component';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';

export interface StudentsElement {
  name: string,
  class: string,
  type: string,
  age: number,
  primaryContact: number,
  secondaryContact: number,
  english: number,
  french: number,
  maths: number,
  science: number,
  social: number,
  studentId: string
}

// const ELEMENT_DATA: StudentsElement[] = [];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['name', 'class', 'type', 'age', 'primaryContact', 'secondaryContact', 'english', 'french', 'maths', 'science', 'social', 'edit', 'delete'];
  dataSource = new MatTableDataSource<StudentsElement>();
  @ViewChild('paginator') paginator: MatPaginator;
  filterForm: FormGroup;
  typeFiltersVal = ['Primary', 'Secondary']
  classFiltersVal = [
    {
      class: "LKG",
      group: "Primary"
    },
    {
      class: "UKG",
      group: "Primary"
    },
    {
      class: "First",
      group: "Primary"
    },
    {
      class: "Second",
      group: "Primary"
    },
    {
      class: "Third",
      group: "Primary"
    },
    {
      class: "Fourth",
      group: "Primary"
    },
    {
      class: "Fifth",
      group: "Primary"
    },
    {
      class: "Sixth",
      group: "Secondary"
    },
    {
      class: "Seventh",
      group: "Secondary"
    },
    {
      class: "Eighth",
      group: "Secondary"
    },
    {
      class: "Ninth",
      group: "Secondary"
    },
    {
      class: "Tenth",
      group: "Secondary"
    },
  ]
  classFiltersValue: any;
  subjectFilterArr = ['English', 'French', 'Maths', 'Science', 'Social'];
  updateSubCol = ['english', 'french', 'maths', 'science', 'social'];
  subjectFilterVal = [
    {
      class: "LKG",
      subject: ['English', 'French', 'Maths']
    },
    {
      class: "UKG",
      subject: ['English', 'French', 'Maths']
    },
    {
      class: "First",
      subject: ['English', 'French', 'Maths', 'Science', 'Social']
    },
    {
      class: "Second",
      subject: ['English', 'French', 'Maths', 'Science', 'Social']
    },
    {
      class: "Third",
      subject: ['English', 'French', 'Maths', 'Science', 'Social']
    },
    {
      class: "Fourth",
      subject: ['English', 'French', 'Maths', 'Science', 'Social']
    },
    {
      class: "Fifth",
      subject: ['English', 'French', 'Maths', 'Science', 'Social']
    },
    {
      class: "Sixth",
      subject: ['English', 'French', 'Maths', 'Science']
    },
    {
      class: "Seventh",
      subject: ['English', 'French', 'Maths', 'Science']
    },
    {
      class: "Eighth",
      subject: ['English', 'French', 'Maths', 'Science']
    },
    {
      class: "Ninth",
      subject: ['English', 'French', 'Maths', 'Science']
    },
    {
      class: "Tenth",
      subject: ['English', 'French', 'Maths', 'Science']
    },
  ]

  filterValues = {
    type: '',
    class: '',
  }

  columnsToDisplay: string[] = this.displayedColumns.slice();
  // public indexesToDel: any[] = [];
  modalRef: BsModalRef
  constructor(
    private dashboardService: DashboardService,
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private loginService: LoginService,
    private router: Router,
  ) {
    this.filterForm = this.formBuilder.group({
      typeFilter: [null],
      classFilter: [null],
      subjectFilter: [null]
    });
    this.dashboardService.getStudentDetails().subscribe(data => {
      var sData = Object.keys(data).map(key => {
        return data[key];
      })
      this.dataSource.data = sData
      this.dataSource.paginator = this.paginator
    })
    this.dataSource.filterPredicate = this.createFilter();
  }

  ngOnInit(): void {
    this.classFiltersValue = JSON.parse(JSON.stringify(this.classFiltersVal));
  }

  get filterControls() {
    return this.filterForm.controls;
  }

  deleteStudent(sid) {
    this.dataSource.data = this.dataSource.data.filter(item => item.studentId !== sid);
  }

  editStudent(sid) {
    this.openModal(this.dataSource.data.filter(item => item.studentId === sid), true)
  }

  addFilter() {
    this.columnsToDisplay = this.displayedColumns.slice();
    this.filterValues.type = this.filterForm.value.typeFilter;
    this.filterValues.class = this.filterForm.value.classFilter;
    this.updateSubCol.forEach(sub => {
      if (sub !== this.filterForm.value.subjectFilter.toString().toLowerCase()) {
        this.columnsToDisplay = this.columnsToDisplay.filter((item, i) => i !== this.columnsToDisplay.indexOf(sub))
      }
    })
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  onTypeChange(event) {
    this.classFiltersValue = JSON.parse(JSON.stringify(this.classFiltersVal)).filter(cls => cls.group === event.value)
  }

  onClassChange(event) {
    let subForCls = JSON.parse(JSON.stringify(this.subjectFilterVal)).filter(sub => sub.class === event.value)
    this.subjectFilterArr = subForCls[0].subject
  }

  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function (data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return data.type.indexOf(searchTerms.type) !== -1
        && data.class.indexOf(searchTerms.class) !== -1
    }
    return filterFunction;
  }

  openModal(data, mode) {
    this.modalRef = this.modalService.show(AddStudentComponent, {
      class: 'modal-lg',
      initialState: {
        title: 'Add Student',
        name: data[0]?.name,
        class: data[0]?.class,
        type: data[0]?.type,
        age: data[0]?.age,
        primaryContact: data[0]?.primaryContact,
        secondaryContact: data[0]?.secondaryContact,
        english: data[0]?.english,
        french: data[0]?.french,
        maths: data[0]?.maths,
        science: data[0]?.science,
        social: data[0]?.social,
        studentId: data[0]?.studentId,
        isEdit: mode
      }
    });
    this.modalRef.content.event.subscribe(data => {
      var valIndex = this.dataSource.data.findIndex(d => d.studentId === data.studentId)
      if (valIndex !== -1) {
        this.dataSource.data[valIndex] = data;
        this.dataSource.paginator = this.paginator
      } else {
        this.dataSource.data.push(data);
        this.dataSource.paginator = this.paginator
      }
    });
  }

  // resetFilter() { 
  //   this.columnsToDisplay = this.displayedColumns.slice();
  //   this.filterForm.reset();
  //   this.filterValues.type = this.filterForm.value.typeFilter;
  //   this.filterValues.class = this.filterForm.value.classFilter;
  //   this.dataSource.filter = JSON.stringify(this.filterValues);
  // }

  logout() {
    this.loginService.setLoggedIn(false)
    this.router.navigate(["/login"]);
  }
}
