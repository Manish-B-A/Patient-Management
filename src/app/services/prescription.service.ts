import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {

  constructor(private httpClient: HttpClient) { }

  prescriptionMasterData;

  postPrescription(data){
    this.httpClient.post('https://678f555949875e5a1a916505.mockapi.io/patientManagement/prescriptions',data)
    .subscribe();
  }

  getPrescriptions(){
    return this.httpClient.get('https://678f555949875e5a1a916505.mockapi.io/patientManagement/prescriptions')
    // .subscribe((data:any)=> {
    //   this.prescriptionMasterData = data
    // })
  }

}
