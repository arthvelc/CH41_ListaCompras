// El código va aquí -> 

// Obtener referencias a los elementos del DOM
let btnAgregar = document.getElementById('btnAgregar'); // Botón de agregar
let btnClear = document.getElementById('btnClear'); // Botón de limpiar

let txtNombre = document.getElementById('Name'); // Campo de texto para el nombre
let txtNumber = document.getElementById('Number'); // Campo de texto para la cantidad

let alertValidaciones = document.getElementById('alertValidaciones'); // Div para mostrar alertas de validación
let alertValidacionesText = document.getElementById('alertValidacionesTexto'); // Texto de las alertas de validación

let contadorProductos = document.getElementById('contadorProductos'); // Contador de productos
let productosTotal = document.getElementById('productosTotal'); // Total de productos
let totalPrecio = document.getElementById('precioTotal'); // Total de precio

let tablaListaComparas = document.getElementById('tablaListaCompras'); // Tabla para mostrar la lista de compras
let cuerpoTabla = document.getElementsByTagName('tbody').item(0); // Cuerpo de la tabla

// Variables
let precio;
let isValid = true;
let contador = 0;
let costoTotal = 0;
let totalEnProductos = 0;

// Arreglo para guardar los datos de los productos
let datos = []

/*
*******************************************
    -----------------------------------
            Funciones
    -----------------------------------
*******************************************
*/

// Función para validar la cantidad de productos
function validarCantidad(){
    if(txtNumber.value == 0){
        return false;
    }
    if(isNaN(txtNumber.value)){
        return false;
    }
    if(txtNumber.value <= 0){
        return false;
    }
}

//Función para dar un precio aleatorio
function getPrecio(){
    return precio = Math.floor((Math.random() * 10000)/100); //retorna un número aleatorio entre 0 y 1000 con dos decimales 
}



/*
*******************************************
    -----------------------------------
            Boton Agregar
    -----------------------------------
*******************************************
*/
// Evento click del botón "Agregar"
btnAgregar.addEventListener('click', function(event){
    event.preventDefault();

    // Limpiar alertas y estilos de los campos de texto
    alertValidacionesText.innerHTML= '';
    alertValidaciones.style.display = 'none';
    txtNombre.style.border = '';
    txtNumber.style.border = '';

    isValid = true;

    // Validar el nombre
    if(txtNombre.value.length < 3){
        alertValidacionesText.innerHTML= '<strong>El nombre debe tener al menos 3 caracteres</strong>';
        alertValidaciones.style.display = 'block';
        txtNombre.style.border = '1px solid red';
        isValid = false;
    }

    // Validar la cantidad
    if(validarCantidad()){ // Si la cantidad es 0 o no es un número o es menor a 0 entonces
        alertValidacionesText.innerHTML+= '<strong>La cantidad no puede estar vacía</strong>';
        alertValidaciones.style.display = 'block';
        txtNumber.style.border = '1px solid red';
        isValid = false;
    }

    if(isValid){
        contador++; // Incrementar el contador de productos
        precio = getPrecio(); // Obtener un precio aleatorio
        // Crear una nueva fila en la tabla
        let row = `
        <tr>
            <td>${contador}</td>
            <td>${txtNombre.value}</td>
            <td>${txtNumber.value}</td>
            <td>${precio}</td>
        </tr>`

        // Crear un objeto con los datos del producto
        let elemento = `{
            "id": ${contador},
            "nombre": "${txtNombre.value}",
            "cantidad": ${txtNumber.value},
            "precio": ${precio}
        }`

        datos.push(JSON.parse(elemento));//agregar los datos al arreglo

        localStorage.setItem('datos', JSON.stringify(datos));//guardar los datos en el localStorage

        cuerpoTabla.insertAdjacentHTML('beforeend', row);
        contadorProductos.innerText = contador;
        totalEnProductos += parseFloat(txtNumber.value);
        costoTotal += precio * parseFloat(txtNumber.value);
        productosTotal.innerText = totalEnProductos;
        totalPrecio.innerText = `consumo total: $${costoTotal.toFixed(2)}`;

        //localStorage
        localStorage.setItem('contador', contador);
        localStorage.setItem('totalEnProductos', totalEnProductos);
        localStorage.setItem('costoTotal', costoTotal);


        // Limpiar los campos de texto
        txtNombre.value = '';
        txtNumber.value = '';
        txtNombre.focus(); // Poner el foco en el campo de texto del nombre para que el usuario pueda seguir escribiendo

    }
})

/*
*******************************************
    -----------------------------------
            Boton Limpiar
    -----------------------------------
*******************************************
*/

// Evento click del botón "Limpiar"
btnClear.addEventListener("click", function(event){
    event.preventDefault();
    txtNombre.value = "";
    txtNumber.value = "";
    alertValidacionesText.innerHTML="";
    alertValidaciones.style.display="none";
    txtNombre.style.border="";
    txtNumber.style.border="";
    cuerpoTabla.innerHTML="";
    contadorProductos.innerText="0";
    productosTotal.innerText="0";
    precioTotal.innerText="$ 0";
    contador = 0;
    totalEnProductos = 0;
    costoTotal = 0;
    datos = [];
    localStorage.setItem('contador', contador);
    localStorage.setItem('totalEnProductos', totalEnProductos);
    localStorage.setItem('costoTotal', costoTotal);
    localSrtorage.removeItem('datos');
    contadorProductos.innerText = contador;
    productosTotal.innerText = totalEnProductos;
    precioTotal.innerText = `$${costoTotal.toFixed(2)}`;
    txtNombre.focus();
});

/*
*******************************************
    -----------------------------------
            window.addEventListener
    -----------------------------------
*******************************************
*/ 

//localStorage en el contador de productos y el total de productos y el costo total
window.addEventListener('load', function(event){
    event.preventDefault();

    if(this.localStorage.getItem('contador') != null){
        contador = Number(this.localStorage.getItem('contador'));
    }

    if(this.localStorage.getItem('totalEnProductos') != null){
        totalEnProductos = Number(this.localStorage.getItem('totalEnProductos'));
    }

    if(this.localStorage.getItem('costoTotal') != null){
        costoTotal = Number(this.localStorage.getItem('costoTotal'));
    }
    if(this.localStorage.getItem('datos') != null){
        datos = JSON.parse(this.localStorage.getItem('datos'));
        datos.forEach(element => {
            let row = `
            <tr>
                <td>${element.id}</td>
                <td>${element.nombre}</td>
                <td>${element.cantidad}</td>
                <td>${element.precio}</td>
            </tr>`
            cuerpoTabla.insertAdjacentHTML('beforeend', row);
        });
    }



    contadorProductos.innerText = contador;
    productosTotal.innerText = totalEnProductos;
    totalPrecio.innerText = `$${costoTotal.toFixed(2)}`;
})