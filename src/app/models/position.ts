import { Piece } from "./piece.model";
import { Square } from "./square.model";

export class Position {
	public rank: number = 0;
	public currentPlayer: string = '';
	public board: Square[] = [];
	public set: Square[] = [];
	public currentPiece: Piece | null = null;

    constructor() { }

}