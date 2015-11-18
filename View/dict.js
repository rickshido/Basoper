$(function() {

  var t = {
    "Home": {
      pt: "Iní­cio",
      es: "Inicio",
    },
    "Watch instructions": {
      pt: "Assista as instruções",
      es: "Ver las instrucciones",
    },
    "Contact": {
      pt: "Contato",
      es: "Contacto",
    },
    "Arrival time": {
      pt: "Tempo de chegada",
      es: "Hora de llegada",
    },
    "Algorithm type:": {
      pt: "Política de escalonamento:",
      es: "Tipo de algoritmo:",
    },
    "Add Random Job": {
      pt: "Adicionar job aleatório",
      es: "Generar aleatoriamente",
    },
    "New Experiment": {
      pt: "Novo experimento",
      es: "Nuevo experimento",
    },
    "Execution Queue": {
      pt: "Fila de execução",
      es: "Lista de ejecución",
    },
    "Execution Steps": {
      pt: "Passos da execução",
      es: "Pasos de ejecución",
    },
    "Experiment Parameters": {
      pt: "Parâmetros de execução",
      es: "Parámetros de ejecución",
    },
    "New Experiment": {
      pt: "Novo experimento",
      es: "Nuevo experimento"
    },
    "Instructions (P: CPU | B: I/O)": {
      pt: "Instruções (P: CPU | B: I/O)",
      es: "Instrucciones (P: CPU | B: I/O)",
    },
    "Action": {
      pt: "Ações",
      es: "Acciones",
    },
    "Language": {
      pt: "Idioma",
      es: "Idioma"
    },
    "Input Jobs": {
      pt: "Tarefas de entrada",
      es: "Entrada de tareas",
    },
    "Flow of execution": {
      pt: "Fluxo de execução",
      es: "Flujo de ejecución",
    },
    "Start": {
      pt: "Iniciar",
      es: "Iniciar",
    },
    "Add" : {
      pt: "Adicionar",
      es: "Añadir",
    },

    "<b>CPU usage (Time Unit | Percentual): </b>": {
      pt: "<b>Uso de CPU (Unidade de Tempo | Percentual): </b>",
      es: "<b>Uso de CPU (Unidad Tiempo | Porcentaje): </b>",
    },

    "<b>Time spent with Context Change (Time Unit | Percentual): </b>":{
      pt: "<b>Tempo gasto com troca de contexto (Unidade de Tempo | Percentual): </b>",
      es: "<b>Tiempo gasto com cambio de contexto (Unidad Tiempo | Porcentaje): </b>",
    },

    "Performance Statistics":{
      pt: "Desempenho",
      es: "Rendiemento",
    },

    "Policy:":{
      pt: "Política:",
      es: "Politica:",
    },

    "Legend":{
      pt: "Legenda</b>",
      es: "Leyenda</b>",
    },

    "AT: Arrival Time":{
      pt: "AT: Tempo de Chegada",
      es: "AT: Hora de llegada",
    },

    "JID: Job Identificator":{
      pt: "JID: Identificador do Processo",
      es: "JID: Manejar el Proceso",
    },

    "INST: Instructions":{
      pt: "INST: Instruções",
      es: "INST: Instrucciones",
    },

    "Instructions":{
      pt: "Instruções",
      es: "Instrucciones",
    },

    "WT: Waiting Time":{
      pt: "WT: Tempo de Espera",
      es: "WT: Tiempo de Espera",
    },

    "Sample Lists":{
      pt: "Exemplos de Listas",
      es: "Lista de muestra",
    },

    "This project has been developed by Henrique Yoshikazu Shishido e Leonildo José de Melo de Azevedo during the Operating Systems class under supervision of Professor Ph.D. Paulo Sergio Lopes de Souza. Actually (2015), both computer scientists are graduate students of the Computer Science and Computational Mathematics Program in Institute of Mathematical and Computer Sciences - University of São Paulo.":{
      pt: "Este projeto foi desenvolvido por Henrique Yoshikazu Shishido e Leonildo José de Melo de Azevedo, durante a disciplina de Sistemas Operacionais sob supervisão do professor Dr. Paulo Sergio Lopes de Souza. Atualmente (2015), ambos são estudantes do curso de Pós-graduação em Ciência da Computação e Matemática Computacional Programa no Instituto de Matemática e Ciências da Computação - Universidade de São Paulo.",
      es: "Este proyecto ha sido desarrollado por Henrique Yoshikazu Shishido e Leonildo José de Melo de Azevedo, durante la clase de sistemas operativos bajo la supervisión del Profesor Ph.D. Paulo Sergio Lopes de Souza. En realidad (2015), ambos científicos de la computación son estudiantes de posgrado del Programa Matemática Computacional Ciencias de la Computación y en el Instituto de Matemática y Ciencias de la Computación - Universidad de São Paulo.",
    },

    "About the authors":{
      pt: "Sobre os autores",
      es: "Sobre los autores",
    },

    "PC: Program Counter":{
      pt: "PC: Contador de Programa",
      es: "PC: Contador de Programa",
    },

    "↔: Context Change":{
      pt: "↔: Troca de contexto",
      es: "↔: Cambio de contexto",
    },

    " - : CPU idle":{
      pt: " - : CPU ociosa",
      es: " - : CPU ociosa",
    },    

    "Execution":{
      pt: "Execução",
      es: "Ejecución",
    },

    "P: Processing":{
      pt: "P: Processando",
      es: "P: Tratamiento",
    },

    "B: Blocked":{
      pt: "B: Bloqueado",
      es: "B: Obstruido",
    },

    "Ready Queue":{
      pt: "Fila de Pronto",
      es: "Cola Ready",
    },

    "Blocked Queue":{
      pt: "Fila de Bloqueado",
      es: "Cola Locked",
    },

    "Run Statistics":{
      pt: "Estatística de execução",
      es: "Estadísticas de Ejecución",
    },

    "Ph.D. Student in Distributed Systems":{
      pt: "Doutorando em Sistemas Distribuídos",
      es: "Estudiante de doctorado en sistemas distribuidos",
    },

    "Masters Student in Distributed Systems":{
      pt: "Mestrando em Sistemas Distribuídos",
      es: "Estudiante de mestrado en sistemas distribuidos",
    },

    "Distributed Systems and Concurrent Programming Laboratory":{
      pt: "Laboratório de Sistemas Distribuídos e Programação Concorrente",
      es: "Laboratorio de Sistemas Distribuidos y Pragramación Concurrente",
    },

    "Watch the video in order to understand how to use this Open Educational Resource in english or portuguese.":{
      pt: "Assista o video para entender como usar o recurso educacional aberto em inglês ou português.",
      es: "Vea el video con el fin de entender cómo usar este recurso educativo abierto en inglés o portugués.",
    },

    "How to use":{
      pt: "Como usar",
      es: "Cómo utilizar",
    },

    "About BASOPER":{
      pt: "Sobre o BASOPER",
      es: "Sobre el BASOPER",
    },

    "What is a batch processing?":{
      pt: "O que é processamento batch?",
      es: "¿Qué es un proceso por lotes?",
    },

    "Batch processing is the execution of a list of jobs on a computer system without manual intervention.":{
      pt: "Processamento batch é a execução de uma lista de trabalhos em um sistema computacional sem intervenção manual.",
      es: "El procesamiento por lotes es la ejecución de una lista de puestos de trabajo en un sistema informático sin intervención manual.",
    },

    "Objectives:":{
      pt: "Objetivos:",
      es: "Objetivos:",
    },

    "- Assist the teaching batch systems scheduling algorithms;":{
      pt: "- Ajudar no ensino de algoritmos de sistemas em lote;",
      es: "- Ayudar a los algoritmos de planificación de sistemas de lotes enseñanza;",
    },

    "- Promote the visualization of functional, structural, and performance aspects.":{
      pt: "- Promover a visualização do aspecto funcional, estrutural e de desempenho.",
      es: "- Promover la visualización de, aspectos estructurales y de rendimiento funcional.",
    },

    "What BASOPER does?":{
      pt: "O que o BASOPER ensina?",
      es: "Qué BASOPER enseña?",
    },

    "- Simulate the execution of three scheduling algorithms of batch systems such as FCFS, SJF, and SRTN;":{
      pt: "- Simula a execução de três algoritmos de sistemas batch como FCFS, SJF e SRTN;",
      es: "- Simular la ejecución de tres algoritmos de planificación de sistemas de lotes como FCFS, SJF y SRTN;",
    },
    
    "- Display to the student a timestep execution table in order to assist the interaction of the jobs and the execution, ready and blocked queues;":{
      pt: "- Exibe ao estudante uma tabela de execução passo-a-passo a fim de auxiliar na interação de trabalhos e as filas de execução, pronto e bloqueado;",
      es: "- Pantalla al estudiante una mesa ejecución paso de tiempo con el fin de ayudar a la interacción de los puestos de trabajo y la ejecución, listo y bloqueado colas;",
    },
    
    "- Allow the student follow the execution of each instruction of a job and its performance parameters such as Waiting Time (WT) and Turnaround Time (TT).":{
      pt: "- Permite ao estudante acompanhar a execução de cada instrução de um trabalho e seus parâmetros de desempenho tais como Tempo de Espera (WT) e Tempo de execução (TT)",
      es: "- Permitir que el estudiante siga la ejecución de cada instrucción de un trabajo y sus parámetros de rendimiento tales como Tiempo de espera (WT) y Plazo de Entrega (TT).",
    },
    
    "Considerations in performance computation":{
      pt: "Considerações no cálculo de desempenho",
      es: "Consideraciones en el cálculo de rendimiento",
    },
    
    "- When a process is blocked, the time spent with input and output is disregarded;":{
      pt: "- Quando um processo é bloqueado, o tempo gasto com entrada e saída é desconsiderado;",
      es: "- Cuando se bloquea un proceso, el tiempo empleado entrada y salida no se tienen en cuenta;",
    },
    
    "- When there is a block instruction and there is no process in ready queue, the block is counted as idle time;":{
      pt: "- Quando ocorrer um bloqueio e não houver nenhum processo na fila de pronto, o bloqueio é contabilizado como tempo ocioso;",
      es: "- Cuando hay un bloqueo y no hay un proceso en línea de listo, el bloqueo se cuenta como tiempo de inactividad;",
    },    

    "- When there is a block instruction and there is another process in ready queue, the block is not counted as idle time.":{
      pt: "- Quando ocorrer um bloqueio e houver outro processo na fila de pronto, o bloqueio não é contabilizado como tempo ocioso.",
      es: "- Cuando hay un bloqueo y no hay otro proceso en línea de listo, el bloqueo no se cuenta como tiempo de inactividad.",
    },
    
    "About":{
      pt: "Sobre",
      es: "Sobre",
    },    

    "TT: Turnaround Time":{
      pt: "TT: Tempo de Retorno",
      es: "TT: Tiempo de Volver",
    }};

  var _t = $('body').translate({lang: "en", t: t});
  var str = _t.g("translate");
  console.log(str);


 $(".lang_selector").click(function(ev) {
    var lang = $(this).attr("data-value");
    _t.lang(lang);

    console.log("chamouuuu");
    console.log(lang);
    ev.preventDefault();
  });

});