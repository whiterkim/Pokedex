import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PokeDex';
  constructor(
    private router: Router,
    private location: Location
  ) { }

  goHome(): void {
    this.router.navigate(['/'])
  }

  goBack(): void {
    this.location.back()
  }

  OnDropdownSelect(select: string) {
    if (select === 'Pokemon') {
      this.router.navigate(['/pokemon-list']);
    } else if (select === 'Ability') {
      this.router.navigate(['/ability-list']);
    } else if (select === 'Item') {
      this.router.navigate(['/item-list']);
    } else if (select === 'Move') {
      this.router.navigate(['/move-list']);
    }
  }
}
