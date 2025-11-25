import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-catalog-filter',
  templateUrl: './catalog-filter.component.html',
  styleUrls: ['./catalog-filter.component.scss'],
  standalone: false
})
export class CatalogFilterComponent  implements OnInit {
 languages = ['English', 'Tamil', 'Hindi', 'Malayalam'];
  categories = ['Fiction', 'Kids', 'History', 'Education'];

  selectedLanguage: string | null = null;
  selectedCategory: string | null = null;
 

 constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

 

  selectLanguage(lang: string) {
    this.selectedLanguage = lang;
  }

  selectCategory(cat: string) {
    this.selectedCategory = cat;
  }

  submit() {
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
