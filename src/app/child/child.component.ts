import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  styles: `.btn { padding: 5px; }`,
  template: ` <button class="btn" (click)="onClick()">Add Item</button> `,
  standalone: true,
})
export class ChildComponent {
  @Output() incrementCountEvent = new EventEmitter<number>();
  count: number = 0;
  onClick() {
    this.count++;
    this.incrementCountEvent.emit(this.count);
  }
}
