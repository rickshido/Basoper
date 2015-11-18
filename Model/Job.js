//Recebe como entrada o tempo de execução do processo e suas respectivas execuções
var Job = (function () {
    function Job(JID, arrivalTime, instructions) {
        this.JID = JID;
        this.arrivalTime = arrivalTime;
        this.instructions = this.formatInstructions(instructions);
        this.totalInstructions = this.instructions.length;
        this.PC = 0;
    }
    Job.prototype.getWaitingTime = function () { return this.waitingTime; };
    Job.prototype.getTurnAroundTime = function () { return this.outTime - this.arrivalTime; };
    Job.prototype.getRemainInstructions = function () { return (this.totalInstructions - 1 - this.PC); };
    Job.prototype.setWaitingTime = function (time) { this.waitingTime = time; };
    Job.prototype.setTurnAroundTime = function (time) { this.turnAroundTime = time; };
    Job.prototype.setOutTime = function (time) { this.outTime = time; };
    Job.prototype.getJID = function () { return this.JID; };
    Job.prototype.getArrivalTime = function () { return this.arrivalTime; };
    Job.prototype.getInstructions = function () { return this.instructions; };
    Job.prototype.getInstruction = function (index) { return this.instructions[index]; };
    Job.prototype.getNextInstruction = function () { return this.instructions[this.PC++]; };
    Job.prototype.getTotalInstructions = function () { return this.instructions.length; };
    Job.prototype.getPC = function () { return this.PC; };
    Job.prototype.resetPC = function () { this.PC = 0; };
    Job.prototype.getOutTime = function () { return this.outTime; };
    Job.prototype.formatInstructions = function (instructions) {
        var splitted = instructions.split(" ");
        for (var str in splitted) {
            if (!(splitted[str] == "P") && !(splitted[str] == "B")) {
                return null;
            }
        }
        return splitted;
    };
    Job.prototype.toString = function () {
        return ("JID: " + this.JID +
            "\nArrival Time: " + this.arrivalTime +
            "\nInstructions: " + this.instructions +
            "\n\n");
    };
    return Job;
})();
