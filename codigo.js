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

        // almacenamieto de datos en un objeto
        const taskObj = {
            value,
            dateFormat
        };

        // arreglo para almacenamieto de task en local
        // se inicia directamente con lo q ya haya almacenado en local
        const taskList = JSON.parse(localStorage.getItem("tasks")) || [];
        // agregar los atributos del arreglo a taskList
        taskList.push({value, dateFormat});
        localStorage.setItem("tasks", JSON.stringify(taskList));

        const task = createTask(taskObj);
        // agreta a la <ul> las li nuevas con cada tarea
        list.appendChild(task);

        // borra el input
        input.value = "";
        calendar.value = "";
    }

    // leer los datos de local para crear tareas previas
    const readTask = () => {
        const list = document.querySelector("[data-list");
        const taskList = JSON.parse(localStorage.getItem("tasks")) || [];

        // recorre cada elemento guardado en arreglo local
        taskList.forEach((task) => {
            // crea el codigo para cada elemneto
            console.log(createTask(task));
            // envía el código a la etiqueta que crea createTask
            list.appendChild(createTask(task));

        });
    }

    function createTask({ value, dateFormat }) {
        // crea nuevo elemento:
        const task = document.createElement("li");
            // crea clase para el elemento task
            task.classList.add("card");

        // crea el cógigo que se va a agregar con la tarea
        const taskContent = document.createElement("div");
            taskContent.appendChild(checkComplet());

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
    const checkComplet = () => {
        const i = document.createElement("i");
        // le agrega las clases + la etiqueta i
        i.classList.add("far", "fa-check-square", "icon");
        i.addEventListener("click", completeTask);
        // retorna i
        return i;
    }
    
    const completeTask = (e)=> {
        // console.log(e.target);
        const element = e.target;
        element.classList.toggle("fas");
        element.classList.toggle("far");
        element.classList.toggle("completeIcon");
        // en lugar de poner add y remove - toggle intercala add/ remove según corresponda
    }
    // se agrega un evento a la funcion para q devuelva datos del evento y poder capturarlo

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

