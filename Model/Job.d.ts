declare class Job {
    private PC;
    private JID;
    private arrivalTime;
    private outTime;
    private instructions;
    private totalInstructions;
    private instructionRemaining;
    private waitingTime;
    private turnAroundTime;
    constructor(JID: number, arrivalTime: number, instructions: string);
    getWaitingTime(): number;
    getTurnAroundTime(): number;
    getRemainInstructions(): number;
    setWaitingTime(time: number): void;
    setTurnAroundTime(time: number): void;
    setOutTime(time: number): void;
    getJID(): number;
    getArrivalTime(): number;
    getInstructions(): Array<string>;
    getInstruction(index: number): string;
    getNextInstruction(): string;
    getTotalInstructions(): number;
    getPC(): number;
    getOutTime(): number;
    formatInstructions(instructions: string): Array<string>;
    toString(): string;
}
