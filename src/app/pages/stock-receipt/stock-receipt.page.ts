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
  page_no:number = 1;

  stock_entry_list:any = {
    pending: [],
    pending_count:0,
    confirmed: [],
    confirmed_count:0,

  }
  constructor(public db: Db, private router: Router) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getLatestPendingReceipt();
  }
  

  getLatestPendingReceipt(){
    let data = {
      page: this.page_no,
      limit: 10
    }
    this.db.get_latest_stock_entries(data).subscribe((res: any) => {
      if(res.message){
        if(this.page_no === 1){
          // this.stock_entry_list = res.message.data //This one
          this.stock_entry_list.pending = res.message?.pending?.data
          this.stock_entry_list.confirmed = res.message?.confirmed?.data
        }else{
          this.stock_entry_list.pending = [...this.stock_entry_list.pending, ...res.message?.pending?.data]
          this.stock_entry_list.confirmed = [...this.stock_entry_list.confirmed, ...res.message?.confirmed?.data]
        }

        this.stock_entry_list.pending_count =  res.message?.pending?.total_items
        this.stock_entry_list.confirmed_count =  res.message?.confirmed?.total_items
      }
    })
  }

  goToReceiptDetails(item: any){
    this.router.navigateByUrl('/transfer-receipt');
  }
}
