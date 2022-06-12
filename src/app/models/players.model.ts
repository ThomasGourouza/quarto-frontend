export class Players {
    public player1: string;
    public isAiPlayer1: boolean;
    public canSwitchOffAiPlayer1: boolean;
    public player2: string;
    public isAiPlayer2: boolean;
    public canSwitchOffAiPlayer2: boolean;
    public currentPlayer1: boolean;
    public hasAiBeenSwitchOff: boolean;

    constructor(
        player1: string,
        isAiPlayer1: boolean,
        canSwitchOffAiPlayer1: boolean,
        player2: string,
        isAiPlayer2: boolean,
        canSwitchOffAiPlayer2: boolean,
        currentPlayer1: boolean,
        hasAiBeenSwitchOff: boolean
    ) {
        this.player1 = player1;
        this.isAiPlayer1 = isAiPlayer1;
        this.canSwitchOffAiPlayer1 = canSwitchOffAiPlayer1;
        this.player2 = player2;
        this.isAiPlayer2 = isAiPlayer2;
        this.canSwitchOffAiPlayer2 = canSwitchOffAiPlayer2;
        this.currentPlayer1 = currentPlayer1;
        this.hasAiBeenSwitchOff = hasAiBeenSwitchOff;
    }

}
