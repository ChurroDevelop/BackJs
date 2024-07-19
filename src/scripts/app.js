// Importar modulo para manejarlo modularizado
import { tipoDocs, generos, createUser } from './module.js';
import { numeros, texto, check, validarCampos } from './permisos.js';

// Atrapar los elementos a manipular
const $dom = document;
const $formulario = $dom.querySelector("#formulario");
const $name = $dom.querySelector("#name");
const $apellido = $dom.querySelector("#apellido");
const $tipoDocumento = $dom.querySelector("#tipoDocumento");
const $numDocumento = $dom.querySelector("#numDocumento");
const $email = $dom.querySelector("#email");
const $genero = $dom.querySelector("#genero");
const $telefono = $dom.querySelector("#telefono");
const $checkbox = $dom.querySelector("#checkbox");
const $btnForm = $dom.querySelector("#btnForm");
const $fragmentoDocs = $dom.createDocumentFragment();
const $fragmentoGeneros = $dom.createDocumentFragment();

const $inputsAll = $dom.querySelectorAll("input");

// Campo para cargar los documentos
tipoDocs()
  .then((response) => {
    response.forEach((element) => {
      const $option = $dom.createElement("option");
      $option.textContent = element.tipoDocumento;
      $option.value = element.tipoDocumento;
      $fragmentoDocs.appendChild($option);
    })
    $tipoDocumento.appendChild($fragmentoDocs);
  })
  .catch((error) => {
    console.log(error)
  })

// Campo para cargar los generos
generos()
  .then((response) => {
    response.forEach((element) => {
      const $option = $dom.createElement("option");
      $option.textContent = element.genero;
      $option.value = element.genero;
      $fragmentoGeneros.appendChild($option);
    })
    $genero.appendChild($fragmentoGeneros);
  })
  .catch((error) => {
    console.log(error);
  })

// Funcion para enviar el formulario con los datos obtenidos
async function enviarForm (event) {

  let $estado = validarCampos($inputsAll)
  event.preventDefault();

  if (!$estado) {
    console.log("No se puede")
  }
  else {
    const dataUser = {
      id: Math.floor(Math.random() * 100).toString(),
      nombre: $name.value,
      apellido: $apellido.value,
      tipoDocumento: $tipoDocumento.value,
      numDocumento: $numDocumento.value,
      email: $email.value,
      genero: $genero.value,
      telefono: $telefono.value
    }
    $name.value = '';
    $apellido.value = '';
    $tipoDocumento.value = '';
    $numDocumento.value = '';
    $email.value = '';
    $genero.value = '';
    $telefono.value = '';
    await createUser(dataUser);
  }
}

// Manejo de eventos
$formulario.addEventListener("submit", enviarForm);
$name.addEventListener("keypress", () => texto(event, $name));
$apellido.addEventListener("keypress", () => texto(event, $apellido));
$numDocumento.addEventListener("keypress", () => numeros(event, $numDocumento));
$telefono.addEventListener("keypress", () => numeros(event, $telefono));
$checkbox.addEventListener("click", () => check($checkbox, $btnForm));