import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { NewQuestionModalComponent } from '../new-question-modal/new-question-modal.component';
import { ButtonModule } from 'primeng/button';
import { QuestionsService } from '../../services/questions.service';
import { AnswerQuestionComponent } from '../answer-question/answer-question.component';
import { LoginService } from '../../services/login.service';
import { userInfo } from 'os';
import { Select } from 'primeng/select';
import { FloatLabel } from "primeng/floatlabel"
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-qa',
  imports: [AccordionModule,FloatLabel,Select,ButtonModule,NewQuestionModalComponent,FormsModule,AnswerQuestionComponent],
  templateUrl: './qa.component.html',
  styleUrl: './qa.component.scss'
})
export class QaComponent implements OnInit {
role;
questions:any;
patientName;
showQuestionModal=false;
questionInEdit;
showEditQuestionModal;
userName;

  constructor(private questionsService: QuestionsService,public loginService: LoginService){}

  ngOnInit(): void {
    this.role = this.loginService.role
this.getQuestions();
    // this.questions = this.questionsService.questions;
  }
  getQuestions(){
    this.questionsService.getQa().subscribe(data=>this.questions = this.getUserQuestions(data));

  }

  getName(question){
    let user ;
    if(this.loginService.role === 'doctor'){
      user = this.loginService.userData.find(item=>item.id == question.patientId)
    }
return user?.name
  }

  getUserQuestions(data){
    if(this.loginService.role === 'patient'){
      return data.filter(item=>item.patientId == this.loginService.currentUser.id)
    }
    if(this.loginService.role === 'doctor'){

      return data.filter(item=>item.doctorId == this.loginService.currentUser.id )
    }
  }

  

  onNewQuestionClick(){
    this.showQuestionModal = true;
  }

  onSaveQuestion(eve){
    this.showQuestionModal = false
   this.questionsService.newQuestion(eve);
  }

  onCancelQuestion(){
    this.showQuestionModal = false    
  }

  answerQuestion(eve){
    this.showEditQuestionModal = true
    this.questionInEdit = eve
  }

  onEditQuestionSave(){
    this.questions=[]
  this.getQuestions();
    this.showEditQuestionModal = false

  }

  onEditQuestionCancel(){
    this.showEditQuestionModal = false
    this.questionInEdit = null
  }

  filterQuestions(){
    if(this.userName && this.userName?.type === 'patient'){
      // console.log(this.userName)

      return this.questions.filter(question => question?.patientId === this.userName.id)
    }
    if(this.userName && this.userName?.type === 'doctor'){
      // console.log(this.userName)

      return this.questions.filter(question => question?.doctorId === this.userName.id)
    }

    return this.questions
  }

}
