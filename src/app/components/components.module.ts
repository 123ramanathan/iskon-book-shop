import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Often imported for common directives like ngIf, ngFor
import { IonicModule } from '@ionic/angular';
import { CatalogCardsComponent } from './catalog-cards/catalog-cards.component';

@NgModule({
  declarations: [
    CatalogCardsComponent,
    
  ],
  imports: [
    CommonModule,
    IonicModule
],
  exports: [
    CatalogCardsComponent // Exporting to be used in other modules
  ]
})
export class ComponentsModule { }