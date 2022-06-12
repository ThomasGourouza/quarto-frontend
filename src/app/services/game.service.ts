import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../models/game';
import { PostGame } from '../models/post-game';

const GAME_URL = 'http://localhost:8080/games/';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(
    private http: HttpClient
  ) { }

  public createGame(game: PostGame): Observable<Game> {
    return this.http.post<Game>(GAME_URL, game);
  }

  public getGames(): Observable<Array<Game>> {
    return this.http.get<Array<Game>>(GAME_URL);
  }

  public getGameById(id: string): Observable<Game> {
    return this.http.get<Game>(`${GAME_URL}${id}`);
  }

  public getGameByName(param: { name: string }): Observable<Array<Game>> {
    return this.http.get<Array<Game>>(`${GAME_URL}search`, {
      observe: 'body',
      params: this.asHttpParam(param)
    });
  }

  public updateGame(id: string, game: PostGame): Observable<Game> {
    return this.http.put<Game>(`${GAME_URL}${id}`, game);
  }

  public deleteGameById(id: string): Observable<void> {
    return this.http.delete<void>(`${GAME_URL}${id}`);
  }

  public play(id: string, move: { row: number, column: number }): Observable<Game> {
    return this.http.patch<Game>(`${GAME_URL}${id}/play`, move);
  }

  public asHttpParam(object: any): HttpParams {
    let httpParams = new HttpParams();
    for(const param in object) {
      httpParams = httpParams.set(param, object[param]);
    }
    return httpParams;
  }
}