// Variables y Selectores
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');

// Eventos

eventListeners()
function eventListeners(){
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);

    formulario.addEventListener('submit', agregarGasto)
}


// Clases
class Presupuesto {
    constructor(presupuesto) {
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos= [];
    }
}

class UI {
    insertarPresupuesto(cantidad) {
        //Extraigo el valor
        const  { presupuesto, restante} = cantidad;
        //Y lo agrego al HTML easypizi
        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;
    }

    imprimirAlerta(mensaje, tipo) {
        //Crear el div
        const divMensaje = document.createElement('div');
       divMensaje.classList.add('text-center', 'alert');
        
        if(tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-sucess');
        }
        //Mensaje de error
        divMensaje.textContent= mensaje;

        //Inserto al HTML

        document.querySelector('.primario').insertBefore( divMensaje, formulario );

        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    }
}
//Insatancuar
const ui = new UI();
let presupuesto;

//Funciones

function preguntarPresupuesto() {
    const presupuestoUsuario = prompt('Cuál es tu presupuesto?');

    //console.log( Number(presupuestoUsuario));

    if(presupuestoUsuario ==='' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0) {
        window.location.reload();
    }

    //Presupuesto valido
    presupuesto = new Presupuesto(presupuestoUsuario);
    console.log(presupuesto);

    ui.insertarPresupuesto(presupuesto);
}

function agregarGasto(e) {
    e.preventDefault();

    //Leer los datos del formulario
    const nombre= document.querySelector('#gasto').value;
    const cantidad= document.querySelector('#cantidad').value;
    
    //Validar
    if(nombre === '' || cantidad ==='') {
        ui.imprimirAlerta('Ambos campos son obligarios', 'error');

        return;
    } else if ( cantidad <= 0 || isNaN(cantidad) ) {
        ui.imprimirAlerta('Cantidad no validad', 'error');

        return;
    }

    // Objeto para los gastos
    const gasto = { nombre, cantidad } 

    console.log(gasto);
    
}