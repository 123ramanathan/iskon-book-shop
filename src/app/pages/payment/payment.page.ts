import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
  standalone: false
})
export class PaymentPage implements OnInit {
  selected_payment_type: any;
  constructor() { }

  ngOnInit() {
  }

  payment_types: any = [
    {
      name: 'Cash',
      icon: '/assets/icon/cash-type.svg'
    },
    {
      name: 'UPI',
      icon: '/assets/icon/upi-type.svg'
    },
    {
      name: 'Card',
      icon: '/assets/icon/card-type.svg'
    },
    {
      name: 'Split',
      icon: '/assets/icon/split-type.svg'
    }
  ]

  selected_payment(item: any){
    this.selected_payment_type = item.name;
  }

}
