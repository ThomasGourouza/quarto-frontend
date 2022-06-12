import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GridComponent } from './components/grid/grid.component';
import { PieceComponent } from './components/piece/piece.component';
import { GameComponent } from './components/game/game.component';
import { GameService } from './services/game.service';
import { HttpClientModule, HttpClient } from '@angular/common/http'

@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    PieceComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    GameService,
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
