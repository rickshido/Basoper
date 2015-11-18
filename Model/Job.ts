
//Recebe como entrada o tempo de execução do processo e suas respectivas execuções


class Job {


    private PC                     : number; //program counter
    private JID                    : number; //job identification
    private arrivalTime            : number;
    private outTime                : number;
    private instructions           : Array<string>;
    private totalInstructions      : number;
    private instructionRemaining   : number;

    private waitingTime            : number;
    private turnAroundTime         : number;


    constructor(JID: number, arrivalTime: number, instructions: string) {
        
        this.JID               = JID;
        this.arrivalTime       = arrivalTime;
        this.instructions      = this.formatInstructions(instructions);
        this.totalInstructions = this.instructions.length;
        this.PC                = 0;

    }


    public getWaitingTime(): number { return this.waitingTime; }

    public getTurnAroundTime(): number { return this.outTime - this.arrivalTime; }

    public getRemainInstructions(): number { return (this.totalInstructions-1-this.PC); }

    public setWaitingTime(time: number): void { this.waitingTime = time; }

    public setTurnAroundTime(time: number): void { this.turnAroundTime = time; }

    public setOutTime(time: number): void { this.outTime = time; }

    public getJID(): number{ return this.JID; }

    public getArrivalTime(): number{ return this.arrivalTime; }

    public getInstructions(): Array<string>{ return this.instructions; }

    public getInstruction(index: number): string { return this.instructions[index]; }

    public getNextInstruction(): string { return this.instructions[this.PC++]; }

    public getTotalInstructions(): number { return this.instructions.length; }

    public getPC(): number { return this.PC; }

    public resetPC() : void { this.PC = 0; }

    public getOutTime(): number { return this.outTime; }

    public formatInstructions(instructions: string): Array<string>{

        var splitted:Array<string> = instructions.split(" ");

        for(var str in splitted){
            
            if(!(splitted[str] == "P") && !(splitted[str] == "B")){
                return null;
            }

        }
        return splitted;

    }


    public toString(): string {

        return ("JID: "+ this.JID +
            "\nArrival Time: "+ this.arrivalTime + 
            "\nInstructions: " + this.instructions + 
            "\n\n");

    }
}