let lista;
let listaContenido;
let listaContenidoOrdenada;
let listaContenidoOrdenadaInversa;

document.addEventListener('DOMContentLoaded', () =>{
//para evitar que los elementos sean undefined esperamos a que el documento este cargado para realizar operaciones
    lista = getElementosTipoLi();
    listaContenido = getContenidoFromElementos(lista);

//listas ordenadas
  listaContenidoOrdenada = ordenar(listaContenido);
  listaContenidoOrdenadaInversa = reversar(listaContenido);

  console.log(listaContenidoOrdenada);

//funcionalidad de los enlaces
  let enlaceOrdenarMayor = document.getElementById('ordenar-mayor');
  enlaceOrdenarMayor.setAttribute("href", "javascript:ordenarMayor()");
  let enlaceOrdenarMenor = document.getElementById('ordenar-menor');
  enlaceOrdenarMenor.setAttribute("href", "javascript:ordenarMenor()");

})

function getElementosTipoLi() {
    //Esta funcion consigue todos los elementos del html que son los <li> que queremos ordenar
    return document.querySelectorAll('.list-group-item');
}

function getContenidoFromElementos(listaElementos){
    //Consigue todos los textos dentro de cada <li>
    let listaContenido = [];
    listaElementos.forEach(element => {
        listaContenido.push(element.textContent);
    });
    return listaContenido;
}

function ordenarMayor() {
    let cont = 0;
    let listaActualizada = getElementosTipoLi();
    let coincidencias = 0;

    console.log(listaActualizada);
    
    //aqui realizaremos las acciones para poder pintar los numeros ordenados y controlamos la coincidencias
    listaActualizada.forEach(element => {
        if (element.textContent === listaContenidoOrdenada[cont] ) {
            element.style.backgroundColor = "red";
            coincidencias++
            cont++
        }else{
            element.style.backgroundColor = "white";
            element.textContent = listaContenidoOrdenada[cont];
            cont++
         }
    });
    console.log(coincidencias);
    pintarCoincidencias(coincidencias);
}

function ordenarMenor() {
    let cont = 0;
    let coincidencias = 0;
    let listaActualizada = getElementosTipoLi();
    listaActualizada.forEach(element => {
        if (element.textContent === listaContenidoOrdenadaInversa[cont] ) {
            element.style.backgroundColor = "red";
            coincidencias++
            cont++
        }else{
            element.style.backgroundColor = "white";
            element.textContent = listaContenidoOrdenadaInversa[cont];
            cont++
         }
    });
    
    pintarCoincidencias(coincidencias);

}

function pintarCoincidencias(coincidencias) {
    //pinta en el footer un parrafo con el resultado de las coincidencias
    let footer = document.getElementsByTagName('footer');
    footer[0].innerHTML = "";
    let p = document.createElement('p');
    p.textContent = `El numero de concidencias al ordenar es : ${coincidencias}`;
    footer[0].append(p);
}

// --- Forma 1: Relacionar texto a numero obteniendo la primera parte del string que esta en el HTML > hacer split usando el espacio (" ") como delimitador
// let correctList = {
//     "Primero": 1,
//     "Segundo": 2,
//     "Tercero": 3,
//     "Cuarto": 4,
//     "Quinto": 5
// }
function ordenar(listaContenido){
    // let array = [];
    // listaContenido.forEach(e => {
    //     array[correctList[e.split(" ")[0]] - 1] = e
    // });
    // return array;

    // --- Forma 2:    
    let array = [];
    for (let i = 0; i < listaContenido.length; i++) {
        array[i] = document.getElementById(i + 1).textContent;
    }
    return array;
}

function reversar(listaContenido){
    return ordenar(listaContenido).reverse();
}
