import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Db } from 'src/app/service/db';

@Component({
  selector: 'app-catalog-filter',
  templateUrl: './catalog-filter.component.html',
  styleUrls: ['./catalog-filter.component.scss'],
  standalone: false
})
export class CatalogFilterComponent  implements OnInit {
  @Input() categories: any[] = [];
  @Input() languages: any[] = [];
  // languages: any[] = [];
  // categories: any[] = [];

  @Input() selectedLanguage: string | null = null;
  @Input() selectedCategory: string | null = null;

  language: string | null = null;
  category: string | null = null;

 

 constructor(private modalCtrl: ModalController, public db: Db) {}

  ngOnInit() {
    this.language = this.selectedLanguage;
    this.category = this.selectedCategory;
  }

  selectLanguage(lang: string) {
    this.language = this.language === lang ? null : lang;
  }

  selectCategory(cat: string) {
    this.category = this.category === cat ? null : cat;
  }

  submit() {
    this.selectedCategory = this.category;
    this.selectedLanguage = this.language;

    this.modalCtrl.dismiss(
      {
        language: this.selectedLanguage,
        category: this.selectedCategory
      },
      'confirm'
    );
  }

  close() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  clearFilters() {
    this.selectedCategory = null;
    this.selectedLanguage = null;

    this.modalCtrl.dismiss(
      {
        language: this.selectedLanguage,
        category: this.selectedCategory
      },
      'confirm'
    );
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

}
