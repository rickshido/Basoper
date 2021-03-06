//Algoritimo de escalonamento FIFO
/// <reference path="Job.ts"/>
var SJF = (function () {
    function SJF(listJob) {
        var jobString;
        this.execQueue = new Array();
        this.blockQueue = new Array();
        this.tempQueue = new Array();
        this.tempQueue = listJob;
        this.idleCPU = 0;
        this.execTable = new Array();
        this.execStatistics = new Array();
        this.execCounter = 0;
        this.JID = 0;
        this.totalJobs = this.execQueue.length;
        this.TCC = true;
        this.cpuUtilization = 0;
        this.TCC_TIME = 0;
        this.totalInst = this.getTotalInstructions();
        jobString = new Array();
        this.oldJob = new Job(999, 999, "P");
    }
    SJF.prototype.idExists = function (idJob) {
        for (var counter = 0; counter < this.execTable.length; counter++) {
            if (this.execTable[counter][0] == String(idJob))
                return true;
        }
        return false;
    };
    SJF.prototype.insertExecTable = function (idJob, instruction) {
        var i;
        var newJob;
        newJob = Array();
        if (this.idExists(idJob)) {
            for (i = 0; i < this.execTable.length; i++) {
                if (this.execTable[i][0] == String(idJob)) {
                    this.execTable[i].push(instruction);
                }
                else {
                    this.execTable[i].push(" ");
                }
            }
        }
        else {
            for (i = 0; i < this.execTable.length; i++) {
                this.execTable[i].push(" ");
            }
            newJob.push(String(idJob));
            for (i = 0; i < this.execCounter; i++) {
                newJob.push(" ");
            }
            newJob.push(instruction);
            this.execTable.push(newJob);
        }
        this.execCounter++;
    };
    SJF.prototype.testInsertExecTable = function () {
        this.insertExecTable(0, "P");
        this.insertExecTable(0, "P");
        this.insertExecTable(0, "P");
        this.insertExecTable(1, "P");
        this.insertExecTable(1, "P");
        this.insertExecTable(0, "P");
        this.insertExecTable(2, "P");
        this.insertExecTable(2, "P");
        this.insertExecTable(2, "P");
        this.insertExecTable(0, "P");
        this.insertExecTable(1, "P");
        this.insertExecTable(1, "P");
        this.insertExecTable(1, "P");
        this.insertExecTable(2, "P");
        this.insertExecTable(2, "P");
    };
    //É o método que irá avançar um passo de instrução e adiciona um Job a fila
    SJF.prototype.nextStepExecQueue = function () {
        var jobString;
        var i;
        var j;
        var instruction;
        var newJobString;
        jobString = new Array();
        newJobString = new Array();
        this.updateJobEntries();
        //Retira o job bloqueado e o coloca na fila de pronto
        if (this.blockQueue.length > 0) {
            if (this.blockQueue[0].getPC() < this.blockQueue[0].getTotalInstructions()) {
                this.execQueue.push(this.blockQueue[0]);
            }
            this.blockQueue.splice(0, 1);
        }
        if (this.execQueue.length > 0) {
            //Verifica se é um novo Job
            if (this.execQueue[0].getPC() == 0) {
                this.execQueue[0].setWaitingTime(this.execCounter - this.execQueue[0].getArrivalTime());
                instruction = this.execQueue[0].getNextInstruction();
                this.insertExecTable(this.execQueue[0].getJID(), instruction);
                //atribuindo o old pela primeira vez
                this.oldJob = this.execQueue[0];
                //SE ACABAR INSTRUÇÕES DE UM JOB, Remove job da Queue
                if ((this.execQueue[0].getPC() == this.execQueue[0].getTotalInstructions()) && (instruction == 'P')) {
                    this.execQueue[0].setOutTime(this.execCounter);
                    this.execStatistics.push(this.execQueue[0]);
                    this.insertExecTable(this.execQueue[0].getJID(), "&#8596");
                    this.TCC_TIME++;
                    this.execQueue.splice(0, 1);
                    this.sortShortestJob();
                }
                if (instruction == 'P') {
                    this.cpuUtilization++;
                }
                else {
                    this.insertExecTable(this.execQueue[0].getJID(), "&#8596");
                    this.TCC_TIME++;
                    this.blockQueue.push(this.execQueue[0]);
                    this.execQueue.splice(0, 1);
                    this.sortShortestJob();
                    //se tiver apenas um job e houver um bloqueio
                    //esse bloqueio contabiliza como ocioso
                    if ((this.execQueue.length == 0) && (instruction == "B")) {
                        this.idleCPU++;
                    }
                }
            }
            else if (this.execQueue[0].getPC() > 0) {
                instruction = this.execQueue[0].getNextInstruction();
                this.insertExecTable(this.execQueue[0].getJID(), instruction);
                if (instruction == 'P') {
                    this.cpuUtilization++;
                }
                else {
                }
                if (this.execQueue.length > 0) {
                    this.oldJob = this.execQueue[0];
                }
                //SE ACABAR INSTRUÇÕES DE UM JOB, Remove job da Queue
                if (this.execQueue[0].getPC() == this.execQueue[0].getTotalInstructions()) {
                    this.execQueue[0].setOutTime(this.execCounter);
                    this.execStatistics.push(this.execQueue[0]);
                }
                //SE ACABAR INSTRUÇÕES DE UM JOB OU FOR UMA INSTRUÇÃO DE BLOQUEIO, Remove job da Queue
                if ((this.execQueue[0].getPC() == this.execQueue[0].getTotalInstructions()) || (instruction == "B")) {
                    if ((this.execQueue[0].getPC() == this.execQueue[0].getTotalInstructions()) && (instruction == "B")) {
                        this.blockQueue.splice(0, 1);
                    }
                    if ((this.execQueue[0].getPC() < this.execQueue[0].getTotalInstructions()) && (instruction == "B")) {
                        this.blockQueue.push(this.execQueue[0]);
                    }
                    this.insertExecTable(this.execQueue[0].getJID(), "&#8596");
                    this.TCC_TIME++;
                    this.execQueue.splice(0, 1);
                    this.sortShortestJob();
                    //se tiver apenas um job e houver um bloqueio
                    //esse bloqueio contabiliza como ocioso
                    if ((this.execQueue.length == 0) && (instruction == "B")) {
                        this.idleCPU++;
                    }
                }
            }
        }
        else {
            if (this.blockQueue.length > 0) {
                this.insertExecTable(this.oldJob.getJID(), "-");
                this.idleCPU++;
            }
            else {
                if (this.tempQueue.length > 0) {
                    if (this.oldJob.getJID() == 999) {
                        this.insertExecTable(-1, "-");
                        this.idleCPU++;
                    }
                    else {
                        this.insertExecTable(this.oldJob.getJID(), "-");
                        this.idleCPU++;
                    }
                }
            }
        }
        return this.execTable;
    };
    SJF.prototype.updateJobEntries = function () {
        var counter;
        for (counter = 0; counter < this.tempQueue.length; counter++) {
            if (this.tempQueue[counter].getArrivalTime() <= this.execCounter) {
                this.execQueue.push(this.tempQueue[counter]);
                this.tempQueue.splice(counter, 1);
            }
        }
    };
    //Reordena a fila de execução de acordo com o comportamento do algorimo
    SJF.prototype.sortShortestJob = function () {
        var x;
        var y;
        var troca;
        var a;
        var b;
        for (x = 0; x < this.execQueue.length; x++) {
            for (y = 0; y < this.execQueue.length - 1 - x; y++) {
                a = this.execQueue[y].getRemainInstructions();
                b = this.execQueue[y + 1].getRemainInstructions();
                //Isso aqui foi o artifício necessário para o if conseguir comparar os valores a e b. Antes não havia comparação com sentido lógico
                //Por algum motivo, as variáveis "a" e "b" não eram identificadas como tipo numérico. Aff.... Após 4 horas de trabalho, descobrimos isso.
                a++;
                b++;
                if (a > b) {
                    troca = this.execQueue[y];
                    this.execQueue[y] = this.execQueue[y + 1];
                    this.execQueue[y + 1] = troca;
                }
            }
        }
    };
    SJF.prototype.getTotalInstructions = function () {
        var counter;
        var totalInstructions;
        totalInstructions = 0;
        for (counter = 0; counter < this.tempQueue.length; counter++) {
            totalInstructions += this.tempQueue[counter].getTotalInstructions();
        }
        return totalInstructions;
    };
    SJF.prototype.nextStepExecTimeLine = function () { return; };
    SJF.prototype.getExecQueue = function () { return this.execQueue; };
    SJF.prototype.getBlockedQueue = function () { return this.blockQueue; };
    SJF.prototype.getJobsStatistcs = function () { return this.execStatistics; };
    SJF.prototype.execFull = function () { };
    SJF.prototype.getExecCounter = function () { return this.execCounter; };
    SJF.prototype.getTccTime = function () { return this.TCC_TIME; };
    SJF.prototype.getCpuUtilization = function () { return this.cpuUtilization; };
    SJF.prototype.getIdleCPU = function () { return this.idleCPU; };
    return SJF;
})();
