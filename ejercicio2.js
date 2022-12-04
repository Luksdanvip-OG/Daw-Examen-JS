let data = {};
let rawData = {};

document.addEventListener('DOMContentLoaded', () => {
    //esperamos a la carga de los elementos
    let tbody = document.getElementById('datos-placeholder');
    pintarInicio(tbody);

    let enlaceOrdenarMayor = document.getElementById('ordenar-mayor');
    enlaceOrdenarMayor.setAttribute("href", "javascript:ordenarMayor()");
})


async function getDatos() {
    //conseguimos los datos del json
    return fetch('/loteria3.json').then((response) => {
        return response.json()
    });
}


function pintarInicio(target) {
    //pintamos todos los datos en el elemento target
    let respuesta = getDatos();
    data = respuesta;
    respuesta.then((datos) => {
        console.log(Object.keys(datos));
        list = Object.keys(datos)

        list.forEach(id => {

            let tr = document.createElement('tr');
            let idt = document.createElement('td');
            idt.setAttribute("scope", "row")
            idt.textContent = `${id}`

            let aparicionesTotales = document.createElement('td');
            aparicionesTotales.textContent = `${datos[id][0]}`;

            let apariciones2021 = document.createElement('td');
            apariciones2021.textContent = `${datos[id][1]}`;
            let apariciones2022 = document.createElement('td');
            apariciones2022.textContent = `${datos[id][2]}`;

            let tdButton = document.createElement("td");
            let button = document.createElement("button");
            button.disabled = true;
            button.textContent = "Ordenar datos primero"
            tdButton.append(button);

            tr.append(idt);
            tr.append(aparicionesTotales);
            tr.append(apariciones2021);
            tr.append(apariciones2022);
            tr.append(tdButton);

            target.append(tr);
        });
    });
}


function ordenarMayor() {
    console.log("Datos")
    console.log(data);

    let array = [];
    data.then(e => {
        for (let i of Object.keys(e)) {
            array.push(e[i]);
        }

        // No creo que haga falta comentar cosas tan basicas... :Kappa:
        /* Ok ahora de forma seria:

        ¿Que es un operador ternario?
        [condicion] ? [si es verdadera] : [si es falsa]

        Ejemplo:
            1 > 5 ? "es mayor" : "es menor"
            // es mayor

            1 < 5 ? "es mayor" : "es menor"
            // es menor

        -----

        Variables de la funcion:
        a => Numero ACTUAL
        b => SIGUIENTE numero

        ¿Que es el -1, 0 y +1 en el sort?
        Hace referencia a como se va a ordenar la lista, por ejemplo si tenemos estos valores ["primero", "segundo", "tercero"] y hacemos un 1 (+1) al valor "segundo"
            la lista se quedaria como ["primero", "tercero", "segundo"], en caso de hacer un -1 es hacia la derecha y si hacemos un 0 no se mueve de sitio

        a[0] > b[0] ? 1 : a[0] < b[0] ? -1
        Comprobar si los numeros del indice 0 son mayores que el siguiente (numero total de apariciones), en caso que sea correcto el return es 1, sino comprobar si
            es menor, en caso de que no hacer -1

        a[0] === b[0] && a[1] > b[1] ? 1 : a[0] === b[0] && a[1] < b[1] ? -1 : 0
        Todo esto es basicamente lo de arriba pero se comprueba que ambos numeros son iguales (el actual y el siguiente), en caso de que sean igual hacemos las mismas 
            comprobaciones de arriba PERO esta vez con el segundo indice (a[1] y b[1], basicamente con los otros datos), si NINGUNA condicion se cumple pues no se mueve el valor
            por eso al final esta el 0
        */

        // Jaja XD me aburro mucho version
        array.sort((a, b) => { return a[0] > b[0] ? 1 : a[0] < b[0] ? -1 : a[0] === b[0] && a[1] > b[1] ? 1 : a[0] === b[0] && a[1] < b[1] ? -1 : 0 });

        /*
        Todo este tocho se puede traducir como...
        */

        // Borra el /* para descomentar todo el bloque de abajo, no te olvides de comentar la linea 108 si descomentas esto!
        /*
         array.sort((a,b) => {
             // Numero anterior MAYOR al siguiente
             if (a[0] > b[0]) {
                 return 1;
             }
             // Numero anterior MENOR al siguiente 
             else if (a[0] < b[0]) {
                 return -1;
             } 
             // Si ninguna de las anteriores pasa... quiere decir que ambos numeros son IGUALES por ende
             else {
                 // Si ambos numeros (los primeros) son iguales comprobamos los valores del siguiente indice, y repetimos, si a[1] es MAYOR que el siguiente (b[1])
                 if (a[0] === b[0] && a[1] > b[1]) {
                     return 1;
                 }
                 // Si ambos numeros son iguales... la misma mierda, comprobamos si a[1] es MENOR que el siguiente (b[1])
                 else if (a[0] === b[0] && a[1] < b[1]) {
                     return -1;
                 }
                 // Si ninguna de las anteriores cosas pasan pues no lo movemos de puesto y listo
                 else {
                     return 0;
                 }
             }
         })
         */
        // ^^^^^^^^^
        // Borra el */ para descomentar todo el bloque de arriba

        console.log(array);
        rawData = array;

        // Reset
        let tbody = document.getElementById('datos-placeholder');
        tbody.innerHTML = "";
        array.forEach((id, i) => {
            let tr = document.createElement('tr');
            let idt = document.createElement('td');
            idt.setAttribute("scope", "row")
            idt.textContent = `${i + 1}`

            let aparicionesTotales = document.createElement('td');
            aparicionesTotales.textContent = `${id[0]}`;

            let apariciones2021 = document.createElement('td');
            apariciones2021.textContent = `${id[1]}`;
            let apariciones2022 = document.createElement('td');
            apariciones2022.textContent = `${id[2]}`;

            let tdButton = document.createElement("td");
            let button = document.createElement("button");
            button.textContent = "Visualizar";
            button.setAttribute('id', `button_${i}`);
            button.setAttribute('onclick', `javascript:printValue(${i})`)
            tdButton.append(button);

            tr.append(idt);
            tr.append(aparicionesTotales);
            tr.append(apariciones2021);
            tr.append(apariciones2022);
            tr.append(tdButton);

            tbody.append(tr);
        });

        let enlaceResaltar = document.getElementById('resaltar');
        enlaceResaltar.setAttribute("href", "javascript:resaltar()");
    });
}

/**
 * Volcar valores en el textarea despues de pulsar el boton
 * @param {*} i 
 */
function printValue(i) {
    document.getElementById(`button_${i}`).disabled = true;

    let output = document.getElementById('print-content');
    output.innerHTML = "";
    output.value = `${rawData[i][0]} , ${rawData[i][1]} , ${rawData[i][2]}`;
}

/**
 * Resaltar los primeros 3 numeros (los que tienen menos apariciones) de color rojo
 * y los ultimos (mas apariciones) de color verde
 */
function resaltar() {
    let list = document.getElementById('datos-placeholder');

    let totalRows = list.rows.length;

    for (let i = 0; i < 3; i++) {
        list.rows[i].childNodes[1].style.backgroundColor = "red";

    }

    for (let i = totalRows - 3; i < totalRows; i++) {
        list.rows[i].childNodes[1].style.backgroundColor = "green";
    }
}

