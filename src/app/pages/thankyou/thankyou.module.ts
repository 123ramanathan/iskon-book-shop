import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ThankyouPageRoutingModule } from './thankyou-routing.module';

import { ThankyouPage } from './thankyou.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ThankyouPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ThankyouPage]
})
export class ThankyouPageModule {}
