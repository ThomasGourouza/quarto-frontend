import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/models/game';
import { Piece } from 'src/app/models/piece.model';
import { Position } from 'src/app/models/position';
import { Square } from 'src/app/models/square.model';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {

  game: Game = new Game();

  private gameSubscription = new Subscription();

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.gameSubscription = this.gameService.game$.subscribe((game) => this.game = game);
  }

  ngOnDestroy(): void {
    this.gameSubscription.unsubscribe();
  }

  onCreateGame(): void {
    this.gameService.createGame({
      name: "partie test2",
      description: "test",
      player1: "premier",
      player2: "deuxième"
    });
  }

  onSquareClick(square: Square | null, type: 'board' | 'set'): void {
    if (!!square && (this.playConditionForBoard(square, type) || this.playConditionForSet(square, type))) {
      this.gameService.play(this.game.id, { row: square.row, column: square.column });
    }
  }

  private playConditionForBoard(square: Square, type: 'board' | 'set'): boolean {
    return type === 'board' && !!this.getLast(this.game.positions).currentPiece && !square.piece;
  }

  private playConditionForSet(square: Square, type: 'board' | 'set'): boolean {
    return type === 'set' && !this.getLast(this.game.positions).currentPiece && !!square.piece;
  }

  getCurrentRank(positions: Position[]): number {
    return this.getLast(positions).rank;
  }

  getCurrentPlayer(positions: Position[]): string {
    return this.getLast(positions).currentPlayer;
  }

  getCurrentPiece(positions: Position[]): Piece | null {
    return this.getLast(positions).currentPiece;
  }

  getBoard(positions: Position[]): Square[] {
    return this.getLast(positions).board;
  }

  getSet(positions: Position[]): Square[] {
    return this.getLast(positions).set;
  }

  private getLast(positions: Position[]): Position {
    return positions[positions.length - 1];
  }
}
