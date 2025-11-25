import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CatalogFilterComponent } from 'src/app/components/catalog-filter/catalog-filter.component';
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
  category:any="All Categories";
  page:number= 1;
  loading:boolean = false
  noProduct:boolean = false
  catalog:any[] = []

  categories:any[] = []

  constructor(public db:Db,private modalCtrl:ModalController) { }

  ionViewWillEnter(){
    this.db.get_cart_items();
    this.getItems();
    this.get_item_group()
  }

  ionViewWillLeave(){
    this.catalog = []
    this.page = 1;
    this.noProduct = false;
  }

  ngOnInit(): void {
    
  }


  get_item_group(){
    this.db.get_item_group().subscribe((res:any)=>{
      if(res.message && res.message.item_groups && res.message.item_groups.length > 0){
        const value = {name: "All Categories"}
        res.message.item_groups.unshift(value);
        this.categories = res.message.item_groups
      }
    })
  }

  getItems(){
    let params = {
      pos_profile: localStorage['store_name'],
      search_book_name: this.searchTxt,
      item_group: this.category,
      start: this.page,
      page_length: 20
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
    if(!this.noProduct){
      this.page += 1;
      this.loading = true
      this.getItems();
    }
  }

  loadMoreItems(event: any) {
    // Support both Ionic ionScroll (event.detail.scrollTop) and plain DOM scroll (event.target.scrollTop)
    const scrollTop = event?.detail?.scrollTop ?? event?.target?.scrollTop ?? 0;
    const scrollHeight = event?.target?.scrollHeight ?? event?.detail?.scrollHeight ?? 0;
    const clientHeight = event?.target?.clientHeight ?? event?.detail?.clientHeight ?? 0;

    // Debugging help (remove if not needed)
    // console.log({ scrollTop, clientHeight, scrollHeight, loading: this.loading, noProduct: this.noProduct });

    // Prevent multiple triggers while already loading or when there are no more products
    if (this.loading || this.noProduct) {
      return;
    }

    // Trigger when user reaches (or gets within 20px of) the bottom
    if (scrollTop + clientHeight >= scrollHeight - 20) {
      this.page += 1;
      this.loading = true;
      this.getItems();
    }
  }


  async openFilterModal() {
    const modal = await this.modalCtrl.create({
      component: CatalogFilterComponent,
      cssClass: 'catalog-filter'
    });

    await modal.present();

    // 👇 Here you get the dismiss value
    const { data, role } = await modal.onDidDismiss();
  }

}
