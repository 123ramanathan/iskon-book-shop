import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock-receipt',
  templateUrl: './stock-receipt.page.html',
  styleUrls: ['./stock-receipt.page.scss'],
  standalone: false
})
export class StockReceiptPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  pending_confirmation_list = [
    {
      book_name: "The Great Gatsby",
      received_date: "1/5/2025",
      quantity: 50,
      status: "Pending"
    },
    {
      book_name: "Atomic Habits",
      received_date: "1/5/2025",
      quantity: 50,
      status: "Pending"
    }
  ]

  confirmed_receipt_list = [
    {
      book_name: "Harry Potter Collection",
      units: 25,
      status: "Confirmed"
    }
  ]

}
