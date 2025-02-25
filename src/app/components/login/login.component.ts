import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CardModule,ButtonModule,InputTextModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  constructor(public loginService: LoginService, private router:Router){
  }

  ngOnInit(){
    if (typeof localStorage !== 'undefined') {
      if(localStorage.getItem('loggedIn')==='true'){
        this.router.navigate([''])
      }
    }
  this.loginService.getUsers();
  }


  username:string;
  password:string;

  onLogin(){
    if(this.loginService.checkLogin(this.username,this.password)){
      this.router.navigate([''])
    }
  }
}
