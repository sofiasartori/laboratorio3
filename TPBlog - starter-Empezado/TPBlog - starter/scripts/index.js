var xhr;
var datos = new Array();

function cargarDatos(){
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
           var resp = JSON.parse(this.response); 
            for(var i=0; i<resp.length; i++){               
                document.getElementsByTagName("main").innerHTML+="<div><h1>"+resp.titulo[i]+"</h1><p>"+resp.articulo[i]+"</p></div>";
            }
           console.log(resp);
           console.log(resp.message);
           cargarHtml(resp.data);
                      
           datos = resp.data;
        }
    };
    xhr.open("POST","http://localhost:3000/traer",true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({"collection":"posts"}));    
}

window.onload = function(){
    cargarDatos();
    
}

function cargarHtml(data){
    console.log("cargo html");
    console.log(JSON.stringify(data));
    var articulos = document.getElementsByClassName("contenido")[0];
    articulos.innerHTML="";
    articulos.innerHTML+= '<main>';
    for (var i=0; i<data.length; i++){
        articulos.innerHTML+='<article><h2>'+data[i].titulo+'</h2>'+
                             '<img src="img/imagen_1.jpg" alt="Imagen viajar a londres" class="fotoArticulo">'+
                             '<p>'+data[i].articulo+'</p>'+
                             '<button class="boton">Leer más</button>'+
                             '</article>';
    }
    articulos.innerHTML+='</main>';
}
