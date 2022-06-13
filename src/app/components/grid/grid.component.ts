import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Square } from 'src/app/models/square.model';

@Component({
  selector: 'grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./set.component.scss']
})
export class GridComponent {

  @Input() squares: Square[] = [];
  @Output() selectedSquare = new EventEmitter<Square | null>();

  constructor() { }

  onSquareClick(square: Square | null): void {
    this.selectedSquare.emit(square);
  }

}
