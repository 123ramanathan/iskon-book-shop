import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  standalone:false
})
export class DropdownComponent  implements OnInit {

  @Input() options: string[] = [];
  @Input() defaultLabel: string = 'Select option';
  @Output() selectionChange = new EventEmitter<string>();

  selectedOption: string = '';
  isOpen = false;

  ngOnInit() {
    this.selectedOption = this.defaultLabel;
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectOption(option: string) {
    this.selectedOption = option;
    this.selectionChange.emit(option);
    this.isOpen = false;
  }

  closeDropdown(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown')) {
      this.isOpen = false;
    }
  }

}
