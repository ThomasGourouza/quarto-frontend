import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/models/game';
import { Piece } from 'src/app/models/piece.model';
import { Position } from 'src/app/models/position';
import { PostGame } from 'src/app/models/post-game';
import { Square } from 'src/app/models/square.model';
import { FormService } from 'src/app/services/form.service';
import { GameService } from 'src/app/services/game.service';
export type GridType = 'board' | 'set';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {

  game: Game = new Game();
  boardType = 'board';
  setType = 'set';
  gameOverMessage = '';

  private gameSubscription = new Subscription();
  private moveSubscription = new Subscription();

  constructor(
    private gameService: GameService,
    private formService: FormService
  ) { }

  ngOnInit(): void {
    this.gameSubscription = this.gameService.game$.subscribe((game) => {
      this.game = game;
      if (this.game.over) {
        const winner = this.game.players.find((player) => player.winner)?.name;
        this.gameOverMessage = !!winner ? `Congratulation ${winner}, you won!` : 'This is a draw!';
      } else {
        const lastPosition = this.getLast(this.game.positions);
        if (!!lastPosition && lastPosition.currentPlayerId == 2 && !!lastPosition.currentPiece && game.id !== '') {
          this.gameService.aiPlay(this.game.id);
        }
      }
      this.formService.setDisabled(false);
    });
    this.moveSubscription = this.gameService.moves$.subscribe((moves) => {
      if (this.game.id !== '') {
        for (let i = 0; i < moves.length; i++) {
          setTimeout(() => {
            this.gameService.play(this.game.id, moves[i]);
          }, i === 0 ? 500 : 1500);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.gameSubscription.unsubscribe();
    this.moveSubscription.unsubscribe();
  }

  onFormSubmit(postGame: PostGame): void {
    this.gameService.createGame(postGame);
  }

  onSquareClick(square: Square | null, type: GridType): void {
    if (!this.game.over && !!square && (this.playConditionForBoard(square, type) || this.playConditionForSet(square, type)) && this.getLast(this.game.positions).currentPlayerId === 1) {
      this.gameService.play(this.game.id, { row: square.row, column: square.column });
    }
  }

  private playConditionForBoard(square: Square, type: GridType): boolean {
    return type === this.boardType && !!this.getLast(this.game.positions).currentPiece && !square.piece;
  }

  private playConditionForSet(square: Square, type: GridType): boolean {
    return type === this.setType && !this.getLast(this.game.positions).currentPiece && !!square.piece;
  }

  getCurrentRank(positions: Position[]): number {
    return this.getLast(positions).rank;
  }

  getCurrentPlayer(positions: Position[]): string {
    return this.game.players.find((player) =>
      player.id == this.getLast(positions).currentPlayerId
    )?.name as string;
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
