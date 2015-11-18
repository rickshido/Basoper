/// <reference path="../Model/Job.d.ts" />
/// <reference path="../Model/FCFS.d.ts" />
/// <reference path="../Model/SJF.d.ts" />
/// <reference path="../Model/SRTN.d.ts" />
/// <reference path="../View/jquery.d.ts" />
declare var exTable: Array<Array<string>>;
declare class Controller {
    private listJob;
    private counterJID;
    private selectedAlgorithm;
    private TCC;
    private arrivalCounter;
    private algorithm;
    constructor();
    addJob(arrivalTime: number, instructions: string): boolean;
    addRandomList(index: number): void;
    removeJob(JID: number): void;
    generateRandomSimulation(): Array<Job>;
    setAlgorithm(index: number): void;
    nextExecStep(): void;
    updateExecQueue(): void;
    getJID(): number;
    getAllJobs(): Array<Job>;
    toString(): string;
}
