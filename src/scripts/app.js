// Importar modulo para manejarlo modularizado
import peticion from './module.js';
import { numeros, texto, check, validarInputs, validarSelects } from './permisos.js';

// Atrapar los elementos a manipular
const $dom = document;
const $formulario = $dom.querySelector("#formulario");
const $hiddenId = $dom.querySelector("#hiddenId");
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
const $selectAll = $dom.querySelectorAll("select");

// Campo para cargar los documentos
peticion("documentos")
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
peticion("generos")
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
// Obtener datos del usuario a modificar
let $datosUser = localStorage.getItem("editarUser");
let $user = JSON.parse($datosUser);
if ($datosUser) {
  $hiddenId.value = $user.id;
  $name.value = $user.nombre;
  $apellido.value = $user.apellido;
  $tipoDocumento.value = $user.tipoDocumento;
  $numDocumento.value = $user.numDocumento;
  $email.value = $user.email;
  $genero.value = $user.genero;
  $telefono.value = $user.telefono;
  $btnForm.textContent = "Modificar usuario";
  localStorage.removeItem("editarUser");
}
else {
  $hiddenId.value = Math.floor(Math.random() * 10000).toString();
}

if ($datosUser === null) {
  let tiempo = setInterval(() => {
      console.log("Ya se vacio la session");
      clearInterval(tiempo);
  }, 1000)
}


// Funcion para enviar el formulario con los datos obtenidos
async function enviarForm (event) { 
  let $estadoInputs = validarInputs($inputsAll);
  let $estadoSelects = validarSelects($selectAll);
  event.preventDefault();
  if ($user !== null) {
    console.log("Ya existe ete usuario");
    const $dataUser = {
      id: $hiddenId.value,
      nombre: $name.value,
      apellido: $apellido.value,
      tipoDocumento: $tipoDocumento.value,
      numDocumento: $numDocumento.value,
      email: $email.value,
      genero: $genero.value,
      telefono: $telefono.value
    }
    await peticion("users", $hiddenId.value, "PUT", $dataUser);
    console.log("Usuario modificado");
    localStorage.removeItem("editarUser");
  }
  else {
    if (!$estadoInputs || !$estadoSelects) {
      console.log("No se puede mandar el formulario campos incompletos");
    }
    else {
      const dataUser = {
        id: $hiddenId.value,
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
      event.preventDefault();
      await peticion("users", "", "POST", dataUser);
    }
  }

}

// Manejo de eventos
$formulario.addEventListener("submit", enviarForm);
$name.addEventListener("keypress", () => texto(event, $name));
$apellido.addEventListener("keypress", () => texto(event, $apellido));
$numDocumento.addEventListener("keypress", () => numeros(event, $numDocumento));
$telefono.addEventListener("keypress", () => numeros(event, $telefono));
$checkbox.addEventListener("change", () => { 
  check($checkbox, $btnForm);
});