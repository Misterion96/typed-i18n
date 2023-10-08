import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { TypedTranslocoComponent } from 'typed-transloco';

@Component({
  selector: 'lib-actions-showcase',
  standalone: true,
    imports: [CommonModule, NgFor, TypedTranslocoComponent],
  templateUrl: './actions-showcase.component.html',
  styleUrls: ['./actions-showcase.component.scss']
})
export class ActionsShowcaseComponent {
}
