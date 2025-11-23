import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RefresherCustomEvent } from '@ionic/angular';
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

  no_products: boolean = false;

  selectedSegment: any = 'pending_list';
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
      if(res && res.message && res.message.status == 'success'){
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

        if((res.message?.pending?.data.length == 0 && this.selectedSegment == 'pending_list') || (res.message?.confirmed?.data.length == 0 && this.selectedSegment == 'confirmed_list')){
          this.no_products = true;
        }
      }else{
        if(this.page_no == 1){
          this.stock_entry_list = {
            pending: [],
            pending_count:0,
            confirmed: [],
            confirmed_count:0,
          }
          this.no_products = true;
        }
      }
    })
  }

  goToReceiptDetails(item: any){
    this.router.navigateByUrl('/transfer-receipt/' + item.name);
  }

  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
    this.page_no = 1;
    this.no_products = false;
    this.getLatestPendingReceipt();
  }

  load_more(event: any){
    if(!this.no_products){
      let value = event.target.offsetHeight + event.target.scrollTop + 1;
      value = value.toFixed();
      if(value >= event.target.scrollHeight){
        this.page_no += 1;
        this.getLatestPendingReceipt()
      }
    }
  }

  handleRefresh(event: RefresherCustomEvent) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
      this.page_no = 1;
      this.no_products = false;
      this.getLatestPendingReceipt();
    }, 2000);
  }
}
