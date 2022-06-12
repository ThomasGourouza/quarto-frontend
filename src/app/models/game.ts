import { Position } from "./position";

export class Game {
	public id: string = '';
	public name: string = '';
	public description: string = '';
	public player1: string = '';
	public player2: string = '';
	public date: Date = new Date();
	public positions: Position[] = [];

    constructor() { }

}
