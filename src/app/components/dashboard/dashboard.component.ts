import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { LoginService } from '../../services/login.service';
import { UtilityService } from '../../services/utility.service';

@Component({
  selector: 'app-dashboard',
  imports: [ButtonModule,CardModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardComponent implements OnInit {

  currentUser
  quote;
  constructor(public loginService:LoginService,public utilityService:UtilityService){
    this.currentUser = this.loginService.currentUser
  }

  ngOnInit(){
    this.utilityService.getQuote().subscribe((data)=>{
      this.quote =  data[0]
    })

    
  }


}
