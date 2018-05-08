var xhr;
var datos = new Array();
var postAModificar;

window.onload = function () {

    cargarDatos();

};


var filaAEditar = null;

function cargarDatos() {
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var resp = JSON.parse(this.response);
            console.log(resp.message);
            refrescarTabla(resp.data);
            datos = resp.data;
        }
    };
    xhr.open("POST", "http://localhost:3000/traer", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({
        "collection": "posts"
    }));
    vaciarInputs();  

}

function refrescarTabla(data) {
    console.log(data);
    tabla = document.getElementById("tblPosts");
    tabla.innerHTML = "";
    tabla.innerHTML += '<caption>Mis Articulos</caption><thead><tr style="background-color: turquoise">' +
        '<th>ID</th>' +
        '<th>Fecha</th>' +
        '<th>Titulo</th>' +
        '<th>Articulo</th>' +
        '<th>Modificar</th>' +
        '<th>Borrar</th>' +
        '</tr></thead><tbody>';

    for (i = 0; i < data.length; i++) {
        console.log(data[i]);
        tabla.innerHTML += '<tr><td>' + data[i].id + '</td>' +
            '<td>' + data[i].created_dttm + '</td>' +
            '<td>' + data[i].titulo + '</td>' +
            '<td>' + data[i].articulo + '</td>' +
            '<td><button onclick="habilitarModificar(' + i + ');">Modificar</button></td>' +
            '<td><button onclick="eliminarArticulo(' + data[i].id + ');">Borrar</button></td></tr>';
    }
    tabla.innerHTML += '</tbody>';
}

function alta() {
    
    var titulo = document.getElementById('titulo').value;
    var articulo = document.getElementById('articulo').value;
    data = {
        "titulo": titulo,
        "articulo": articulo,
        "collection": "posts"
    }
    var peticion = new XMLHttpRequest();
    peticion.onreadystatechange = function () {
        if (peticion.readyState == 4 && peticion.status == 200) {
            var resp = peticion.response;
            console.log(resp);
            cargarDatos();
        }
    };
    peticion.open('POST', 'http://localhost:3000/agregar', true);
    peticion.setRequestHeader("Content-Type", "application/json");
    peticion.send(JSON.stringify(data));

}

function eliminarArticulo(id) {
    
    body = {
        "collection": "posts",
        "id": id
    }
    var peticion = new XMLHttpRequest();
    peticion.onreadystatechange = function () {
        if (peticion.readyState == 4 && peticion.status == 200) {
            var resp = peticion.response;
            console.log(resp);
            cargarDatos();
        }
    };
    peticion.open('POST', 'http://localhost:3000/eliminar', true);
    peticion.setRequestHeader("Content-Type", "application/json");
    peticion.send(JSON.stringify(body));
}



function editar() {
    var titulo = document.getElementById('titulo').value;
    var articulo = document.getElementById('articulo').value;
    var fila = filaAEditar;
    data = {
        "titulo": titulo,
        "articulo": articulo,
        "collection": "posts",
        "id": fila.id,
        "active": fila.active,
        "created_dttm": fila.created_dttm
    };

    var peticion = new XMLHttpRequest();
    peticion.onreadystatechange = function () {
        if (peticion.readyState == 4 && peticion.status == 200) {
            var resp = peticion.response;
            console.log(resp);
            cargarDatos();
            mostrarBotonGuardar();
        }
    };
    peticion.open('POST', 'http://localhost:3000/modificar', true);
    peticion.setRequestHeader("Content-Type", "application/json");
    peticion.send(JSON.stringify(data));
}


function vaciarInputs() {
    document.getElementById('titulo').value = "";
    document.getElementById('articulo').value = "";
}

function mostrarBotonGuardar() {
    document.getElementById("btnEditar").style.display = 'none';
    document.getElementById("btnGuardar").style.display = 'block';
}

function mostrarBotonEditar() {
    document.getElementById("btnGuardar").style.display = 'none';
    document.getElementById("btnEditar").style.display = 'block';
}

function habilitarModificar(id) {
    mostrarBotonEditar();
    fila = datos[id];
    document.getElementById('titulo').value = fila.titulo;
    document.getElementById('articulo').value = fila.articulo;
    filaAEditar = fila;
}

