let teclado = {tipo:"Teclado", cantidad : 0, precio: 10000 }
let pad = {tipo:"Pad", cantidad : 0, precio: 1500 }
let mouse = {tipo:"Mouse", cantidad : 0, precio: 5000 }
let carritoString = "";
let precioTotal = 0;

carrito = JSON.parse(localStorage.getItem("Compra")) || [teclado,pad,mouse];

actualizarTextoCarrito();

function CarritoTeclado() {
  sumarAlCarrito("Teclado");
}

function CarritoPad() {
  sumarAlCarrito("Pad");
}

function CarritoMouse() {
  sumarAlCarrito("Mouse");
}

function sumarAlCarrito(key){
  carrito.find(element => element.tipo == key).cantidad ++;
  guardarLocal();
  actualizarTextoCarrito();
}

function actualizarTextoCarrito(){
  carritoString = "";
  carrito.forEach(element=>{
    carritoString += element.cantidad > 0 ? `${element.tipo} x ${element.cantidad} <br>` : "";
  });
  document.getElementById("productosCarrito").innerHTML = carritoString;  
}

function vaciarCarrito(){
  borrarLocal();
  carrito.map(element => element.cantidad = 0);
  document.getElementById("precioFinal").value = 0;
  actualizarTextoCarrito();
}

let boton = document.getElementById("AgregarTeclado");
boton.onclick = CarritoTeclado;

let boton2 = document.getElementById("AgregarPad");
boton2.onclick = CarritoPad;

let boton3 = document.getElementById("AgregarMouse");
boton3.onclick = CarritoMouse;

function guardarLocal() {
  localStorage.setItem("Compra", JSON.stringify(carrito));
};

function borrarLocal() {
 localStorage.clear("Compra")
};

function calculadora() {
  let cuotas = document.getElementById("CantidadCuotas").value;
  return cuotas !=  1 ? (precioTotal / cuotas) * 1.0425 : (precioTotal);
}
function mostrarPrecio() {
  sumacarrito()
  let precio = calculadora()
  document.getElementById("precioFinal").value = precio.toFixed(2);
}

function sumacarrito() {
  precioTotal = carrito.reduce((previo,element) => previo + element.cantidad * element.precio,0);
}


//let botonTotal = document.getElementById("ValorTotal");

//botonTotal.onclick = mostrarPrecio();