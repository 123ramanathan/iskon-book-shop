import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit() {
  }

  saveSelectBook(){
    let data = {
      book: this.selected_book,
      quantity: this.quantity
    }
    this.saved_books.push(data);
    this.selected_book = null;
    this.quantity = null;
  }

  remove_book(index: number){
    this.saved_books.splice(index, 1);
  }

}
