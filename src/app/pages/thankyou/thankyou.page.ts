import { Component, OnInit } from '@angular/core';
import { Db } from 'src/app/service/db';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.page.html',
  styleUrls: ['./thankyou.page.scss'],
  standalone: false
})
export class ThankyouPage implements OnInit {
  amountPaid: number = 0;
  paymentMode: string = '';

  constructor(public db:Db) { }

  ngOnInit() {
    const data = JSON.parse(localStorage['thankyou_content']);
    if(data){
      this.amountPaid = data.amount
      this.paymentMode = data.mode_of_payment
    }
  }

  ionViewWillLeave(){
   localStorage.removeItem('thankyou_content')
  }

}
