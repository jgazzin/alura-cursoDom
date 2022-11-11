const btn = document.querySelector("[data-form-btn]");
// variable que toma el selector data-form-btn

console.log(btn);
// variable que contiene la funcion

const createTask = (evento) => {
    // evita que se recargue la página cada vez q se ejecuta el evento
    evento.preventDefault();
    // acción : capturar lo que se escribió en el input
    const input = document.querySelector("[data-form-input");
    console.log(input.value);
};
// (e) => función anonima

// listener = evento que inicia la acción elemento.addEventListener
btn.addEventListener("click", createTask);
// toma el evento y ejecuta la acción




