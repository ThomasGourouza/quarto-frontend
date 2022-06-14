import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Square } from 'src/app/models/square.model';
import { GridType } from '../game/game.component';

@Component({
  selector: 'grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent {

  @Input() squares: Square[] = [];
  @Input() gridType: GridType = 'board';
  @Output() selectedSquare = new EventEmitter<Square | null>();

  constructor() { }

  onSquareClick(square: Square | null): void {
    this.selectedSquare.emit(square);
  }

}
