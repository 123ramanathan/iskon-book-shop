import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Db } from 'src/app/service/db';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  standalone: false
})
export class BookListComponent  implements OnInit {
  wrong_book_list: any = [];
  page_no: number = 1;
  no_products: boolean = false;
  constructor(public db: Db, public modalCntrl: ModalController) { }

  ngOnInit() {
    this.getBookList();
  }

  getBookList(){
    let data = {
      page: this.page_no,
      page_size: 20
    }
    this.db.get_all_book_list(data).subscribe((res: any) => {
      // console.log(res);
      if(res && res.message && res.message.status == 'success' && res.message.data && res.message.data.items && res.message.data.items.length > 0){
        this.wrong_book_list = this.page_no == 1 ? res.message.data.items : [...this.wrong_book_list, ...res.message.data.items];
      }else{
        this.no_products = true;
        this.page_no == 1 ? this.wrong_book_list = [] : null;

      }
    });
  }

  selectBook(item: any){
    this.modalCntrl.dismiss({
      book_name: item.item_name
    });
  }

  handleInput(event: any){
    const value = event.target.value.toLowerCase();
    this.wrong_book_list = this.wrong_book_list.filter((book: any) => 
      book.item_name.toLowerCase().includes(value)
    );
  }

  load_more(event: any){
    if(!this.no_products){
      let value = event.target.offsetHeight + event.target.scrollTop + 1;
      value = value.toFixed();
      if(value >= event.target.scrollHeight){
        this.page_no += 1;
        this.getBookList()
      }
    }
  }

}
