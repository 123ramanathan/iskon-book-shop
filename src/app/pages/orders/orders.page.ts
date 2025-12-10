import { Component, OnInit } from '@angular/core';
import { RefresherCustomEvent } from '@ionic/angular';
import { Db } from 'src/app/service/db';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
  standalone: false
})
export class OrdersPage implements OnInit {
  orders: any[] = [];
  page:number = 1;

  // Dynamic icons map
  paymentIcons: Record<string, string> = {
    Cash: 'assets/payment-type/wallet.svg',
    UPI: 'assets/payment-type/upi.svg',
    "Credit Card": 'assets/payment-type/card.svg',
    Split: 'assets/payment-type/split-payment.svg'
  };


  constructor(public db:Db) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getOrdersList();
  }

  getOrdersList(){
    let data = {
      pos_profile: localStorage['store_name'],
      page:this.page,
      limit: 20
    }
    this.db.get_orders(data).subscribe((res:any)=>{
      console.log(res, "orders list response");
      if(res.message && res.message.message && res.message.message.length > 0){
        this.orders = this.page === 1 ? res.message.message : [...this.orders,...res.message.message]
      }else{
        this.orders = []
      }
    });
  }

  handleRefresh(event: RefresherCustomEvent) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
      this.getOrdersList();
    }, 2000);
  }

}
