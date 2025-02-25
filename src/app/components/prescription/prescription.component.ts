import { Component, OnInit } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { Select } from 'primeng/select';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { FloatLabel } from "primeng/floatlabel"
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';

import { AccordionModule } from 'primeng/accordion';
import moment from 'moment'
import { LoginService } from '../../services/login.service';
import pres from '../../../assets/data/prescriptionData.json'
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrescriptionService } from '../../services/prescription.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { subscribe } from 'diagnostics_channel';

@Component({
  selector: 'app-prescription',
  imports: [PanelModule, ToolbarModule, TableModule, AccordionModule, Select, FloatLabel, TagModule, ButtonModule, FormsModule,TranslatePipe, ReactiveFormsModule],
  templateUrl: './prescription.component.html',
  styleUrl: './prescription.component.scss'
})
export class PrescriptionComponent implements OnInit {
  patients;
  role;
  schedule = pres.schedule;
  time = pres.time
  drugs = pres.drugs;
  patientName;
  patientNameError: boolean;
  state;
  prescriptions: any = {}
  masterData;
  drugMap ={};
  doctors;

  // test = {time:'AF',value:'af'}
  currentUser;
  get saveDisableState() {
    return !this.patientName || !this.drugMap
  }

  
 
  constructor(private loginService: LoginService, private prescriptionService: PrescriptionService, private fb: FormBuilder) {
    this.initializeForm();
  }

  scheduleChange(drug,eve){
    this.drugMap[drug]['schedule'] = eve

  }
  timeChange(drug,eve){
    this.drugMap[drug]['time'] = eve
  }
  ngOnInit(): void {
    this.createDrugMap();
    this.state = this.loginService.role === 'doctor' ? 'new' : 'view'
    this.patients = this.loginService.patients;

    this.doctors = this.loginService.doctors;
    this.role = this.loginService.role;
    this.currentUser = this.loginService.currentUser;
    this.prescriptionInstructions();
  }

  viewModeClicked(){
    this.createDrugMap();
    this.state = 'view';
  }
  newModeClicked(){
    this.createDrugMap();
    this.state = 'new';
  }
  prescriptionInstructions(){
    this.prescriptionService.getPrescriptions().subscribe(data=>{
      this.masterData = data;
      this.groupByPatient();
    });
    // if (this.role === 'doctor') {
    // }
  }

  createDrugMap(){
    this.drugMap = {}
    pres.drugs.forEach(drug=>this.drugMap[drug.value]={})
  }

  getKeys(data){
    return Object.keys(data);
  }

  groupByPatient() {
    this.prescriptions = {}
    // this.masterData = this.prescriptionService.prescriptionMasterData
    this.masterData?.forEach(data => {
      if (this.prescriptions[data?.patientId]) {
        this.prescriptions[data?.patientId].push(data)
      } else {
        this.prescriptions[data?.patientId] = []
        this.prescriptions[data?.patientId].push(data)

      }
    })
  }

  getDoctorName(id){
    if(this.doctors){
    const user = this.doctors?.find(data=>data.id === id)
    return (user?.name)
    }
  }

  initializeForm() {
    // this.form = this.fb.group({
    //   paracetamol: this.fb.group({
    //     'schedule': new FormControl(''),
    //     'time': new FormControl('')
    //   }),
    //   antacid: this.fb.group({
    //     'schedule': new FormControl(''),
    //     'time': new FormControl('')
    //   }),
    //   painkiller: this.fb.group({
    //     'schedule': new FormControl(''),
    //     'time': new FormControl('')
    //   })
    // })

    // this.drugs?.forEach((drug) => {
    //   this.form?.setControl(drug.value,this.fb.group({
    //     'schedule': new FormControl(''),
    //     'time': new FormControl('')
    // }))
    //   // object[drug.value] = ['',]

    // })
    // this.form = this.fb.group(object);
  }


  onSave() {
    if (this.patientName) {
      this.getKeys(this.drugMap).forEach(key=>{
        if(this.getKeys(this.drugMap[key]).length <=0){
            delete this.drugMap[key]
        }
      });
     const requestData = {
        data: this.drugMap,
        patientId: this.patientName.id,
        doctorId: this.loginService.currentUser?.id || '1',
        date: moment().format("MMM Do YY"),
      };
      // this.prescriptionService.postPrescription(requestData);
      // this.resetFields();
      // this.prescriptionInstructions();
      
    }
  }

  resetFields(){
    this.patientName = "";
    this.createDrugMap()
  }

  isEmpty(obj) {
    for(let key in obj) {
      //if the value is 'object'
      if(obj[key] instanceof Object === true) {
        if(this.isEmpty(obj[key]) === false) return false;
      }
      //if value is string/number
      else {
        //if array or string have length is not 0.
        if(obj[key].length !== 0) return false;
      }
    }
    return true;
}
}
