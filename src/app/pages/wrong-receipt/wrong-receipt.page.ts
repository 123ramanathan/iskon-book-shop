import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { BookListComponent } from 'src/app/components/book-list/book-list.component';
import { Db } from 'src/app/service/db';

@Component({
  selector: 'app-wrong-receipt',
  templateUrl: './wrong-receipt.page.html',
  styleUrls: ['./wrong-receipt.page.scss'],
  standalone: false
})
export class WrongReceiptPage implements OnInit {
  selected_book: any = "Select Book";
  quantity: any;
  saved_books: any = [];
  router_name: any;
  wrong_book_list: any = [];
  selected_book_name: any;
  constructor(public route: ActivatedRoute, public db: Db, public modalCntrl: ModalController) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params);
      if(params && params['id']){
        this.router_name = params['id'];
        // this.getBookList();
      }
    })
  }

  saveSelectBook(){
    let data = {
      book_name: this.selected_book_name,
      qty: this.quantity
    }
    this.saved_books.push(data);
    this.selected_book = null;
    this.quantity = null;
  }

  remove_book(index: number){
    this.saved_books.splice(index, 1);
  }

  // getBookList(){
  //   let data = {
  //     stock_entry_name: this.router_name
  //   }
  //   this.db.get_wrong_books_list(data).subscribe((res: any) => {
  //     console.log(res);
  //     if(res && res.message && res.message.status == 'success'){
  //       this.wrong_book_list = res.message.books;
  //     }else{
  //       this.wrong_book_list = [];
  //     }
  //   });
  // }

  saveWrongBook(){
    console.log("Wrong Book Saved", this.saved_books)
    let data = {
      stock_entry_name: this.router_name,
      wrong_books_data: this.saved_books
    }
    this.db.submit_books_report(data).subscribe((res: any) => {
      if(res && res.message && res.message.status == 'success'){
        this.db.presentToast(res.message.message, 'success');
      }
    });
  }

  async openBookList(){
    const modal = await this.modalCntrl.create({
      component: BookListComponent,
      cssClass: 'catalog-filter',
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    console.log(data, "selected book data");
    if(data && data.book_name){
      this.selected_book_name = data.book_name;
    }
  }

}
