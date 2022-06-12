import { Component, OnInit } from '@angular/core';
import { Square } from 'src/app/models/square.model';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onSquareClick(square: Square | null): void {
    console.log(square);
  }
}
