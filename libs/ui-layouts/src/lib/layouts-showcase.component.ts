import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { TypedTranslocoComponent } from 'typed-transloco';
@Component({
  selector: 'lib-layouts-showcase',
  standalone: true,
    imports: [CommonModule, NgFor, TypedTranslocoComponent],
  templateUrl: './layouts-showcase.component.html',
  styleUrls: ['./layouts-showcase.component.scss']
})
export class LayoutsShowcaseComponent {
}
