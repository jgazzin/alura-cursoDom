libreria Fechas {
https://momentjs.com/

https://cdnjs.com/libraries/moment.js

src para el script:
https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.4/moment.min.js

formato:
var = moment(date).format("DD/MM/YYYY");
}

Api nativa para almacenamiento de datos en navegador {
    crea un objeto del tipo clave/valor (array asociado)

        // almacenamieto de datos en un objeto
        const taskObj = {
            value,
            dateFormat
        };
        sessionStorage.setItem("tasks", JSON.stringify(taskObj));  
        // con sessionStorage la info se guarda solo en cada session sin F5

        // almacenamieto de datos en un objeto en base local
        const taskObj = {
            value,
            dateFormat
        };
        localStorage.setItem("tasks", JSON.stringify(taskObj)); 
        // guarda pero sobreescribe

        // iniciar el arreglo con lo que haya guardado ya en local o un arreglo vacío para que luego el push no de error al querer agregar un null
        const taskList = JSON.parse(localStorage.getItem("tasks")) || [];
        // el json.parse es para invertir el string del array a formato objeto

}


uuida libreria externa de identificadores unicos {
    https://cdnjs.com/libraries/uuid/8.3.2

    link para index
    https://cdnjs.cloudflare.com/ajax/libs/uuid/8.3.2/uuid.min.js
}
