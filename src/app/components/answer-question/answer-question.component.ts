import { Component, EventEmitter, input, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { QuestionsService } from '../../services/questions.service';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-answer-question',
  imports: [DialogModule,ButtonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './answer-question.component.html',
  styleUrl: './answer-question.component.scss'
})
export class AnswerQuestionComponent implements OnInit {

  @Input() visible=false;
  @Input() inputQuestion;

  @Output() save:EventEmitter<string> = new EventEmitter();
  @Output() cancel:EventEmitter<string> = new EventEmitter();

  form:FormGroup;

  constructor(private questionsService:QuestionsService){}

  ngOnInit(): void {
    this.form = new FormGroup({
      question: new FormControl(''),
      answer: new FormControl('')
    })
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange}){
    if(changes['inputQuestion']){
    this.form?.patchValue({
      question:this.inputQuestion?.question,
      answer:this.inputQuestion?.answer,
    })
  }
  }



  onSave(){
    this.questionsService.updateQuestion(this.inputQuestion.id,this.form.value).subscribe(()=>this.save.emit('true'));
  }

  onCancel(){
    this.form.reset();
    this.cancel.emit('true')
  }


}
