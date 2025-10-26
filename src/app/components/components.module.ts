import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Often imported for common directives like ngIf, ngFor
import { IonicModule } from '@ionic/angular';
import { CatalogCardsComponent } from './catalog-cards/catalog-cards.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    CatalogCardsComponent,
    DropdownComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    IonicModule
],
  exports: [
    CatalogCardsComponent, // Exporting to be used in other modules
    DropdownComponent,
    HeaderComponent
  ]
})
export class ComponentsModule { }