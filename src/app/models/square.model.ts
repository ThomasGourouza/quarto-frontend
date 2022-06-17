import { Piece } from "./piece.model";

export class Square {
    public row: number = 0;
    public column: number = 0;
    public piece: Piece | null = null;
    public winner = false;

    constructor() { }

}
