import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Interface } from 'readline';
import  roleMapping  from '../../assets/config/roleMapping.json';

interface User {
  name:string;
  gender:string;
  dob:string;
  address:string;
  phoneNumber:number;
  email:string;
  state:string;
  country:string;
  password:string;
  id:string;
  type:string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  role;
  tabs;
  userData:User[]=[];
  usernamePasswordMap= new Map();
  doctors:User[]=[];
  patients:User[]=[];
  currentUser;
  invalidUser = false;

constructor(private httpClient: HttpClient) { 
  if (typeof localStorage !== 'undefined') {
  this.currentUser = JSON.parse(localStorage?.getItem('currentUser')||'');
  this.role= this.currentUser?.type
  this.tabs = roleMapping.roles[this.role]?.tabs;
  }

}
 
  getUsers(){
    this.httpClient.get('https://678f555949875e5a1a916505.mockapi.io/patientManagement/users')
            .subscribe((data:any)=> {
              this.userData = data.filter(item=>item.type!=='admin')
              this.transformData()
              if(this.currentUser){
                this.currentUser = this.userData.find(user=>user.id === this.currentUser.id)
                localStorage.setItem('currentUser',JSON.stringify(this.currentUser));
              }
            });  }

  transformData(){
    this.patients = []
    this.doctors = []
    this.userData.forEach((user:User)=> {
      this.usernamePasswordMap.set(user.email,user.password);
      if(user.type === 'patient') this.patients.push(user);
      if(user.type === 'doctor') this.doctors.push(user);
      })
  }

  checkLogin(username,password){
    this.invalidUser = false;

    if(!this.usernamePasswordMap.has(username)) {
      this.invalidUser = true;
      return false;
    }
    if(this.usernamePasswordMap.get(username) === password){
      this.currentUser = this.userData.find(user=>user.email === username)
      this.role = this.currentUser?.type
      localStorage.setItem('currentUser',JSON.stringify(this.currentUser));
      this.tabs = roleMapping.roles[this.role]?.tabs
      localStorage.setItem('loggedIn','true');
      console.log()
      return true;
    } else {
      this.invalidUser = true;
      return false;
    }
  }

  newUser(data){
    this.httpClient.post('https://678f555949875e5a1a916505.mockapi.io/patientManagement/users',data).subscribe();

  }

  updateUser(id,data){
    const url = 'https://678f555949875e5a1a916505.mockapi.io/patientManagement/users/'+ id
    this.httpClient.put(url,data).subscribe();
    debugger;
  }
  

}
