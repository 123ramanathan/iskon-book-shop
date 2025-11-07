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

  stock_entry_list = [
    {
      id: 'TRF-2025-001',
      from: 'Main Warehouse',
      date: '1/15/2025',
      items_count: 3,
      status: 'Pending'
    },
    {
      id: 'TRF-2025-002',
      from: 'Regional Distribution Center',
      date: '1/14/2025',
      items_count: 2,
      status: 'Pending'
    }
  ]

  stock_entry_list_completed = [
    {
      id: 'TRF-2024-150',
      from: 'Main Warehouse',
      date: '12/30/2024',
      items_count: 5,
      status: 'Completed'
    }
  ]
}
