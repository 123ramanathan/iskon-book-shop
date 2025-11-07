import { Component } from '@angular/core';
import { Db } from '../service/db';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: false,
})
export class TabsPage {
  selectedTab: any;
  constructor(public db: Db) {
  }

}
