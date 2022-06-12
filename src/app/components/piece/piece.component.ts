import { Component, Input } from '@angular/core';
import { Piece } from 'src/app/models/piece.model';

@Component({
  selector: 'piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.scss']
})
export class PieceComponent {

  @Input() piece!: Piece | null;

  constructor() { }

}
