import { Component, Input, OnInit, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { Select } from 'primeng/select';
import appData from '../../../assets/data/appData.json';
import moment from 'moment';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-register-user-modal',
  imports: [DialogModule, Select, ButtonModule, ReactiveFormsModule, DatePickerModule, FormsModule],
  templateUrl: './register-user-modal.component.html',
  styleUrl: './register-user-modal.component.scss'
})
export class RegisterUserModalComponent implements OnInit {
  @Input() visible: boolean = true;

  @Output() save: EventEmitter<string> = new EventEmitter();
  @Output() cancel: EventEmitter<boolean> = new EventEmitter();


  dob: any;
  form!: FormGroup;
  genders: any[] = [];
  countries;
  states;
  newUserType;
  userTypes;

  ngOnInit() {
    this.userTypes = [{ type: 'Patient', code: 'patient' }, { type: 'Doctor', code: 'doctor' }]
    this.countries = appData.countries;
    this.genders = [
      { name: 'Male', code: 'm' }, { name: 'Female', code: 'f' }]
  }

  initializeForm(type) {
    if (type === 'patient') {
      this.form = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.minLength(3)]),
        email: new FormControl('', [Validators.required, Validators.email]),
        phoneNumber: new FormControl('', [Validators.required,
        Validators.pattern(/^\d{10}$/)]),
        address: new FormControl('', [Validators.required]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        dob: new FormControl('', [Validators.required]),
        gender: new FormControl('', [Validators.required]),
        password: new FormControl('')
      })
    }
    if (type === 'doctor') {
      this.form = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.minLength(3)]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('')
      })
    }

  }

  onUserTypeSelection() {
    this.initializeForm(this.newUserType?.code);
  }

  onCountrySelect(code) {
    this.states = this.countries.find(con => con.code === code)?.states

  }


  onSave() {
    this.form?.patchValue({
      password: this.removeSpaces(this.form.value?.name) + '@' + Math.floor((Math.random() * 10) + 1)
    })
    const data = this.form?.value;
    if (this.newUserType?.code === 'patient') {
      data.country = this.form.value.country.code;
      data.dob = moment(this.form.value.dob).format('MM/DD/yyyy')
      data.gender = this.form.value.gender.code
      data.state = this.form.value.state.code;
    }
    data.type = this.newUserType?.code
    this.save.emit(data);
  }

  onCancel() {
    this.form.reset()
    this.newUserType = null;
    this.cancel.emit(false)
  }

  removeSpaces(str) {
    str = str.split("")
    var count = 0;
    for (var i = 0; i < str.length; i++)
      if (str[i] !== " ") str[count++] = str[i];

    return str.join("").substring(0, count);
  }
}
