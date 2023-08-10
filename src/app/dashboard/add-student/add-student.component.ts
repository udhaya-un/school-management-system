import { Component, TemplateRef, EventEmitter } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent {
  title;
  addStudentForm: FormGroup;
  classFiltersVal = [
    "LKG",
    "UKG",
    "First",
    "Second",
    "Third",
    "Fourth",
    "Fifth",
    "Sixth",
    "Seventh",
    "Eighth",
    "Ninth",
    "Tenth",
  ]
  typeFiltersVal = ['Primary', 'Secondary']
  public submitted = false;
  public event: EventEmitter<any> = new EventEmitter();
  name: any;
  class: any;
  type: any;
  age: any;
  primaryContact: any;
  secondaryContact: any;
  english: any;
  french: any;
  maths: any;
  science: any;
  social: any;
  studentId: any;
  isEdit: any;
  constructor(
    private formBuilder: FormBuilder,
    public modalRef: BsModalRef,
    private modalService: BsModalService,
    public options: ModalOptions
  ) {
    this.addStudentForm = this.formBuilder.group({
      name: [null, Validators.required],
      class: [null, Validators.required],
      type: [null, Validators.required],
      age: [null, Validators.required],
      primaryContact: [null, Validators.required],
      secondaryContact: [null],
      english: [null],
      french: [null],
      maths: [null],
      science: [null],
      social: [null],
      studentId: [null, Validators.required]
    });
    this.isEdit = this.modalService.config.initialState?.isEdit;
    if (this.isEdit) {
      this.addStudentControls['name'].setValue(this.modalService.config.initialState?.name);
      this.addStudentControls['class'].setValue(this.modalService.config.initialState?.class);
      this.addStudentControls['type'].setValue(this.modalService.config.initialState?.type);
      this.addStudentControls['age'].setValue(this.modalService.config.initialState?.age);
      this.addStudentControls['primaryContact'].setValue(this.modalService.config.initialState?.primaryContact);
      this.addStudentControls['secondaryContact'].setValue(this.modalService.config.initialState?.secondaryContact);
      this.addStudentControls['english'].setValue(this.modalService.config.initialState?.english);
      this.addStudentControls['french'].setValue(this.modalService.config.initialState?.french);
      this.addStudentControls['maths'].setValue(this.modalService.config.initialState?.maths);
      this.addStudentControls['science'].setValue(this.modalService.config.initialState?.science);
      this.addStudentControls['social'].setValue(this.modalService.config.initialState?.social);
      this.addStudentControls['studentId'].setValue(this.modalService.config.initialState?.studentId);
    }
  }

  ngOnInit() {
  }

  get addStudentControls() {
    return this.addStudentForm.controls;
  }

  addStudent() {
    this.submitted = true;
    if (this.addStudentForm.valid) {
      this.event.emit(this.addStudentForm.value)
      this.modalRef.hide()
    }
  }
}
