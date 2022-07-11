// tuve que subir mi .json a un storage externo porque no me lo tomaba como interno. El Live Server me buscaba el ./libros.json como si fuera una web externa y me tiraba error 404 (porque obviamente no existe esa dirección). Aún así, dejé el archivo guardado por las dudas. Aunque no lo pude arreglar, me rebusqué la solución.

// el storage del carrito no funciona y no sé por qué

// cuando se filtra por género dejan de funcionar los botones de agregar carrito, pero cuando se ven todos los géneros funciona bien. Tampoco logré entender por qué y después de intentarlo por días me rendí.




// fetch de libros

let arrayLibros = fetch("https://json.extendsclass.com/bin/2087f43656ba")

.then ((resp) => resp.json() )  

.then( (libros) => {console.log(libros)

    // viendo si hay un localstorage anterior de los libros

    const storage = JSON.parse(localStorage.getItem("filtro"));

    if(storage){

        RellenarLibros(storage)

    }else{

        RellenarLibros(libros);


    }
    
    // si hay storage anterior del carrito

    const storageCarrito = JSON.parse(localStorage.getItem("storageCarrito"));

    if (storageCarrito){
        Carrito(storageCarrito);

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
        RellenarLibros(libros);


    }else{
        arrayLibros = libros.filter((libro) => {
            RellenarLibros(libros);
            return libro.tipo.toUpperCase() === inputValue;

        })

    }


    // guardar en storage

    localStorage.setItem("filtro", JSON.stringify(arrayLibros));
    RellenarLibros(arrayLibros)
    

}

// llamada a la función del carrito
Carrito(libros);


});





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


// para el carrito
const carrito = [];
let precioTotal = 0;


//funciones del carrito
function Carrito(array){


    for (let i = 0; i < array.length ; i ++){

    let comprar = document.getElementById(array[i].id);
    comprar.onclick = () => {
        console.log("hola")


        // agregando totales parciales y final, y agregándolos al carrito visualmente
        precioTotal = precioTotal + JSON.parse([array[i].precio]);
        console.log(precioTotal)
        carrito.push(array[i]);
        console.log(carrito);

        let total= document.getElementById("total");
        total.innerHTML=precioTotal;


        const tbodyCarrito = document.getElementById("tbodyCarrito");

        // agregando elementos al carrito

        let trCarrito = document.createElement("tr");
        trCarrito.innerHTML=`
        <td>${carrito[i].libro} </td><br>
        <td> $${carrito[i].precio}</td>
    `;

        tbodyCarrito.appendChild(trCarrito);


        // toastify cuando se agrega un libro al carrito
        Toastify({
            text: "¡Libro agregado al carrito!",
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
            onClick: function(){} // Callback after click
          }).showToast();

        // localStorage.setItem("storageCarrito", JSON.stringify(storageCarrito));


    }


    }

    // para vaciar el carrito

    let vaciar = document.getElementById("vaciar");
    vaciar.addEventListener("click", () => {
    carrito.splice(0,carrito.length);


    tbodyCarrito.innerHTML= ""
    total.innerHTML= "";
    precioTotal = 0;
    localStorage.setItem("storageCarrito", JSON.stringify(storageCarrito));
    })

}


    // funcionalidad del botón comprar todo
    let comprarTodo = document.getElementById("comprarTodo");
    comprarTodo.onclick =  () => {  
        Swal.fire('El total de su compra es: $' + precioTotal)
    };



    setTimeout(() => {


        Swal.fire({
            title: 'LIBROS DIGITALES, \n PRECIOS DIGITALES \n \n Viví la experiencia \n de leer un e-book.',
            width: 600,
            padding: '3em',
            color: 'black',
            background: 'white',
            confirmButtonColor: "black",
            backdrop: `
              rgba(black)
              left top
              no-repeat
            `
          })
        
    }, 3000);







