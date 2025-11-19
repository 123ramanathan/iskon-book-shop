import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  constructor(public route: ActivatedRoute, public db: Db) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params);
      if(params && params['id']){
        this.router_name = params['id'];
        this.getBookList();
      }
    })
  }

  saveSelectBook(){
    let data = {
      book_name: this.selected_book,
      quantity: this.quantity
    }
    this.saved_books.push(data);
    this.selected_book = null;
    this.quantity = null;
  }

  remove_book(index: number){
    this.saved_books.splice(index, 1);
  }

  getBookList(){
    let data = {
      stock_entry_name: this.router_name
    }
    this.db.get_wrong_books_list(data).subscribe((res: any) => {
      console.log(res);
      if(res && res.message && res.message.status == 'success'){
        this.wrong_book_list = res.message.books;
      }else{
        this.wrong_book_list = [];
      }
    });
  }

  saveWrongBook(){
    console.log("Wrong Book Saved", this.saved_books)
    let data = {
      stock_entry_name: this.router_name,
      books_data: this.saved_books
    }
    this.db.submit_books_report(data).subscribe((res: any) => {
      console.log(res);
    });
  }

}
