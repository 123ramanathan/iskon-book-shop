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
  languages = [];
  language:any="";
  page:number= 1;
  loading:boolean = false
  noProduct:boolean = false
  catalog:any[] = []

  categories:any[] = []

  constructor(public db:Db,private modalCtrl:ModalController) { }

  ionViewWillEnter(){
    this.db.get_cart_items();
    this.getItems();
    this.get_item_group();
    this.get_languages();
  }

  ionViewWillLeave(){
    this.catalog = []
    this.page = 1;
    this.noProduct = false;
  }

  ngOnInit(): void {
    
  }


  get_item_group(){
    let data = {
      doctype: "Item Group",
      languages: "Languages"
    }
    this.db.get_item_group(data).subscribe((res:any)=>{
      if(res.message && res.message.data && res.message.data.length > 0){
        res.message.data.unshift({name: "All Categories"});
        this.categories = res.message.data;
        this.languages = res.message.data
      }
    })
  }

  get_languages(){
    let data = {
      doctype: "Languages"
    }
    this.db.get_item_group(data).subscribe((res:any)=>{
      if(res.message && res.message.data && res.message.data.length > 0){
        this.languages = res.message.data
      }
    })
  }

  getItems(){
    let params = {
      // pos_profile: localStorage['store_name'],
      user: localStorage['username'],
      search_book_name: this.searchTxt,
      language: this.language,
      item_group: this.category,
      start: this.page,
      page_length: 10
    }

    this.db.sales_items_with_filters(params).subscribe((res:any)=>{
      // console.log(res,"res")
      if(res.message && res.message.items && res.message.items.length > 0){
        this.catalog = this.page === 1 ? res.message.items : [...this.catalog,...res.message.items]
        this.loading = false
        this.noProduct = false
      }else{
        this.catalog = this.page === 1 ? [] : this.catalog
        this.noProduct = true
        this.loading = false
      }
    })
  }

  onSearchChange(event: any) {
    window.scrollTo(0,0);

    const value = event.target.value.toLowerCase();

    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    this.debounceTimer = setTimeout(() => {
      this.page = 1;
      this.loading = true;
      this.getItems();
    }, 500);
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

  async loadMore(event: any) {
    if (!this.loading && this.loadMoreItems(event) && !this.db.isSearchFocused){
      this.loading = true;
      this.page++;
      window.scrollTo(0,0)
      await this.getItems();  // loading will become false after fetch finishes
   
      // event.target.complete();
    } 
  }


  // loadMore(event:any){
  //   setTimeout(() => {
  //     if(!this.loading){
  //       // if(!this.loading && this.loadMoreItems(event)){
  //         this.page += 1;
  //         this.loading = true
  //         this.getItems();
  //         event.target.complete();
  //     }
  //   }, 1000);
  // }

  loadMoreItems(event: any):any {
    // Support both Ionic ionScroll (event.detail.scrollTop) and plain DOM scroll (event.target.scrollTop)
    const scrollTop = event?.detail?.scrollTop ?? event?.target?.scrollTop ?? 0;
    const scrollHeight = event?.target?.scrollHeight ?? event?.detail?.scrollHeight ?? 0;
    const clientHeight = event?.target?.clientHeight ?? event?.detail?.clientHeight ?? 0;

    // Prevent multiple triggers while already loading or when there are no more products
    if (this.loading || this.noProduct) return false;

    // Trigger when user reaches (or gets within 20px of) the bottom
    if (scrollTop + clientHeight >= scrollHeight - 20) {
      return true
    }
  }


  async openFilterModal() {
    const modal = await this.modalCtrl.create({
      component: CatalogFilterComponent,
      cssClass: 'catalog-filter',
      componentProps: {
        categories: this.categories,
        languages: this.languages,
        selectedCategory: this.category,
        selectedLanguage: this.language
      }
    });

    await modal.present();

    // 👇 Here you get the dismiss value
    const { data, role } = await modal.onDidDismiss();

    if(data || role){
      this.category = data.category ? data.category : "All Categories"
      this.language = data.language ? data.language : ""
      this.loading = true;
      this.page = 1;
      this.getItems();
    }
  }

  onSearchFocus(){
    this.db.isSearchFocused = true;
  }

  onSearchBlur(){
    this.db.isSearchFocused = false;
  }

  mouseLeaveSearch(){
    this.db.isSearchFocused = false;
  }

}
