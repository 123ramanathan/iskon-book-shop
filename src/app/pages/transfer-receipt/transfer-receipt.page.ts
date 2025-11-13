import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transfer-receipt',
  templateUrl: './transfer-receipt.page.html',
  styleUrls: ['./transfer-receipt.page.scss'],
  standalone: false
})
export class TransferReceiptPage implements OnInit {
  stock_details: any = {
    id: 'TRF-2025-001',
    from: 'Main Warehouse',
    date: '1/15/2025',
    items_count: 3,
    status: 'Pending'
  }
  constructor() { }

  ngOnInit() {
  }

  receipt_book_list: any = [
    {
        "item_code": "Basics of Bhagavadgita-Bengali",
        "item_name": "Basics of Bhagavadgita-Bengali",
        "physical_qty": 3
    },
    {
        "item_code": "Basics of Bhagavadgita-Bengali",
        "item_name": "Basics of Bhagavadgita-Bengali",
        "physical_qty": 3
    },
    {
        "item_code": "Basics of Bhagavadgita-Bengali",
        "item_name": "Basics of Bhagavadgita-Bengali",
        "physical_qty": 3
    },
  ]

  saveReceipt(){
    console.log("Receipt Saved")
  }

}
