let valor;
let cuotas;
let precioTeclado = 10000;
let precioPad = 1500;
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
alert("teclado $"+precioTeclado +"\npad $"+precioPad +"\nmouse $" +precioMouse);

//usuario escriben en prompt el producto que desea comprar, y se deposita en un array para calcular total del compra
do {
  productoIngresado = prompt(
    "Ingrese el nombre del producto \n (para finalizar la compra ingrese 0)"
  );

  switch (productoIngresado) {
    case "teclado":
      carrito.push(precioTeclado);
      break;
    case "mouse":
      carrito.push(precioMouse);
      break;
    case "pad":
      carrito.push(precioPad);
      break;
      case "0" :
        break;
      default:
        alert("ingresa el nombre de un producto")
        break;
  }

} while (productoIngresado != 0);

let total = sumacarrito();

function calculadora(total, cuotas) {
  if(cuotas != 1){
  return (total / cuotas) * 1.0425;
  } else 
  return (total)
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
alert("Cantidad de cuotas" + cuotas +"\nValor de su cuota $" + precio)
