import { Component, OnInit } from '@angular/core';
import { Db } from 'src/app/service/db';

@Component({
  selector: 'app-catalog',
  standalone: false,
  templateUrl: './catalog.page.html',
  styleUrls: ['./catalog.page.scss'],
})
export class CatalogPage implements OnInit {
  private debounceTimer: any;
  catalog = [
    {
     image: "",
     image_alt: "The Great",
     book_name: "The Great Gatsby",
     author_name: "F. Scott Fitzgerald",
     price: 450,
     stock: 25,
     name: "great"
    }
  ]

  constructor(public db:Db) { }

  ngOnInit() {
    this.db.get_cart_items()
  }


  onSearchChange(event: any) {
    const value = event.target.value.toLowerCase();
    // Clear old timer before setting a new one
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    // Set new debounce timer
    this.debounceTimer = setTimeout(() => {
      this.applyFilter(value);
    }, 500); // custom delay (500ms)
  }

  
  applyFilter(searchText: string) {
    console.log(searchText,"searchText")
    // if (!searchText) {
    //   this.filteredItems = [...this.items];
    //   return;
    // }
    // this.filteredItems = this.items.filter((item) =>
    //   item.toLowerCase().includes(searchText)
    // );
  }

  ngOnDestroy() {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
  }
}
