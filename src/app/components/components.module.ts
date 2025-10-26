import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Often imported for common directives like ngIf, ngFor
import { IonicModule } from '@ionic/angular';
import { CatalogCardsComponent } from './catalog-cards/catalog-cards.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { ModalPopupComponent } from './modal-popup/modal-popup.component';

@NgModule({
  declarations: [
    CatalogCardsComponent,
    DropdownComponent,
    ModalPopupComponent
    
  ],
  imports: [
    CommonModule,
    IonicModule
],
  exports: [
    CatalogCardsComponent, // Exporting to be used in other modules
    DropdownComponent,
    ModalPopupComponent
  ]
})
export class ComponentsModule { }