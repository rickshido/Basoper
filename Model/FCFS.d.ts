/// <reference path="Job.d.ts" />
declare class FCFS {
    private execQueue;
    private blockQueue;
    private tempQueue;
    private execTable;
    private execCounter;
    private totalJobs;
    private JID;
    private TCC;
    private cpuUtilization;
    private TCC_TIME;
    private execStatistics;
    private totalInst;
    private oldJob;
    private idleCPU;
    constructor(listJob: Array<Job>);
    idExists(idJob: number): boolean;
    insertExecTable(idJob: number, instruction: string): void;
    private testInsertExecTable();
    nextStepExecQueue(): Array<Array<string>>;
    updateJobEntries(): void;
    sortShortestJob(): void;
    getTotalInstructions(): number;
    nextStepExecTimeLine(): string;
    getExecQueue(): Array<Job>;
    getBlockedQueue(): Array<Job>;
    getJobsStatistcs(): Array<Job>;
    execFull(): void;
    getExecCounter(): number;
    getTccTime(): number;
    getCpuUtilization(): number;
    getIdleCPU(): number;
}
