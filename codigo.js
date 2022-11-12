// se mete todo dentro de una variable para que desde el navegador el usuario o tenga acceso al código ( () => { }) y se invoca ()

( ()=> {
    const btn = document.querySelector("[data-form-btn]");
    // variable que toma el selector data-form-btn -> evento
    
    // variable que contiene la funcion
    const addTask = (evento) => {
        // elemento donde se imprime la respuesta
        const list = document.querySelector("[data-list]");
        const task = createTask(evento);
        // agreta a la <ul> las li nuevas con cada tarea
        list.appendChild(task);
    }

    const createTask = (evento) => {
        // evita que se recargue la página cada vez q se ejecuta el evento
        evento.preventDefault();
        // acción : capturar lo que se escribió en el input
        const input = document.querySelector("[data-form-input");
        const calendar = document.querySelector("[data-form-date");
        // guarda contenido del input en una variable
        const value = input.value;
        const date = calendar.value;
        const dateFormat = moment(date).format("DD/MM/YYYY");
        console.log(dateFormat);

        // crea nuevo elemento:
        const task = document.createElement("li");
        // crea clase para el elemento task
        task.classList.add("card");
        // borra el input
        input.value = "";
    
        // crea el cógigo que se va a agregar con la tarea
        const taskContent = document.createElement("div");
        taskContent.appendChild(checkComplet());
        const titleTask = document.createElement("span");
        titleTask.classList.add ("task");
        titleTask.innerText = value;
    
        // métodos para manipular nodos
        // agrega el código a cada etiqueta (en el orden que tienen q aparecer)
        taskContent.appendChild(titleTask);

        // crea elemento de impresió de fecha
        const dateElement =document.createElement("span");
        dateElement.innerHTML = dateFormat;
        
        task.appendChild(taskContent);
        task.appendChild(dateElement);
        task.appendChild(borrarIcon());

        // envía la tarea creada a addTask
        return task;
    };
    console.log(btn);
    // (e) => función anonima
    
    // listener = evento que inicia la acción elemento.addEventListener
    btn.addEventListener("click", addTask);
    // toma el evento y ejecuta la acción
    
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
})()

