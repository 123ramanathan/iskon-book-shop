import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RefresherCustomEvent } from '@ionic/angular';
import { Db } from 'src/app/service/db';

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
  router_name: any;
  stock_entry_list: any = [];

  constructor(public route: ActivatedRoute, public db: Db, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params);
      if(params && params['id']){
        this.router_name = params['id'];
        this.get_stock_entry_details();
      }
    })
  }

  ionViewWillEnter(){
    this.get_stock_entry_details();
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
    let data = {
      stock_entry_name: this.router_name,
      items_data: this.stock_entry_list
    }
    this.db.confirm_receipt(data).subscribe((res: any) => {
      console.log(res);
      if(res && res.message && res.message.status == 'success'){
        this.db.presentToast(res.message.message, 'success');
        this.router.navigateByUrl('/stock-receipt');
      }else{
        if(res && res.message && res.message.message){
          this.db.presentToast(res.message.message, 'error');
        }else{
          this.db.presentToast('Error in saving receipt', 'error');
        }
      }
    });
  }

  get_stock_entry_details(){
    let data = {
      stock_entry_name: this.router_name
    }
    this.db.get_stock_entry_details(data).subscribe((res: any) => {
      console.log(res);
      if(res && res.message && res.message.data && res.message.status == 'success'){
        if(res.message.data.items && res.message.data.items.length > 0){
          this.stock_entry_list = res.message.data.items;
        }
        this.stock_details = res.message.data.header;
      }else{
        this.stock_entry_list = [];
      }
    })
  }

  fetch_variance(item: any){
    if(item.physical_qty){
      item.variance = item.physical_qty - item.system_qty;
    }
  }

  handleRefresh(event: RefresherCustomEvent) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
      this.get_stock_entry_details();
    }, 2000);
  }

  validateQty(item: any) {
    if (item.physical_qty < 0) {
      item.physical_qty = 0;
      item.variance = 0;
    }
  }

}
