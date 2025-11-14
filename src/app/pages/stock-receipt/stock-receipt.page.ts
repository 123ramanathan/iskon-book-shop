import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Db } from 'src/app/service/db';

@Component({
  selector: 'app-stock-receipt',
  templateUrl: './stock-receipt.page.html',
  styleUrls: ['./stock-receipt.page.scss'],
  standalone: false
})
export class StockReceiptPage implements OnInit {

  constructor(public db: Db, private router: Router) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getLatestPendingReceipt();
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

  getLatestPendingReceipt(){
    let data = {
      page: 1,
      limit: 10
    }
    this.db.get_latest_stock_entries(data).subscribe((res: any) => {
      console.log(res, "getLatestPendingReceipt")
    })
  }

  goToReceiptDetails(item: any){
    this.router.navigateByUrl('/transfer-receipt');
  }
}
