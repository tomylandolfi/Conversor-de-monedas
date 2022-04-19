// Primero le pido que introduzca el numero
// Verifico si realmente introdujo un numero
// Agarro el numero y le calculo las distintas cotizaciones a monedas

if(localStorage.getItem("elementosConsultados")== null){
  localStorage.setItem("elementosConsultados", `No Hay Registros`)
} ;

const arrayHistorial = localStorage.getItem("elementosConsultados").split(",");
let listaHisto = document.querySelector(".listaHistorial");

for (const el of arrayHistorial){
  let li = document.createElement("li");
  li.innerHTML= el;
  listaHisto.append(li);
}

function cartel(){
  Toastify({
    text: "Ingrese un numero valido",
    duration: 3000,
    className:"tostada",
    backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
    position: "center"
  }).showToast();
}

function datos (){


  
  let peso = parseFloat(document.querySelector(".pesoIngresado").value);

  while (true) {
    if (peso !="" && !isNaN(peso)) {
      //Es un numero por lo que se verifica y se rompe el loop.
      break
    }else{
      //No es un numero por lo que se solicita que ingrese un numero hasta que el mismo sea valido.
      cartel();
      return
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

  
  async function getMonedas(){
      let monedas = await fetch("http://api.exchangeratesapi.io/v1/latest?access_key=14c093b656ddb55bb02c0ccc7fce01c7&symbols=USD,ARS,BRL,PEN&format=1");
      const datosMonedas = await monedas.json();
      return datosMonedas.rates;
  }
  getMonedas().then( (valores) => {
    let datosValores = valores; 
    const arrayValores = [
      datosValores.USD/datosValores.ARS, 1/datosValores.ARS, datosValores.PEN/datosValores.ARS, datosValores.BRL/datosValores.ARS
    ]
    //Creo los objetos
  const dolar = new moneda("Dolar",arrayValores[0],"dolares");
  const euro = new moneda("Euro",arrayValores[1],"euros");
  const sol = new moneda("Sol",arrayValores[2],"soles");
  const real = new moneda("Real",arrayValores[3],"reales");
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
  } )
  
  
  

  

}

let botonapretar = document.getElementById("boton");
botonapretar.onclick = () => datos();



