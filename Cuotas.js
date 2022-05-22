let valor;
let cuotas;
let precioTeclado = 10000;
let PrecioPad = 1500;
let precioMouse = 5000;

carrito = [];
// se arma una funcion que tome el producto ingresado por el usuario, obteniendo su precio y sumando el total del carrito
function sumacarrito() {
  let precioTotal = 0;
  for (i = 0; i < carrito.length; i++) {
    precioTotal += carrito[i];
  }
  return precioTotal;
}

// el usuario ve los productos y valores
alert(  "teclado " +    "$" +    precioTeclado +    "\n" +    "pad " +    "$" +    PrecioPad +    "\n" +    "mouse " +    "$" +    precioMouse
);

//usuario escriben en prompt el producto que desea comprar, y se deposita en un array para calcular total del compra
do {
  productos = prompt("produco a comprar");

  if (productos === "teclado") {
    carrito.push(precioTeclado);
    alert("para finalizar compra, esribir 0");
  }
  if (productos === "pad") {
    carrito.push(precioPad);
    alert("para finalizar compra, esribir 0");
  }
  if (productos === "mouse") {
    carrito.push(precioMouse);
    alert("para finalizar compra, esribir 0");
  }
} while (productos != 0);

let total = sumacarrito();

function calculadora(total, cuotas) {
  return (total / cuotas) * 1.0425;
}

do {
  cuotas = prompt("las cuotas deseadas");

  if (isNaN(cuotas)) {
    alert("Ingresa valor");
  }

  // le pedimos a usuario un valor numerico distintoi de 0, de no ser asi vuelve a solicitar
} while (isNaN(cuotas) || cuotas < 1);
console.log(total);
console.log(cuotas);
let precio = calculadora(total, cuotas);
alert(precio);
