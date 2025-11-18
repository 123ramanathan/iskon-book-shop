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
  page:number= 1;
  loading:boolean = false
  noProduct:boolean = false
  catalog:any[] = [
    // {
    //  image: "",
    //  image_alt: "The Great",
    //  book_name: "The Great Gatsby",
    //  author_name: "F. Scott Fitzgerald",
    //  price: 450,
    //  stock: 25,
    //  name: "great"
    // }
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
      pos_profile: localStorage['store_name'],
      search_book_name: this.searchTxt,
      item_group: this.category,
      page: this.page,
      limit: 20
    } 

    this.db.sales_items_with_filters(params).subscribe((res:any)=>{
      // console.log(res,"res")
      if(res.message && res.message.items && res.message.items.length > 0){
        this.catalog = this.page === 1 ? res.message.items : [...this.catalog,...res.message.items]
        this.loading = false
        this.noProduct = false
      }else{
        this.catalog = this.page === 1 ? [] : this.catalog
        this.loading = false
        this.noProduct = true
      }
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
      this.page = 1
      this.getItems()
    }, 500); // custom delay (500ms)
  }

  categoryChange($event:any){
    this.page = 1
    this.getItems();
  }

  ngOnDestroy() {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
  }

  loadMore(event:any){
    if(!this.loading){
      this.page += 1;
      this.loading = true
      this.getItems();
    }
  }
}
