// se mete todo dentro de una variable para que desde el navegador el usuario o tenga acceso al código ( () => { }) y se invoca ()

( ()=> {
    const btn = document.querySelector("[data-form-btn]");
    // variable que toma el selector data-form-btn -> evento
    
    // variable que contiene la funcion

    const addTask = (evento) => {
        // evita que se recargue la página cada vez q se ejecuta el evento
        evento.preventDefault();

        // elemento donde se imprime la respuesta
        const list = document.querySelector("[data-list]");
        // acción : capturar lo que se escribió en el input
        const input = document.querySelector("[data-form-input");
        const calendar = document.querySelector("[data-form-date");
        
        // guarda contenido del input en una variable
        const value = input.value;
        const date = calendar.value;
        const dateFormat = moment(date).format("DD/MM/YYYY");
        console.log(dateFormat);

        // validación de datos input + fecha para q no guarde objetos vacíos
        if(value==="" || date ==="") {
            return 
            // si valores vacío no ejecuta el código debajo
        }

        // borra el input
        input.value = "";
        calendar.value = "";

        // para guardar el estado de completeTask
        const complete = false;
        const id = uuid.v4();   // genera identificador unico de la libreria uuid

        // almacenamieto de datos en un objeto
        const taskObj = {
            value,
            dateFormat,
            complete,
            id  
        };

        // reinicio el list vacío para q no duplique la cración de listas
        list.innerHTML = "";

        // arreglo para almacenamieto de task en local
        // se inicia directamente con lo q ya haya almacenado en local
        const taskList = JSON.parse(localStorage.getItem("tasks")) || [];
        // agregar los atributos del arreglo a taskList
        taskList.push({value, dateFormat, complete, id});
        localStorage.setItem("tasks", JSON.stringify(taskList));

        readTask();

        // const task = createTask(taskObj);
        // // agreta a la <ul> las li nuevas con cada tarea
        // list.appendChild(task);

    }

    // agrupar por fechas - crea la etiqueta 
    const calendarElement = (date) => {
        
        const dateElement = document.createElement("li");
        dateElement.classList.add ("date");
        dateElement.innerHTML = date;
        return dateElement;
    }

    // filtra las fechas para pasarle a readTask qué fechas crear
    const uniqueDates = ((tasks) => {
        const unique = [];
        tasks.forEach(task => {
            // console.log(task.dateFormat)
            if (!unique.includes(task.dateFormat)) {
                unique.push(task.dateFormat);
            }
        });

        // ordenarlas de menor a mayor
        return unique.sort((a, b) => {
            const firstDate = moment(a, 'DD/MM/YYYY')
            const secondDate = moment(b, 'DD/MM/YYYY')
            return firstDate - secondDate
        });

    });

    // leer los datos de local para crear tareas previas
    // crea las tareas - es llamada desde addTask
    function readTask() {
        const list = document.querySelector("[data-list");
        const taskList = JSON.parse(localStorage.getItem("tasks")) || [];

        // llamada para agrupar fechas
        const dates = uniqueDates(taskList);
        // console.log(dates);
        dates.forEach(date => {
            console.log(date);
            // formateo cada date para q se pueda comparar con el = formato de cada tarea
            const dateMoment = moment(date, "DD/MM/YYYY");

            // crea el elemento para la fecha
            list.appendChild(calendarElement(date));
            
            // recorre cada elemento guardado en arreglo local
            taskList.forEach((task) => {
            
            // formateo cada fecha de task
            const taskMoment = moment (task.dateFormat, "DD/MM/YYYY");
  
            // comparación de fechas con diff
            const diff = dateMoment.diff(taskMoment);
            // console.log(diff);

            if (diff===0) {
                // envía el código a la etiqueta que crea createTask
                list.appendChild(createTask(task)); 
            } 

        });
        });

    }

    function createTask({ value, dateFormat, complete, id }) {

        // crea nuevo elemento:
        const task = document.createElement("li");
            // crea clase para el elemento task
            task.classList.add("card");

        // tilde de completeTask
        const check = checkComplet(id);
        if (complete) {
            check.classList.toggle("fas");
            check.classList.toggle("far");
            check.classList.toggle("completeIcon");
        }

        // crea el cógigo que se va a agregar con la tarea
        const taskContent = document.createElement("div");
            // envía id a la funcion checkcomplete
            taskContent.appendChild(check);


        const titleTask = document.createElement("span");
            titleTask.classList.add("task");
            titleTask.innerText = value;

            // métodos para manipular nodos
            // agrega el código a cada etiqueta (en el orden que tienen q aparecer)
            taskContent.appendChild(titleTask);

        // crea elemento de impresió de fecha
        const dateElement = document.createElement("span");
            dateElement.innerHTML = dateFormat;

            task.appendChild(taskContent);
            task.appendChild(dateElement);
            task.appendChild(borrarIcon());

        // envía la tarea creada a addTask
        return task;
    }

    console.log(btn);
    // (e) => función anonima
    
    // listener = evento que inicia la acción elemento.addEventListener
    btn.addEventListener("click", addTask);
    // toma el evento y ejecuta la acción

    // --- acciones con las tareas ---
    // acción del check
    const checkComplet = (id) => {
        const i = document.createElement("i");
        // le agrega las clases + la etiqueta i
        i.classList.add("far", "fa-check-square", "icon");
        i.addEventListener("click", (event) => completeTask(event,id)); // llama a completeTask pero enviandole el id
        // retorna i
        return i;
    }
    
    const completeTask = (e, id)=> {
    // se agrega un evento a la funcion para q devuelva datos del evento y poder capturarlo 
        const element = e.target;
        element.classList.toggle("fas");
        element.classList.toggle("far");
        element.classList.toggle("completeIcon");
        // en lugar de poner add y remove - toggle intercala add/ remove según corresponda

        // recibe el id
        const taskId = JSON.parse(localStorage.getItem("tasks"));
        // busca el index de id (para capturar qué tarea está siendo clickeada)
        const indexId = taskId.findIndex( item => item.id === id)
        // console.log(indexId)
        // console.log(taskId[indexId]["complete"])
        taskId[indexId]["complete"] = !taskId[indexId]["complete"]; // invierte el valor que tenga la tearea al hacer click
        // console.log(taskId)
        // almacena el cambio
        localStorage.setItem("tasks", JSON.stringify(taskId));
    }


    // borrar tarea
    const borrarIcon =()=> {
        const i = document.createElement("i");
        i.classList.add("fas", "fa-trash-alt", "trashIcon", "icon");
        i.addEventListener("click", borrarTarea);

        return i;
    }

    const borrarTarea = (e)=> {
        // selecciona el elemento padre de donde se hizo el evento (la li correspondiente)
        const tagPadre = e.target.parentElement; 
        tagPadre.remove();
    }

    // lee datos almacenados en local
    readTask();
})()

