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
  searchTxt:any="";
  category:any="";
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

  categories = [
    {name: "All Categories", value: ""},
    {name: "Classic Fiction", value: "classic fiction"},
    {name: "Dystopian Fiction", value: "dystopian fiction"},
    {name: "Romance", value: "romance"},
    {name: "Fantasy", value: "fantasy"},
    {name: "Self Help", value: "self help"},
    {name: "Fiction", value: "fiction"},
    {name: "Non-fiction", value: "non-fiction"},
  ]

  constructor(public db:Db) { }

  ngOnInit() {
    this.db.get_cart_items();
    this.getItems();
  }

  getItems(){
    let params = {
      pos_profile: 'Test',
      search_book_name: this.searchTxt,
      item_group: this.category,
    } 

    this.db.sales_items_with_filters(params).subscribe((res:any)=>{
      console.log(res,"res")
    })
  }

  onSearchChange(event: any) {
    const value = event.target.value.toLowerCase();
    // Clear old timer before setting a new one
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    // Set new debounce timer
    this.debounceTimer = setTimeout(() => {
      this.getItems()
    }, 500); // custom delay (500ms)
  }

  categoryChange($event:any){
    console.log($event,"eveent")
    this.getItems()
  }

  ngOnDestroy() {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
  }
}
