// ESTADO
let carritoString = "";
let precioTotal = 0;

let precios = new Map();

let carritoLocal = localStorage.getItem("compra") || "";

let cantidadEnCarrito = carritoLocal == ""
  ? new Map()
  : new Map(Object.entries(JSON.parse(carritoLocal)));


// modifica MAP

function cargarPrecios() {
  fetch("./JSON.json")
    .then((ofertas) => ofertas.json())
    .then((ofertas) => {
      ofertas.forEach((oferta) => {
        if (oferta.nombre === "teclado") {
          precios.set("teclado", oferta.precioNuevo);
        }
        if (oferta.nombre === "pad") {
          precios.set("pad", oferta.precioNuevo);
        }
        if (oferta.nombre === "mouse") {
          precios.set("mouse", oferta.precioNuevo);
        }
      });
    })
    .then(cargarPreciosEnVista);
}

cargarPrecios();

//EVENTOS

let boton = document.getElementById("agregarTeclado");
boton.onclick = CarritoTeclado;

let boton2 = document.getElementById("agregarPad");
boton2.onclick = CarritoPad;

let boton3 = document.getElementById("agregarMouse");
boton3.onclick = CarritoMouse;

function cargarPreciosEnVista() {
  document.getElementById("precioTeclado").innerHTML = `Teclado $ ${precios.get(
    "teclado"
  )}`;
  document.getElementById("precioPad").innerHTML = `Pad $ ${precios.get(
    "pad"
  )}`;
  document.getElementById("precioMouse").innerHTML = `Mouse $ ${precios.get(
    "mouse"
  )}`;
}

// se utiliza la funcion fetch para obtener valores del JSON y reflejarlos en el HTML
function preciosViejos() {
  fetch("./JSON.json")
    .then((ofertas) => ofertas.json())
    .then((ofertas) => {
      ofertas.forEach((oferta) => {
        if (oferta.nombre === "teclado") {
          document.getElementById(
            "precioTeclado"
          ).innerHTML = `Teclado $ ${oferta.precioViejo}`;
        }
        if (oferta.nombre === "pad") {
          document.getElementById(
            "precioPad"
          ).innerHTML = `Pad $ ${oferta.precioViejo}`;
        }
        if (oferta.nombre === "mouse") {
          document.getElementById(
            "precioMouse"
          ).innerHTML = `Mouse $ ${oferta.precioViejo}`;
        }
      });
    });
}

actualizarTextoCarrito();

function CarritoTeclado() {
  sumarAlCarrito("teclado");
  guardarLocal();
  actualizarTextoCarrito();
}

function CarritoPad() {
  sumarAlCarrito("pad");
  guardarLocal();
  actualizarTextoCarrito();
}

function CarritoMouse() {
  sumarAlCarrito("mouse");
  guardarLocal();
  actualizarTextoCarrito();
}

function sumarAlCarrito(key) {
  !cantidadEnCarrito.has(key)
    ? cantidadEnCarrito.set(key, 1)
    : cantidadEnCarrito.set(key, cantidadEnCarrito.get(key) + 1);
}

function actualizarTextoCarrito() {
  carritoString = "";
  cantidadEnCarrito.forEach(obtenerTextosSegunCantidad);
  document.getElementById("productosCarrito").innerHTML =
    `Productos Seleccionados <br><br>` + carritoString;
}

function obtenerTextosSegunCantidad(value, key, map) {
  let str = `${key} x ${value} <br>`;
  carritoString += str;
}

function vaciarCarrito() {
  borrarLocal();
  precioTotal = 0;
  cantidadEnCarrito = new Map();
  document.getElementById("precioFinal").value = 0;
  document.getElementById("productosCarrito").innerHTML = "";
}

function ocultarCarrito() {
  carritoString = "";
  cantidadEnCarrito.forEach(obtenerTextosSegunCantidad);
  document.getElementById("productosCarrito").innerHTML = "";
}

/*  PENDIENTE  ENTREGA FINAL  -----    crear boton para mostrar y ocultar carrito
    usar las variables de botones, y veer como hacer para que el html no mueste de entrada el carrito
     sino que cuando se toque el boton de mostrar muestre el carrito actualizado
*/

// ----------------------------------------------------------------

function guardarLocal() {
  localStorage.setItem(
    "compra",
    JSON.stringify(Object.fromEntries(cantidadEnCarrito))
  );
}

function borrarLocal() {
  localStorage.clear("compra");
}

function calcularMontoPorTipo(value, key, map) {
  //la key es el tipo (Teclado, Pad, Mouse)
  // El value es la cantidad de ese objeto en el carrito.
  let subtotalItem = precios.get(key) * value;
  console.log("El subtotal (sin interes) de " + key + " es " + subtotalItem);
  precioTotal += subtotalItem;
}

function calculadora() {
  let cuotas = document.getElementById("cantidadCuotas").value;
  return cuotas != 1 ? (precioTotal / cuotas) * 1.0425 : precioTotal;
}
function mostrarPrecio() {
  sumacarrito();
  let precio = calculadora();
  document.getElementById("precioFinal").value = precio.toFixed(2);
}

function sumacarrito() {
  precioTotal = 0;
  cantidadEnCarrito.forEach(calcularMontoPorTipo);
}

// Se utilizo sweetAlert para niticar al usuario si efectivmaente se relizo la compra o si surgio algun error

function finalizarCompra() {
  if (precioTotal != 0) {
    swal({
      title: "Compra Finalizada!",
      icon: "success",
    });
  } else {
    swal({
      title: "El carrito esta vacio",
      icon: "warning",
    });
  }
}


