let valor;
let cuotas;

function calculadora(valor, cuotas) {
  return (valor / cuotas) * 1.0425;
}


do {
  valor = prompt("ingrese un valor para cuotificar");

  if (isNaN(valor)) {
    alert("Ingresa valor");
  }
} while (isNaN(valor) || valor <= 0);

// le pedimos a usuario un valor numerico distintoi de 0, de no ser asi vuelve a solicitar


do {
  cuotas = prompt("las cuotas deseadas");

  if (isNaN(cuotas)) {
    alert("Ingresa valor");
  }

  // le pedimos a usuario un valor numerico distintoi de 0, de no ser asi vuelve a solicitar
} while (isNaN(cuotas) || cuotas < 1);
let precio = calculadora(valor, cuotas);
alert(precio);
