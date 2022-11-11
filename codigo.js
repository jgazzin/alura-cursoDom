const btn = document.querySelector("[data-form-btn]");
// variable que toma el selector data-form-btn

console.log(btn);
// variable que contiene la funcion

const createTask = (evento) => {
    // evita que se recargue la página cada vez q se ejecuta el evento
    evento.preventDefault();
    // acción : capturar lo que se escribió en el input
    const input = document.querySelector("[data-form-input");
    // guarda contenido del input en una variable
    const value = input.value;
    // capturo el elemnento data-task (lista)
    const task = document.querySelector("[data-task]");
    // borra el input
    input.value = "";
    // variable donde se guarda código nuevo q se va a agregar al html
    const contenido = `<div>
    <i class="far fa-check-square icon">
    </i>
    <span class="task">${value}</span>
    </div>`
    // en ${value} agrega el texto que se había tomado del input
    // agrega contenido en task para q se imprima en pantalla
    task.innerHTML=contenido;
    console.log(task);

};
// (e) => función anonima

// listener = evento que inicia la acción elemento.addEventListener
btn.addEventListener("click", createTask);
// toma el evento y ejecuta la acción




