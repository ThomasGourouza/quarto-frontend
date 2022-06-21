import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Game } from '../models/game';
import { PostGame } from '../models/post-game';
import { PostMove } from '../models/post-move';

const GAME_URL = 'http://localhost:8080/games/';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  game$: BehaviorSubject<Game> = new BehaviorSubject(new Game());
  games$: BehaviorSubject<Game[]> = new BehaviorSubject([new Game()]);
  moves$: BehaviorSubject<PostMove[]> = new BehaviorSubject([{ row: 0, column: 0}]);

  constructor(
    private http: HttpClient
  ) { }

  public createGame(postGame: PostGame): void  {
    this.subscribeGame(this.http.post<Game>(GAME_URL, postGame));
  }

  public getGames(): void {
    this.subscribeGames(this.http.get<Game[]>(GAME_URL));
  }

  public getGameById(id: string): void {
    this.subscribeGame(this.http.get<Game>(`${GAME_URL}${id}`));
  }

  public getGameByName(param: { name: string }): void {
    this.subscribeGames(this.http.get<Game[]>(`${GAME_URL}search`, {
      observe: 'body',
      params: this.asHttpParam(param)
    }));
  }

  public updateGame(id: string, game: PostGame): void {
    this.subscribeGame(this.http.put<Game>(`${GAME_URL}${id}`, game));
  }

  public deleteGameById(id: string): void {
    this.http.delete<void>(`${GAME_URL}${id}`).subscribe(() => {
      console.log('deleted');
    }).unsubscribe();
  }

  public play(id: string, move: PostMove): void {
    this.subscribeGame(this.http.patch<Game>(`${GAME_URL}${id}/play`, move));
  }

  public aiPlay(id: string): void {
    this.subscribeMoves(this.http.get<PostMove[]>(`${GAME_URL}${id}/moves`));
  }

  private subscribeMoves(observable: Observable<PostMove[]>): void {
    observable.subscribe((moves) => {
      if (!!moves && moves[0].row + moves[0].column > 1) {
        this.moves$.next(moves);
      }
    });
  }

  private subscribeGame(observable: Observable<Game>): void {
    observable.subscribe((game) => {
      if (!!game) {
        this.game$.next(game);
      }
    });
  }

  private subscribeGames(observable: Observable<Game[]>): void {
    observable.subscribe((games) => {
      if (!!games) {
        this.games$.next(games);
      }
    });
  }

  private asHttpParam(object: any): HttpParams {
    let httpParams = new HttpParams();
    for(const param in object) {
      httpParams = httpParams.set(param, object[param]);
    }
    return httpParams;
  }
}