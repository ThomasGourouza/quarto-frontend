import { Player } from "./player";
import { Position } from "./position";

export class Game {
	public id: string = '';
	public name: string = '';
	public description: string = '';
	public players: Player[] = [];
	public over = false;
	public date: Date = new Date();
	public positions: Position[] = [];

    constructor() { }

}
