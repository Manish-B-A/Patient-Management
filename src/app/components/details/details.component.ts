import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { PanelModule } from 'primeng/panel';
import { SelectModule } from 'primeng/select';
import { FloatLabel } from "primeng/floatlabel"
import { DatePickerModule } from 'primeng/datepicker';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import  appData  from '../../../assets/data/appData.json';
import moment from 'moment';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-details',
  imports: [PanelModule,ButtonModule,ToastModule,CommonModule,SelectModule,FormsModule,FloatLabel,ReactiveFormsModule,DatePickerModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
  providers:[MessageService]
})
export class DetailsComponent implements OnInit{
role;
form:FormGroup;
patientName;
userName;
genders;
countries;
states;
patients;

editForm;


constructor(public loginService: LoginService,private messageService: MessageService){
  this.role = this.loginService.role
}

ngOnInit(){
  this.loginService.getUsers();
  this.editForm = this.role === 'doctor' ? false : true
  this.countries = appData.countries;
  this.genders=[
    {name:'Male',code:'m'},{name:'Female',code:'f'}]
    this.patients = this.loginService?.patients;
  if(this.role === 'patient'){
    this.initializeForm(this.role);
    this.fillForm(this.loginService.currentUser)
  }
}


initializeForm(role){
  if(role === 'patient'){
this.form = new FormGroup({
  name: new FormControl('', [Validators.required, Validators.minLength(3)]),
  email: new FormControl('', [Validators.required, Validators.email]),
  phone: new FormControl('', [Validators.required,
  Validators.pattern(/^\d{10}$/)]), 
  address: new FormControl('', [Validators.required]),
  state: new FormControl('', [Validators.required]),
  country: new FormControl('', [Validators.required]),
  dob: new FormControl('', [Validators.required]),
  gender: new FormControl('',[Validators.required]),
  password: new FormControl('',[Validators.required])

})
  }
  else{
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),})
  }
}

fillForm(user){
  this.form.patchValue({
    name:user?.name,
    email: user?.email,
    phone: user?.phoneNumber,
    address: user?.address,
    country: this.countries?.find(data => data.code === user?.country),
    dob: user?.dob,
    gender: this.genders.find(data=> data.code === user?.gender)
  })
  this.onCountrySelect(user.country);
  this.form.patchValue({
    state: this.countries?.find(data => data.code === user?.country)?.states.find(st=>st.code === user.state),
  })
  if(this.role !== 'doctor'){
    this.form.patchValue({
      password: user.password
    })
  }
  this.form.patchValue({
    state: this.countries?.find(data => data.code === user?.country)?.states.find(st=>st.code === user.state),
  })
}
onPatientSelect(eve){
  this.initializeForm(eve.value.type)
  this.fillForm(eve.value)
}

onCountrySelect(code){
  this.states= this.countries.find(con=>con.code === code)?.states

}

onSave(){
  const data = this.form.value;
  if(this.role === 'patient' || (this.role==='admin' && this.patientName.type === 'patient')){
  data.country = this.form.value.country.code;
  data.dob = moment(this.form.value.dob).format('MM/DD/yyyy')
  data.gender = this.form.value.gender.code
  data.state = this.form.value.state.code;
  }
  const id = this.role === 'patient' ? this.loginService.currentUser?.id:this.patientName.id;

  this.loginService.updateUser(id,data);
  // this.loginService.getUsers();
  // this.fillForm(this.loginService.currentUser)
  this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Changes done!' })
}

onCancel(){
  if(this.role === 'patient') {
    this.fillForm(this.loginService.currentUser)
    return;
  }
  this.form.reset()
  this.patientName = null
}
}
