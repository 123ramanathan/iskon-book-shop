import { Component, OnInit } from '@angular/core';
import { Db } from 'src/app/service/db';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
  standalone: false
})
export class OrdersPage implements OnInit {
  orders: any[] = [
    {
      id: 'ORD-001',
      date: '2025-10-02',
      time: '10:30 AM',
      payment: 'cash',
      total: 1409.0,
      items: [
        { name: 'The Great Gatsby', qty: 2 },
        { name: 'Atomic Habits', qty: 1 },
      ],
    },
    {
      id: 'ORD-002',
      date: '2025-10-02',
      time: '11:15 AM',
      payment: 'upi',
      total: 1447.0,
      items: [{ name: "Harry Potter and the Philosopher's Stone", qty: 3 }],
    },
  ];

  // Dynamic icons map
  paymentIcons: Record<string, string> = {
    cash: 'assets/payment-type/wallet.svg',
    upi: 'assets/payment-type/upi.svg',
    card: 'assets/payment-type/card.svg',
    split: 'assets/payment-type/split-payment.svg'
  };


  constructor(public db:Db) { }

  ngOnInit() {
  }


}
