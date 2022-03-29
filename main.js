// Primero le pido que introduzca el numero
// Verifico si realmente introdujo un numero
// Agarro el numero y le calculo las distintas cotizaciones a monedas
// Consulto al local storage si tiene elementos dentro, si no entonces lo declaro.
if (localStorage.getItem("elementosConsultados")== null){
  localStorage.setItem("elementosConsultados", `No Hay Registros`)
}

const arrayHistorial = localStorage.getItem("elementosConsultados").split(",");
let listaHisto = document.querySelector(".listaHistorial");

for (const el of arrayHistorial){
  let li = document.createElement("li");
  li.innerHTML= el;
  listaHisto.append(li);
}

function datos (){


  
  let peso = parseFloat(document.querySelector(".pesoIngresado").value);

  while (true) {
    if (peso !="" && !isNaN(peso)) {
      //Es un numero por lo que se verifica y se rompe el loop.
      break
    }else{
      //No es un numero por lo que se solicita que ingrese un numero hasta que el mismo sea valido.
      alert("Ingrese un numero valido")
      break
    }
  };
  //Creo la clase moneda para luego definirlas
  class moneda {
    constructor(nombre,valor,texto) {
      this.nombre=nombre;
      this.valor=valor;
      this.texto=texto;
    }
  };
  //Creo los objetos
  const dolar = new moneda("Dolar",106.50,"dolares");
  const euro = new moneda("Euro",119.53,"euros");
  const sol = new moneda("Sol",3.78,"soles");
  const real = new moneda("Real",20.81,"reales");
  //Creo el array vacio
  const arrayMonedas = [];

  //Creo las variables de las checkboxes
  let checkboxDolar = document.querySelector(".checkDolar");
  let checkboxEuro = document.querySelector(".checkEuro");
  let checkboxSol = document.querySelector(".checkSol");
  let checkboxReal = document.querySelector(".checkReal");

  //Armo los condicionales que agregan cosas al array
  if (checkboxDolar.checked == true) {
    arrayMonedas.push(dolar)
  }
  if (checkboxEuro.checked == true) {
    arrayMonedas.push(euro)
  }
  if (checkboxSol.checked == true) {
    arrayMonedas.push(sol)
  }
  if (checkboxReal.checked == true) {
    arrayMonedas.push(real)
  }

  //Hago el calculo segun lo que se selecciono

  let longitud = arrayMonedas.length

  const arrayResultado = [];
  
  for (let i = 0; i < longitud; i++) {
    let resultado = arrayMonedas[i].valor * peso
    let textos = arrayMonedas[i].texto;
    arrayResultado.push(`$ ${peso} equivalen a ${resultado} ${textos}`);
  }
  let listaP = document.querySelector(".listaPadre");
  for(const resultados of arrayResultado){
    let li = document.createElement("li");
    li.innerHTML = resultados
    listaP.append(li);
  }

  const guardarLocal = (clave,valor) => {localStorage.setItem(clave, valor)};

  guardarLocal("elementosConsultados",arrayResultado);

  

}

let botonapretar = document.getElementById("boton");
botonapretar.onclick = () => datos();



