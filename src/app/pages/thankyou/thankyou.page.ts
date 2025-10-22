import { Component, OnInit } from '@angular/core';
import { Db } from 'src/app/service/db';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.page.html',
  styleUrls: ['./thankyou.page.scss'],
  standalone: false
})
export class ThankyouPage implements OnInit {
  amountPaid: number = 7373.82;
  paymentMode: string = 'UPI';

  constructor(public db:Db) { }

  ngOnInit() {
  }

}
