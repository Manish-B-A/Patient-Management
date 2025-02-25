import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  questions;

  constructor(private httpClient: HttpClient) { }
  
  getQa() {
    return this.httpClient.get('https://67b23791bc0165def8cd07bd.mockapi.io/questions')
      // .subscribe((data)=>{
      //   this.questions = data;
      // })
  }

  newQuestion(data){
    this.httpClient.post('https://67b23791bc0165def8cd07bd.mockapi.io/questions',data)
    .subscribe();
  }

  updateQuestion(id,data){
    debugger;
    const url = 'https://67b23791bc0165def8cd07bd.mockapi.io/questions/' + id
    return this.httpClient.put(url,data);}
}
