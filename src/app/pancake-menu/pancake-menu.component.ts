import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pancake-menu',
  templateUrl: './pancake-menu.component.html',
  styleUrls: ['./pancake-menu.component.css']
})
export class PancakeMenuComponent {
  @Output() toggleNav = new EventEmitter()

  openNav() {
    this.toggleNav.emit();
  }

}
