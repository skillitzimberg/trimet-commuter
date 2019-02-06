import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'pancake-menu',
  templateUrl: './pancake-menu.component.html',
  styleUrls: ['./pancake-menu.component.css']
})
export class PancakeMenuComponent {
  constructor( private route: Router ) { }

  @Output() toggleNav = new EventEmitter();

  openNav() {
    this.toggleNav.emit();
  }

  changeMode(mode) {
    this.route.navigate(['main', mode]);
  }

}
