import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Often imported for common directives like ngIf, ngFor
import { IonicModule } from '@ionic/angular';
import { CatalogCardsComponent } from './catalog-cards/catalog-cards.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { HeaderComponent } from './header/header.component';
import { ModalPopupComponent } from './modal-popup/modal-popup.component';
import { PaymentComponent } from './payment/payment.component';
import { FormsModule } from '@angular/forms';
import { CatalogFilterComponent } from './catalog-filter/catalog-filter.component';
import { BookListComponent } from './book-list/book-list.component';

@NgModule({
  declarations: [
    CatalogCardsComponent,
    DropdownComponent,
    HeaderComponent,
    ModalPopupComponent,
    PaymentComponent,
    CatalogFilterComponent,
    BookListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
],
  exports: [
    CatalogCardsComponent, // Exporting to be used in other modules
    DropdownComponent,
    HeaderComponent,
    ModalPopupComponent,
    PaymentComponent,
    CatalogFilterComponent,
    BookListComponent
  ]
})
export class ComponentsModule { }