import { Component, inject, OnChanges, OnDestroy, OnInit } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { LoginService } from '../../services/login.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TabsModule } from 'primeng/tabs';
import { ButtonModule } from 'primeng/button';
import { RegisterUserModalComponent } from '../register-user-modal/register-user-modal.component';
import {writeJsonFile} from 'write-json-file';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-navbar',
  imports: [MatTabsModule, CommonModule, TranslatePipe, RegisterUserModalComponent,
    TabsModule,
    ButtonModule,
    RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers:[MessageService]

})
export class NavbarComponent implements OnInit, OnChanges {
  role:string;
  visible:boolean = false;
  tabs:string[]=[];
  tabselected:any;

  routeHistory:string | null;

  ngOnChanges(){
    // const url = this.router.routerState.snapshot.url?.slice(1);
    // if (typeof window !== 'undefined') {
    //   localStorage?.setItem('route', url)
    // }
  }

  constructor(private route:ActivatedRoute, public loginService: LoginService, private router:Router,private messageService: MessageService){
    this.tabs = this.loginService?.tabs
    this.role = this.loginService?.role
    // localStorage?.getItem('currentUser') 
  }

  onRouteChange(){
    setTimeout(()=>{
      const url = this.route.snapshot['_routerState'].url.slice(1)
      if (typeof localStorage !== 'undefined') {
              localStorage?.setItem('route', url)
    
        }
    },200)
    
    // 
  }

  
  ngOnInit(): void {
    this.loginService?.getUsers();
    if (typeof localStorage !== 'undefined') {
      this.routeHistory = localStorage.getItem('route')
      if(localStorage.getItem('loggedIn')!=='true'){
        this.router.navigate(['login'])
      }
    } 
  }

  onNewUserClick(){
    this.visible = !this.visible;
  }

  onSaveRegisterDialog(event:string){
    this.loginService.newUser(event)
    this.visible = false
    this.loginService.getUsers();
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User Added!' })
  }
  onCancelRegisterDialog(){
    this.visible=false;
  }

  onLogout(){
    localStorage.setItem('loggedIn','false')
    this.router.navigate(['/login'])
  }

}
