import {
    oficinas
} from './oficinasempleo.js';

/**
 * Programa para generar oficinas según los criterios de busqueda.
 * @author Kevin García Marrero
 */

const zona = document.body.firstElementChild.nextElementSibling.nextElementSibling;

/**
 * Función para recoger los datos introducidos.
 */
function datosRecogidos() {
    let zonaIsla = document.getElementById('isla');
    let zonaMunicipio = document.getElementById('municipio');
    let isla = zonaIsla.value.toLowerCase();
    let municipio = zonaMunicipio.value.toLowerCase();
    filtroDatos(isla, municipio);
}
/**
 * Tratar los datos para saber si existen en el array de objetos.
 * @param {string} isla - Valor isla introducida por el usuario.
 * @param {string} municipio - Valor municipio introducido por el usuario.
 */
function filtroDatos(isla, municipio) {
    let filtro = oficinas.filter(elemento => (elemento.islaTxt.toLowerCase() == isla || elemento.municipioTxt.toLowerCase() == municipio));
    borrarNodosHijos(zona);
    if (filtro.length != 0) {
        imprimirTodo(filtro, 'islaTxt', 'municipioTxt', zona);
    }
}
/**
 * Imprime el resultado del filtro.
 * @param {Array} array - Objetos que cumplen las condiciones pedidas por el usuario.
 * @param {string} categoriaPrin - Categoría principal ISLA.
 * @param {string} subCategoria - Categoría secundaria MUNICIPIO.
 * @param {const} zona - Lugar donde se van a imprimir los resultados.
 */
function imprimirTodo(array, categoriaPrin, subCategoria, zona) {
    let categorias = new Set(array.map(element => element[categoriaPrin]));
    categorias.forEach(categoria => {
        let isla = zona.appendChild(imprimirCategoria(categoria, 'isla', 'h2'));
        let oficinasIslas = array.filter(oficina => oficina[categoriaPrin] == categoria);
        let subCategorias = new Set(oficinasIslas.map(element => element[subCategoria]));
        subCategorias.forEach(municipio => {
            let muni = isla.appendChild(imprimirCategoria(municipio, 'municipio', 'h3'));
            let clase = document.createElement('div');
            clase.className = 'oficinas';
            let oficinas = muni.appendChild(clase);
            oficinasIslas.forEach(oficina => {
                if (oficina[subCategoria] == municipio) {
                    oficinas.appendChild(imprimir(oficina, 'oficina'));
                }
            });
        });
    });
}

/**
 * Imprime la categoría que le demos.
 * @param {string} txt - Texto que irá dentro de la etiqueta.
 * @param {string} clase - Clase que le aplicaremos a la etiqueta.
 * @param {string} tipoEtiqueta - La etiqueta que crearemos.
 */
function imprimirCategoria(txt, clase, tipoEtiqueta) {
    let agrupador = document.createElement('div');
    let categoriaBloque = document.createElement(tipoEtiqueta);
    let texto = document.createTextNode(txt);
    agrupador.className = clase;
    categoriaBloque.appendChild(texto);
    agrupador.appendChild(categoriaBloque);
    return agrupador;
}

/**
 * Imprime un objeto.
 * @param {object} objeto - Objeto OFICINA.
 * @param {string} clase - Clase para el agrupado OFICINA
 */
function imprimir(objeto, clase) {
    // let nObjeto = [];
    // nObjeto.push(objeto.oficina, objeto.direccion, objeto.telefono);
    let islaEtiqueta = document.createElement('div');
    islaEtiqueta.className = clase;
    // nObjeto.forEach(elemento => {
    //     let linea = document.createElement('p');
    //     let lineaCompleta = document.createTextNode(elemento.toString());
    //     linea.appendChild(lineaCompleta);
    //     islaEtiqueta.appendChild(linea);
    // });
    //Nombre
    let lineaTipo = document.createElement('p');
    let tipo = document.createTextNode('Nombre');
    lineaTipo.appendChild(tipo);
    lineaTipo.className = 'tipo';
    islaEtiqueta.appendChild(lineaTipo);
    let linea = document.createElement('p');
    let lineaCompleta = document.createTextNode(objeto.oficina);
    linea.appendChild(lineaCompleta);
    islaEtiqueta.appendChild(linea);
    lineaTipo = document.createElement('p');
    tipo = document.createTextNode('Dirección');
    lineaTipo.appendChild(tipo);
    lineaTipo.className = 'tipo';
    islaEtiqueta.appendChild(lineaTipo);
    linea = document.createElement('p');
    lineaCompleta = document.createTextNode(objeto.direccion);
    linea.appendChild(lineaCompleta);
    islaEtiqueta.appendChild(linea);
    lineaTipo = document.createElement('p');
    tipo = document.createTextNode('Teléfono');
    lineaTipo.appendChild(tipo);
    lineaTipo.className = 'tipo';
    islaEtiqueta.appendChild(lineaTipo);
    linea = document.createElement('p');
    lineaCompleta = document.createTextNode(objeto.telefono);
    linea.appendChild(lineaCompleta);
    islaEtiqueta.appendChild(linea);
    return islaEtiqueta;
}

/**
 * Borrar todos los nodos hijos.
 * @param {string} padre - Padre principal de los nodos hijos.
 */
function borrarNodosHijos(padre) {
    while (padre.firstChild) {
        padre.removeChild(padre.firstChild);
    }
}

/**
 * Cancela la busqueda borrando los elementos de la text boxes y los elementos childNodes, y al final imprime todas las oficinas.
 */
function cancelarBusqueda() {
    let zonaIsla = document.getElementById('isla');
    let zonaMunicipio = document.getElementById('municipio');
    zonaIsla.value = "";
    zonaMunicipio.value = "";
    borrarNodosHijos(zona);
    imprimirTodo(oficinas, 'islaTxt', 'municipioTxt', zona);
}

document.getElementById('bBuscar').addEventListener('click', datosRecogidos);

imprimirTodo(oficinas, 'islaTxt', 'municipioTxt', zona);

document.getElementById('bCancelar').addEventListener('click', cancelarBusqueda);