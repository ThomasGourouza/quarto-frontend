import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GridComponent } from './components/grid/grid.component';
import { PieceComponent } from './components/piece/piece.component';
import { GameComponent } from './components/game/game.component';
import { GameService } from './services/game.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormComponent } from './components/form/form.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    PieceComponent,
    GameComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: [
    GameService,
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
