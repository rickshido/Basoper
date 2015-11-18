
//Algoritimo de escalonamento FIFO
/// <reference path="Job.ts"/>

class SRTN {

	
	private execQueue          : Array<Job>;
	private blockQueue         : Array<Job>;
	private tempQueue          : Array<Job>;
	private execTable	       : Array<Array<string>>;
	private execCounter        : number;
	private totalJobs          : number;
	private	JID                : number;
	private TCC                : boolean;
	private cpuUtilization     : number;
	private TCC_TIME	       : number;
	private execStatistics     : Array<Job>;
	private totalInst          : number;
	private oldJob		       : Job
	private idleCPU            : number;

	constructor(listJob: Array<Job>) {

		var jobString      : Array<string>;

		this.execQueue      = new Array<Job>();
		this.blockQueue     = new Array<Job>();
		this.tempQueue      = new Array<Job>();
		this.tempQueue      = listJob;
		this.idleCPU        = 0;

		this.execTable      = new Array<Array<string>>();
		this.execStatistics = new Array<Job>();
		this.execCounter    = 0;
		this.JID            = 0;
		this.totalJobs      = this.execQueue.length;
		this.TCC            = true;
		this.cpuUtilization = 0;
		this.TCC_TIME       = 0;
		this.totalInst      = this.getTotalInstructions();

		jobString      = new Array<string>();

		this.oldJob = new Job(999,999,"P");

	}

	public idExists(idJob: number): boolean {

		for(var counter=0; counter<this.execTable.length; counter++) {

			if(this.execTable[counter][0] == String(idJob))
				return true;
				
		}

		return false;

	}

	public insertExecTable(idJob: number, instruction: string): void {

		var i           : number;
		var newJob      : Array<string>;

		newJob = Array<string>();

		if(this.idExists(idJob)) {

			for(i=0; i<this.execTable.length; i++) {
			
				if(this.execTable[i][0] == String(idJob)) {

					this.execTable[i].push(instruction);

				} else {
					this.execTable[i].push(" ");
				}
			}
			
		} else {

			for(i=0; i<this.execTable.length; i++) {
				this.execTable[i].push(" ");
			}

			newJob.push(String(idJob));
			for(i=0; i<this.execCounter; i++) {

				newJob.push(" ");

			}

			newJob.push(instruction);

			this.execTable.push(newJob);

		}

		this.execCounter++;

	}

	private testInsertExecTable(){
		this.insertExecTable(0,"P");
		this.insertExecTable(0,"P");
		this.insertExecTable(0,"P");
		this.insertExecTable(1,"P");
		this.insertExecTable(1,"P");
		this.insertExecTable(0,"P");
		this.insertExecTable(2,"P");
		this.insertExecTable(2,"P");
		this.insertExecTable(2,"P");
		this.insertExecTable(0,"P");
		this.insertExecTable(1,"P");
		this.insertExecTable(1,"P");
		this.insertExecTable(1,"P");
		this.insertExecTable(2,"P");
		this.insertExecTable(2,"P");
	}


	//É o método que irá avançar um passo de instrução e adiciona um Job a fila
	public nextStepExecQueue(): Array<Array<string>> {

		var jobString      : Array<string>;
		var i              : number;
		var j              : number;
		var instruction    : string;
		var newJobString   : Array<string>;


		jobString          = new Array<string>();
		newJobString       = new Array<string>();

		this.updateJobEntries();


		//Retira o job bloqueado e o coloca na fila de pronto
		if(this.blockQueue.length > 0) {
			if(this.blockQueue[0].getPC() < this.blockQueue[0].getTotalInstructions()) {
				this.execQueue.push(this.blockQueue[0]);
			} 
			
			this.blockQueue.splice(0,1);
		}

		if(this.execQueue.length > 0) {
			
			this.sortShortestJob();

			//Verifica se é um novo Job
			if(this.execQueue[0].getPC() == 0) {

				this.execQueue[0].setWaitingTime(this.execCounter - this.execQueue[0].getArrivalTime());

				instruction = this.execQueue[0].getNextInstruction();

				if((this.oldJob.getInstruction(this.oldJob.getPC()-1) == 'P') && (this.oldJob.getJID() != this.execQueue[0].getJID()) && (this.oldJob.getJID() != 999)
					&& (this.oldJob.getPC() != this.oldJob.getTotalInstructions())) {
					this.insertExecTable(this.execQueue[0].getJID()-1, "&#8596");					
					this.TCC_TIME++;
				}

				this.insertExecTable(this.execQueue[0].getJID(), instruction);				

				//SE ACABAR INSTRUÇÕES DE UM JOB, Remove job da Queue
				if((this.execQueue[0].getPC() == this.execQueue[0].getTotalInstructions()) && (instruction == 'P')) {
					this.execQueue[0].setOutTime(this.execCounter);
					this.execStatistics.push(this.execQueue[0]);
					this.insertExecTable(this.execQueue[0].getJID(), "&#8596");					
					this.TCC_TIME++;
					this.execQueue.splice(0,1);
				}

				//atribuindo o old pela primeira vez
				this.oldJob = this.execQueue[0];

				if(instruction == 'P') { 
					this.cpuUtilization++; 
				} else {
					this.insertExecTable(this.execQueue[0].getJID(), "&#8596");					
					this.TCC_TIME++;	
					this.blockQueue.push(this.execQueue[0]);
					this.execQueue.splice(0,1);

					//se tiver apenas um job e houver um bloqueio
					//esse bloqueio contabiliza como ocioso
					if((this.execQueue.length == 0) && (instruction == "B")){
						this.idleCPU++;
					}
				}
				
			} else if(this.execQueue[0].getPC() > 0) {	

				instruction = this.execQueue[0].getNextInstruction();

				this.insertExecTable(this.execQueue[0].getJID(), instruction);


				if(instruction == 'P') {
					this.cpuUtilization++;
				} 

				//SE ACABAR INSTRUÇÕES DE UM JOB, Remove job da Queue
				if(this.execQueue[0].getPC() == this.execQueue[0].getTotalInstructions()) {
					this.execQueue[0].setOutTime(this.execCounter);
					this.execStatistics.push(this.execQueue[0]);
				}

				//SE ACABAR INSTRUÇÕES DE UM JOB OU FOR UMA INSTRUÇÃO DE BLOQUEIO, Remove job da Queue
				if((this.execQueue[0].getPC() == this.execQueue[0].getTotalInstructions()) || (instruction == "B")) {
					if((this.execQueue[0].getPC() == this.execQueue[0].getTotalInstructions()) && (instruction == "B"))	{
						this.blockQueue.splice(0,1);	
					}

					if((this.execQueue[0].getPC() < this.execQueue[0].getTotalInstructions()) && (instruction == "B"))	{
						this.blockQueue.push(this.execQueue[0]);				
					} 
				
					this.insertExecTable(this.execQueue[0].getJID(), "&#8596");
					this.TCC_TIME++;

					this.execQueue.splice(0,1);	

					//se tiver apenas um job e houver um bloqueio
					//esse bloqueio contabiliza como ocioso
					if((this.execQueue.length == 0) && (instruction == "B")){
						this.idleCPU++;
					}
				}
				else{
					if((this.oldJob.getInstruction(this.oldJob.getPC()-1) == 'P') && (this.oldJob.getJID() != this.execQueue[0].getJID()) && (this.oldJob.getJID() != 999)
						&& (this.oldJob.getPC() != this.oldJob.getTotalInstructions())) {
						this.insertExecTable(this.execQueue[0].getJID(), "&#8596");					
						this.TCC_TIME++;
					}

				}
				if(this.execQueue.length > 0){
					this.oldJob = this.execQueue[0];
				}	

			}

		} else { 

			if(this.blockQueue.length > 0) {

				this.insertExecTable(this.oldJob.getJID(), "-");
				this.idleCPU++;

			}else {

				if(this.tempQueue.length > 0) {

					if(this.oldJob.getJID() == 999) {
						this.insertExecTable(-1, "-");			
						this.idleCPU++;	
					}
					else{
						this.insertExecTable(this.oldJob.getJID(), "-");	
						this.idleCPU++;				
					}

				}
			}
		}
		return this.execTable;
	}

	public updateJobEntries(): void {

		var counter    : number;

		for(counter=0; counter<this.tempQueue.length; counter++) {

			if(this.tempQueue[counter].getArrivalTime() <= this.execCounter) {
				this.execQueue.push(this.tempQueue[counter]);
				this.tempQueue.splice(counter,1);
			}

		}

	}


	//Reordena a fila de execução de acordo com o comportamento do algorimo
	public sortShortestJob(): void {

		var x      : number;
		var y      : number;
		var troca  : Job;

		var a      : number;
		var b      : number;

		for (x = 0 ; x < this.execQueue.length ; x++)	{
			for (y = 0 ; y < this.execQueue.length-1-x; y++)	{

				a = this.execQueue[y].getRemainInstructions();
				b = this.execQueue[y+1].getRemainInstructions();

				//Isso aqui foi o artifício necessário para o if conseguir comparar os valores a e b. Antes não havia comparação com sentido lógico
				//Por algum motivo, as variáveis "a" e "b" não eram identificadas como tipo numérico. Aff.... Após 4 horas de trabalho, descobrimos isso.
				a++; b++;

				if (a > b) {
					troca        = this.execQueue[y];
					this.execQueue[y]   = this.execQueue[y+1];
					this.execQueue[y+1] = troca;
				}
			}
		}
	}

	public getTotalInstructions(): number {

		var counter             : number;
		var totalInstructions   : number;
		totalInstructions       = 0;

		for(counter=0; counter<this.tempQueue.length; counter++) {
			totalInstructions += this.tempQueue[counter].getTotalInstructions();
		}

		return totalInstructions;
	}

	public nextStepExecTimeLine(): string { return }

	public getExecQueue(): Array<Job> { return this.execQueue; }

	public getBlockedQueue(): Array<Job> { return this.blockQueue; }

	public getJobsStatistcs(): Array<Job> { return this.execStatistics; }

	public execFull(): void{  }

	public getExecCounter(): number { return this.execCounter; }

	public getTccTime(): number { return this.TCC_TIME; }

	public getCpuUtilization(): number { return this.cpuUtilization; }

	public getIdleCPU(): number { return this.idleCPU; }

}