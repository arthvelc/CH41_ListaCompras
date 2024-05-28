// El código va aquí -> 

// Obtener referencias a los elementos del DOM
let btnAgregar = document.getElementById('btnAgregar'); // Botón de agregar
let btnClear = document.getElementById('btnClear'); // Botón de limpiar

let txtNombre = document.getElementById('Name'); // Campo de texto para el nombre
let txtNumber = document.getElementById('Number'); // Campo de texto para la cantidad

let alertValidaciones = document.getElementById('alertValidaciones'); // Div para mostrar alertas de validación
let alertValidacionesText = document.getElementById('alertValidacionesTexto'); // Texto de las alertas de validación

// Función para validar la cantidad
function validarCantidad(){
    if(txtNumber.value.length == 0){
        return false;
    }
}

// Evento click del botón "Agregar"
btnAgregar.addEventListener('click', function(event){
    event.preventDefault();

    // Limpiar alertas y estilos de los campos de texto
    alertValidacionesText.innerHTML= '';
    alertValidaciones.style.display = 'none';
    txtNombre.style.border = '';
    txtNumber.style.border = '';

    // Validar el nombre
    if(txtNombre.value.length < 3){
        alertValidacionesText.innerHTML= '<strong>El nombre debe tener al menos 3 caracteres</strong>';
        alertValidaciones.style.display = 'block';
        txtNombre.style.border = '1px solid red';
    }

    // Validar la cantidad
    if(!validarCantidad()){
        alertValidacionesText.innerHTML+= '<strong>La cantidad no puede estar vacía</strong>';
        alertValidaciones.style.display = 'block';
        txtNumber.style.border = '1px solid red';
    }
})

// Evento click del botón "Limpiar"
btnClear.addEventListener('click', function(event){
    event.preventDefault();
    
    // Limpiar los campos de texto
    txtNumber.value = '';
    txtNombre.value = '';
})