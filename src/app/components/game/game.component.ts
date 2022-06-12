import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/models/game';
import { Position } from 'src/app/models/position';
import { Square } from 'src/app/models/square.model';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  game: Game = new Game();

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
  }

  onCreateGame(): void {
    this.gameService.createGame({
      name: "partie test2",
      description: "test",
      player1: "premier",
      player2: "deuxième"
    }).subscribe((game) => this.game = game);
  }

  onSquareClick(square: Square | null): void {
    if (!!square) {
      this.gameService.play(this.game.id, { row: square.row, column: square.column })
        .subscribe((game) => this.game = game);
    }
  }

  getCurrentRank(positions: Position[]): number {
    return positions[positions.length - 1].rank;
  }

  getCurrentPlayer(positions: Position[]): string {
    return positions[positions.length - 1].currentPlayer;
  }

  getBoard(positions: Position[]): Square[] {
    return positions[positions.length - 1].board;
  }

  getSet(positions: Position[]): Square[] {
    return positions[positions.length - 1].set;
  }
}
