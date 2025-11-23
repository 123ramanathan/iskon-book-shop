import { Component, OnInit } from '@angular/core';
import { RefresherCustomEvent } from '@ionic/angular';
import { Db } from 'src/app/service/db';

@Component({
  selector: 'app-stock-reconciliation',
  templateUrl: './stock-reconciliation.page.html',
  styleUrls: ['./stock-reconciliation.page.scss'],
  standalone: false
})
export class StockReconciliationPage implements OnInit {

  conciliation_list: any = [];
  constructor(public db: Db) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getStocksReconcilation();
  }

  // conciliation_list = [
  //   {
  //     book_name: 'The Great Gatsby',
  //     sub_title: 'F. Scott Fitzgerald',
  //     system_quantity: 25,
  //     physical_count: 0
  //   },
  //   {
  //     book_name: 'To Kill a Mockingbird',
  //     sub_title: 'Harper Lee',
  //     system_quantity: 18,
  //     physical_count: 0
  //   },
  //   {
  //     book_name: 'Pride and Prejudice',
  //     sub_title: 'Jane Austen',
  //     system_quantity: 15,
  //     physical_count: 0
  //   },
  //   {
  //     book_name: 'The Hobbit',
  //     sub_title: 'J.R.R. Tolkien',
  //     system_quantity: 22,
  //     physical_count: 0
  //   },
  //   {
  //     book_name: "Harry Potter and the Philosopher's Stone",
  //     sub_title: 'J.K. Rowling',
  //     system_quantity: 40,
  //     physical_count: 0
  //   },
  //   {
  //     book_name: 'The Catcher in the Rye',
  //     sub_title: 'J.D. Salinger',
  //     system_quantity: 12,
  //     physical_count: 0
  //   },
  //   {
  //     book_name: 'Atomic Habits',
  //     sub_title: 'James Clear',
  //     system_quantity: 35,
  //     physical_count: 0
  //   },
  //   {
  //     book_name: 'The Alchemist',
  //     sub_title: 'Paulo Coelho',
  //     system_quantity: 28,
  //     physical_count: 0
  //   },
  //   {
  //     book_name: 'Sapiens',
  //     sub_title: 'Yuval Noah Harari',
  //     system_quantity: 20,
  //     physical_count: 0
  //   }
  // ]

  getStocksReconcilation(){
    let data = {
      pos_profile: localStorage['store_name']
    }
    this.db.get_stock_reconcilation(data).subscribe((res:any)=>{
      if(res && res.status == 'Success' && res.message && res.message.item_details && res.message.item_details.length > 0){
        this.conciliation_list = res.message.item_details;
      }else{
        this.conciliation_list = [];
      }
    });
  }

  saveReconciliation(){
    let data = {
      pos_profile: localStorage['store_name'],
      item_details: this.conciliation_list
    }
    this.db.create_stock_reconciliation(data).subscribe((res:any)=>{
      console.log(res, "create stock reconciliation");
    });
  }

  handleRefresh(event: RefresherCustomEvent) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
      this.getStocksReconcilation();
    }, 2000);
  }

}
