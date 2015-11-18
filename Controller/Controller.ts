/// <reference path="../Model/Job.ts"/>
/// <reference path="../Model/FCFS.ts"/>
/// <reference path="../Model/SJF.ts"/>
/// <reference path="../Model/SRTN.ts"/>
/// <reference path="../View/jquery.d.ts"/>

var exTable      : Array<Array<string>>;

class Controller {
	
    private listJob             : Array<Job>;
    private counterJID          : number;
    private selectedAlgorithm   : number; //0-FCFS, 1-SJF, 2-SRTN
    private TCC                 : number; //UNIT TO DETERMINE HOW MANY LOGICAL TIME IS SPENT WITH CONTEXT CHANGE
    private arrivalCounter      : number; //ACCUMULATOR TO INCREMENT ARRIVAL TIME IN RANDOM ADDITIONS
    private algorithm;
   

    constructor() {

        this.TCC               = 1;
        this.selectedAlgorithm = 0;
        this.listJob           = new Array<Job>();
        this.counterJID        = 0;
        this.arrivalCounter    = 0;
    }
    
    //ADD JOB TO INPUT LIST
    public addJob(id: number, arrivalTime: number, instructions: string): boolean {

        var job: Job = new Job(id, arrivalTime, instructions);

        if (job.getInstructions() != null) {
            this.listJob.push(job);
            
            this.counterJID++;
            return true;
        }

        return false;
    }

    //REMOVE JOB FROM INPUT LIST
    public removeJob(JID: number): void {

        for (var job in this.listJob){
            if (this.listJob[job].getJID() == JID) { this.listJob.splice(job, 1) }
        }

    }

    //GENERATE A RANDOM JOB AND ADD IT TO INPUT JOB LIST
    public generateRandomSimulation(): string {
    	
        var numberInstructions  : number;
        var instruction         : number;
        var instructionSet      : string;

        instructionSet = "";

        numberInstructions = Math.floor((Math.random() * 10) + 1);

        for (var i = 0; i < numberInstructions; i++) {

            instruction = Math.floor((Math.random() * 2) + 1);

            if (instruction == 1)
                instructionSet += "P";
            else
                instructionSet += "B";


            if (i < numberInstructions - 1)
                instructionSet += " ";

        }
        return instructionSet;
    }


    //INSTANTIATE THE SCHEDULING PÓLICY
    public setAlgorithm(index: number): void {

        this.selectedAlgorithm = index;

        if(this.selectedAlgorithm == 0) { 
            this.algorithm = new FCFS(this.listJob);
            $("#algorithm").html("--> FCFS");
        }
       
        else if(this.selectedAlgorithm == 1) { 
            this.algorithm = new SJF(this.listJob); 
            $("#algorithm").html("--> SJF");
        }
       
        else if(this.selectedAlgorithm == 2) { 
            this.algorithm = new SRTN(this.listJob); 
            $("#algorithm").html("--> SRTN");
        }
    }

    public nextExecStep(): void {

        var counter        : number;
        
        var jobsCounter    : number;
        var instCounter    : number;

        exTable          = new Array<Array<string>>();
        
        exTable = this.algorithm.nextStepExecQueue();

        jobsCounter = 0;

        $("#tbody_teste").html("");

        $("#tbody_teste").append("<tr>");

        $("#tbody_teste").html("<th>JID</th>");

        for(counter=0; counter<this.algorithm.getExecCounter(); counter++) {
            $("#tbody_teste").append("<th>" + counter + "</th>")
        }

        $("#tbody_teste").append("</tr>");


        for(jobsCounter=0; jobsCounter<exTable.length; jobsCounter++) {

            $("#tbody_teste").append("<tr>");

            var waitingTime: number;

            for(instCounter=0; instCounter<exTable[jobsCounter].length; instCounter++) {
                $("#tbody_teste").append("<td class='cell'>" + exTable[jobsCounter][instCounter] + " </td>");
            }

            $("#tbody_teste").append("</tr>");
        }
        this.updateExecQueue();
    }
    

    public updateExecQueue(): void {

        var execQueue       : Array<Job>;
        var blockQueue      : Array<Job>;
        var jobsStatitics   : Array<Job>;
        var counter         : number;
        var instructions    : Array<string>;
        
        //calculo de desempenho
        var totalTimeCPU    : number;


        instructions = new Array<string>();
        execQueue  = this.algorithm.getExecQueue();
        blockQueue = this.algorithm.getBlockedQueue();


        $("#tbody_execution").html("");

        if(execQueue.length > 0) {

             for(counter=0; counter<execQueue[0].getInstructions().length; counter++) {

                if(counter == execQueue[0].getPC()-1) {
                    var html : string;

                    html = "<font color='red'>"
                    html += execQueue[0].getInstruction(counter);
                    html += "</font>"

                    instructions.push(html);

                } else {
                    instructions.push(execQueue[0].getInstruction(counter));
                }


             }



            $("#tbody_execution").append("<td><div class='job-col'>AT: " + execQueue[0].getArrivalTime()    + "<br>" + 
                                 "JID: "             + execQueue[0].getJID()            + "<br>" + 
                                 "INST: " + instructions + "<br>" +
                                 "PC: "    + execQueue[0].getPC() + "<br>" +
                                 "WT: "    + execQueue[0].getWaitingTime()    + "<br>" +
                                 "TT: " + execQueue[0].getTurnAroundTime() + "<br></div></td>");

        
        }

        //BEGIN - EXECUTION QUEUE TABLE
        $("#tbody_execqueue").html("");

        for(counter=1; counter<execQueue.length; counter++) {

           $("#tbody_execqueue").append("<td><div class='job-col'>AT: " + execQueue[counter].getArrivalTime()    + "<br>" + 
                                     "JID: "             + execQueue[counter].getJID()            + "<br>" + 
                                     "INST: "    + execQueue[counter].getInstructions()   + "<br>" +
                                     "PC: "    + execQueue[counter].getPC()    + "<br>" +
                                     "WT: "    + execQueue[counter].getWaitingTime()    + "<br>" +
                                     "TT: " + execQueue[counter].getTurnAroundTime() + "<br></div></td>");
                                  
        }
        //END - EXECUTION QUEUE TABLE



        //BEGIN - BLOCK QUEUE TABLE
        $("#tbody_blockedQueue").html("");


        for(counter=0; counter<blockQueue.length; counter++) {

           $("#tbody_blockedQueue").append("<td><div class='job-col'>AT: " + blockQueue[counter].getArrivalTime()    + "<br>" + 
                                     "JID: "             + blockQueue[counter].getJID()            + "<br>" + 
                                     "INST: "    + blockQueue[counter].getInstructions()   + "<br>" +
                                     "PC: "    + blockQueue[counter].getPC()    + "<br>" +
                                     "WT: "    + blockQueue[counter].getWaitingTime()    + "<br>" +
                                     "TT: " + blockQueue[counter].getTurnAroundTime() + "<br></div></td>");
                                  
        }
        //END - BLOCK QUEUE TABLE


        jobsStatitics = this.algorithm.getJobsStatistcs();

        //BEGIN - JOBS STATISTCS
        $("#tbody_jobsStats").html("");

        for(counter=0; counter<jobsStatitics.length; counter++) {

           $("#tbody_jobsStats").append("<td><div class='job-col'>AT: " + jobsStatitics[counter].getArrivalTime()    + "<br>" + 
                                     "JID: "             + jobsStatitics[counter].getJID()            + "<br>" + 
                                     "INST: "    + jobsStatitics[counter].getInstructions()   + "<br>" +
                                     "PC: "    + jobsStatitics[counter].getPC()    + "<br>" +
                                     "WT: "    + jobsStatitics[counter].getWaitingTime()    + "<br>" +
                                     "TT: " + jobsStatitics[counter].getTurnAroundTime() + "<br></div></td>");
                                  
        }
        //END - JOBS STATISTCS

        //BEGIN - CPU USAGE TABLE

        totalTimeCPU = (this.algorithm.getIdleCPU()+this.algorithm.getCpuUtilization()+ (this.algorithm.getTccTime()*0.1) );

        $("#cpu_usage").html( (this.algorithm.getCpuUtilization()+ (this.algorithm.getTccTime()*0.1)).toFixed(1)  + " | " + 
            ( (1 - (this.algorithm.getIdleCPU()/totalTimeCPU)) * 100).toFixed(2) + "%") ;
        

        $("#context_change").html( (this.algorithm.getTccTime()*0.1).toFixed(1)  + " | " +
             ( ( (this.algorithm.getTccTime()*0.1) / totalTimeCPU) * 100).toFixed(2) + "%");

        var len:number;
        len = execQueue.length * 210;
        $("#fixed-panel").width(len);


        var len2:number;
        len2 = jobsStatitics.length * 210;
        $("#fixed-panel2").width(len2);
        //END - CPU USAGE TABLE
    }

    //RETURN THE JID COUNTER
    public getJID(): number {  return this.counterJID;  }

    public getAllJobs(): Array<Job> {  return this.algorithm.getExecQueue();  }

    //OVERRIDE OF toString OBJECT FUNCTION
    public toString(): string {

        var result: string;

        result = "";

        for (var job in this.listJob) {
            result += this.listJob[job].toString();
        }

        return result;
    }

}
