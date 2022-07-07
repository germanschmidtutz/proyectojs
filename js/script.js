// tuve que subir mi .json a un storage externo porque no me lo tomaba como interno. El Live Server me buscaba el ./libros.json como si fuera una web externa y me tiraba error 404 (porque obviamente no existe esa dirección). Aún así, dejé el archivo guardado por las dudas. Aunque no lo pude arreglar, me rebusqué la solución :).
// (casi me vuelvo loco)




// fetch de libros

let arrayLibros = fetch("https://json.extendsclass.com/bin/2087f43656ba")

.then ((resp) => resp.json() )  

.then( (libros) => {console.log(libros)

    // viendo si hay un localstorage anterior

    const storage = JSON.parse(localStorage.getItem("filtro"));

    if(storage){

        RellenarLibros(storage)

    }else{

        RellenarLibros(libros);

    }


    //para filtrar los libros

    // IMPORTANTE: sé que este filtrado debería estar en una función, pero sinceramente se me complicó, por alguna razón que no supe decifrar no me funcionaba haciendo una función más abajo y llamándola acá arriba, así que decidí dejarlo así porque al menos funciona.

const generoElegido = document.getElementsByClassName("radio");


// recorriendo los selectores para poder usarlos y dándole la función a ejectar

for (const genero of generoElegido){
    genero.addEventListener("change", FiltrarTabla)
}


function FiltrarTabla(eleccion){

    // guardando el selector que elija el usuario en una variable en mayus
    let inputValue = eleccion.target.value.toUpperCase();

    
    // si no se elige "TODOS", filtrar
    if(inputValue == "TODOS"){

        arrayLibros = libros;

    }else{
        arrayLibros = libros.filter((libro) => {

            return libro.tipo.toUpperCase() === inputValue;

        })
 
        
    }


    localStorage.setItem("filtro", JSON.stringify(arrayLibros));
    RellenarLibros(arrayLibros)
 
}


agregarCarrito(libros);




});


const carrito = [];



// función para rellenar los libros con el arreglo

function RellenarLibros (array){

    const tbody = document.getElementById("tbody");
    tbody.innerHTML= "";


    for (let i = 0; i < array.length ; i++){
    
    let tr = document.createElement("tr");
    tr.innerHTML= `<td><img class="fotoLibro" src='${array[i].imagen}'></td>
    <td>${array[i].libro}</td>
    <td>${array[i].nombreAut}</td>
    <td>${array[i].apellidoAut}</td>
    <td>$${array[i].precio}</td>
    <button id="${array[i].id}" class="comprar">Agregar al carrito</button>`

     tbody.appendChild(tr);}

}


// ------------


function agregarCarrito(array){



    
   
    for (let i = 0; i < array.length ; i ++){

    let comprar = document.getElementById(array[i].id);
    comprar.addEventListener("click", () => {


        // --------
        carrito.push(array[i]);
        console.log(carrito);



        // ----------

        const tbodyCarrito = document.getElementById("tbodyCarrito");

        let trCarrito = document.createElement("tr");
        trCarrito.innerHTML=`
        <td>${carrito[i].libro} </td><br>
        <td> $${carrito[i].precio}</td>
    `;

        tbodyCarrito.appendChild(trCarrito);


    })


    }


    let vaciar = document.getElementById("vaciar");
    vaciar.addEventListener("click", () => {
    carrito.splice(0,carrito.length);
    // let trCarrito = document.createElement("tr");
    // trCarrito.innerHTML= "";
    // tbodyCarrito.appendChild(trCarrito);

    tbodyCarrito.innerHTML= ""
    
    })








}






    let comprarTodo = document.getElementById("comprarTodo");
    comprarTodo.onclick =  () => { console.log("asd")};





// borrarElemento.onclick = () => {carrito.splice(array[i],1);}




// carrito de compras


// const tbodyCarrito = document.getElementById("tbodyCarrito");

// let trCarrito = document.createElement("tr");
// trCarrito.innerHTML="<td>holaaa</td>";

// tbodyCarrito.appendChild(trCarrito);







