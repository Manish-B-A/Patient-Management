import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { Select } from 'primeng/select';
import { LoginService } from '../../services/login.service';
import { ButtonModule } from 'primeng/button';
import moment from 'moment';

@Component({
  selector: 'app-new-question-modal',
  imports: [DialogModule,Select,ReactiveFormsModule,ButtonModule],
  templateUrl: './new-question-modal.component.html',
  styleUrl: './new-question-modal.component.scss'
})
export class NewQuestionModalComponent implements OnInit{

  @Input() visible;

  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<boolean> = new EventEmitter();

  form:FormGroup;
patients;
doctors;
role

constructor(private loginService:LoginService){}

  ngOnInit(){
    this.role = this.loginService.currentUser?.type
    this.patients = this.loginService?.patients;
    this.doctors = this.loginService?.doctors;
    this.initializeForm();
        this.form?.reset();



  }

  initializeForm(){
    
    if(this.loginService.currentUser?.type === 'patient'){
      this.form = new FormGroup ({
        question: new FormControl('',[Validators.required]),
        doctorName : new FormControl('',[Validators.required])

      })

    }
    if (this.loginService.currentUser?.type === 'doctor'){
      this.form = new FormGroup ({
        question: new FormControl('',[Validators.required]),
        patientName : new FormControl('',[Validators.required])
      })
    }
  }
  
  onCancel(){
    this.form?.reset();
    this.cancel.emit(false);  
  }

    onSave(){
      const data ={
        question : this.form?.value.question,
        answer : "",
        doctorId: this.loginService.currentUser?.type === 'patient' ? this.form?.value.doctorName?.id : this.loginService.currentUser?.id,
        patientId: this.loginService.currentUser?.type === 'patient' ? this.loginService.currentUser?.id : this.form?.value.patientName?.id,
        date: moment().format("MM/DD/yyyy")
      }
      this.save.emit(data)
    }
}
