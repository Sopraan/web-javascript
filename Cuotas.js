let valor;

let precioTeclado = 10000;
let precioPad = 1500;
let precioMouse = 5000;

carrito = [];

function CarritoTeclado() {
  carrito.push(precioTeclado);
}

function CarritoPad() {
  carrito.push(precioPad);
}

function CarritoMouse() {
  carrito.push(precioMouse);
}

let boton = document.getElementById("AgregarTeclado");
boton.onclick = CarritoTeclado;

let boton2 = document.getElementById("AgregarPad");
boton2.onclick = CarritoPad;

let boton3 = document.getElementById("AgregarMouse");
boton3.onclick = CarritoMouse;

console.log(carrito);

function sumacarrito() {
  let precioTotal = 0;
  for (i = 0; i < carrito.length; i++) {
    precioTotal += carrito[i];
  }
  return precioTotal;
}

function calculadora(total) {
  let cuotas = document.getElementById("CantidadCuotas").value;
  if (cuotas != 1) {
    return (total / cuotas) * 1.0425;
  } else return total;
}

function mostrarPrecio() {
  precio=calculadora(sumacarrito())
  document.getElementById("precioFinal").value = precio.toFixed(2);
}

//let botonTotal = document.getElementById("ValorTotal");

//botonTotal.onclick = mostrarPrecio();