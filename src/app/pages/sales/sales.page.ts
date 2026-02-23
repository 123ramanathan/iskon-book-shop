import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RefresherCustomEvent } from '@ionic/angular';
import { Db } from 'src/app/service/db';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.page.html',
  styleUrls: ['./sales.page.scss'],
  standalone: false
})
export class SalesPage implements OnInit {

  report_details: any = {};
  constructor(public db: Db, private router: Router) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.db.headerDetails();
    this.getDashboardDetails();
  }

  report_list = [
    {
      icon: "/assets/icon/today-sales.svg",
      value: "24",
      label: "Today's Sales"
    },
    {
      icon: "/assets/icon/revenue.svg",
      value: "₹12,450",
      label: "Revenue"
    },
    {
      icon: "/assets/icon/low-stock.svg",
      value: "3",
      label: "Low Stock Items"
    },
    {
      icon: "/assets/icon/week-sales.svg",
      value: "156",
      label: "This Week"
    }
  ]

  quick_actions = [
    {
      icon: '/assets/icon/stock-reconcilation.svg',
      label: 'Stock Reconciliation',
      route: '/stock-reconciliation'
    },
    {
      icon: '/assets/icon/stock-receipt.svg',
      label: 'Stock Receipt',
      route: '/stock-receipt'
    },
    {
      icon: '/assets/icon/close-shift.svg',
      label: 'Close Shift',
      route: '/close-shift'
    }
  ]

  getDashboardDetails(){
    let data = {
      pos_profile: this.db.header_content ? this.db.header_content.store_name : localStorage['pos_profile'] ? localStorage['pos_profile'] : '',
      user: localStorage['username']
    }
    this.db.sales_details(data).subscribe((res:any)=>{
      console.log(res, "sales details");
      if(res && res.status == "Success" && res.message){
        this.report_details = res.message;
      }else{
        this.report_details = {};
      }
    });
  }

  openingPosEntry(route:string){
    let data = {
      user: localStorage['username']
    }
    this.db.pos_opening_entry(data).subscribe((res:any)=>{
      if(res && res.message && res.status == "Success"){
        console.log(res, "pos opening entry");
        this.router.navigateByUrl(route);
      }else{
        this.db.presentToast(res.message.message, 'error');
      }
    });
    // this.router.navigateByUrl('/catalog');
  }

  handleRefresh(event: RefresherCustomEvent) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
      this.getDashboardDetails();
    }, 2000);
  }

}
