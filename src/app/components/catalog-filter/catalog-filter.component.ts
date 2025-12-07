import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-catalog-filter',
  templateUrl: './catalog-filter.component.html',
  styleUrls: ['./catalog-filter.component.scss'],
  standalone: false
})
export class CatalogFilterComponent  implements OnInit {
  @Input() categories: any[] = [];
  @Input() languages: any[] = [];

  @Input() selectedLanguage: string | null = null;
  @Input() selectedCategory: string | null = null;

  language: string | null = null;
  category: string | null = null;

 

 constructor(private modalCtrl: ModalController) {}

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

}
