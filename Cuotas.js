let valor;

//let precioTeclado = 10000;
let precioPad = 1500;
let precioMouse = 5000;

let carritoString = "";

let compraJson = localStorage.getItem("Compra") || "";
cantidadEnCarrito =
  compraJson == ""
    ? new Map()
    : new Map(Object.entries(JSON.parse(compraJson)));

precios = new Map();
precios.set("Teclado", 10000);
precios.set("Pad", 1500);
precios.set("Mouse", 5000);


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

// se utiliza la funcion fetch para obtener valores del JSON y reflejarlos en el HTML
function preciosNuevos() {
  fetch("./JSON.json")
    .then((ofertas) => ofertas.json())
    .then((ofertas) => {
      ofertas.forEach((oferta) => {
        if (oferta.nombre === "teclado") {
          document.getElementById(
            "precioTeclado"
          ).innerHTML = `Teclado $ ${oferta.precioNuevo}`;
        }
        if (oferta.nombre === "pad") {
          document.getElementById(
            "precioPad"
          ).innerHTML = `Pad $ ${oferta.precioNuevo}`;
        }
        if (oferta.nombre === "mouse") {
          document.getElementById(
            "precioMouse"
          ).innerHTML = `Mouse $ ${oferta.precioNuevo}`;
        }
      });
    });
}

let precioTotal = 0;
actualizarTextoCarrito();

function CarritoTeclado() {
  sumarAlCarrito("Teclado");
  guardarLocal();
  actualizarTextoCarrito();
}

function CarritoPad() {
  sumarAlCarrito("Pad");
  guardarLocal();
  actualizarTextoCarrito();
}

function CarritoMouse() {
  sumarAlCarrito("Mouse");
  guardarLocal();
  actualizarTextoCarrito();
}

function sumarAlCarrito(key) {
  // !carritos2.has("Teclado")
  !cantidadEnCarrito.has(key)
    ? cantidadEnCarrito.set(key, 1)
    : cantidadEnCarrito.set(key, cantidadEnCarrito.get(key) + 1);
}

function actualizarTextoCarrito() {
  carritoString = "";
  cantidadEnCarrito.forEach(obtenerTextosSegunCantidad);
  document.getElementById("productosCarrito").innerHTML = carritoString;
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

let boton = document.getElementById("AgregarTeclado");
boton.onclick = CarritoTeclado;

let boton2 = document.getElementById("AgregarPad");
boton2.onclick = CarritoPad;

let boton3 = document.getElementById("AgregarMouse");
boton3.onclick = CarritoMouse;

console.log(cantidadEnCarrito);

function guardarLocal() {
  localStorage.setItem(
    "Compra",
    JSON.stringify(Object.fromEntries(cantidadEnCarrito))
  );
}

function borrarLocal() {
  localStorage.clear("Compra");
}

function calcularMontoPorTipo(value, key, map) {
  //la key es el tipo (Teclado, Pad, Mouse)
  // El value es la cantidad de ese objeto en el carrito.
  let subtotalItem = precios.get(key) * value;
  console.log("El subtotal (sin interes) de " + key + " es " + subtotalItem);
  precioTotal += subtotalItem;
}

function calculadora() {
  let cuotas = document.getElementById("CantidadCuotas").value;
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

//let botonTotal = document.getElementById("ValorTotal");

//botonTotal.onclick = mostrarPrecio();
