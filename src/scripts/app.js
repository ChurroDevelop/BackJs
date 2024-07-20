// Importar modulo para manejarlo modularizado
import { tipoDocs, generos, createUser, modifyUser } from './module.js';
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
// Obtener datos del usuario a modificar
const $datosUser = localStorage.getItem("editarUser");
if ($datosUser) {
  const $user = JSON.parse($datosUser);
  $hiddenId.value = $user.id;
  $name.value = $user.nombre;
  $apellido.value = $user.apellido;
  $tipoDocumento.value = $user.tipoDocumento;
  $numDocumento.value = $user.numDocumento;
  $email.value = $user.email;
  $genero.value = $user.genero;
  $telefono.value = $user.genero;
  $btnForm.textContent = "Modificar usuario";
  localStorage.removeItem("editarUser");
}
else {
  $hiddenId.value = Math.floor(Math.random() * 10000).toString();
}

let tiempo = setInterval(() => {
  if ($datosUser === null) {
    console.log("Ya se vacio la session");
    $hiddenId.value = Math.floor(Math.random() * 10000).toString();
    $name.value = '';
    $apellido.value = '';
    $tipoDocumento.value = '';
    $numDocumento.value = '';
    $email.value = '';
    $genero.value = '';
    $telefono.value = '';
    clearInterval(tiempo);
  }
}, 1000)

// Funcion para enviar el formulario con los datos obtenidos
async function enviarForm (event) { 
  let $estadoInputs = validarInputs($inputsAll);
  let $estadoSelects = validarSelects($selectAll);
  
  event.preventDefault();
  if ($hiddenId.value) {
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
    await modifyUser($hiddenId.value, $dataUser);
    console.log("Usuario modificado");
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
      await createUser(dataUser);
    }
  }

}

// Manejo de eventos
$formulario.addEventListener("submit", enviarForm);
$name.addEventListener("keypress", () => texto(event, $name));
$apellido.addEventListener("keypress", () => texto(event, $apellido));
$numDocumento.addEventListener("keypress", () => numeros(event, $numDocumento));
$telefono.addEventListener("keypress", () => numeros(event, $telefono));
$checkbox.addEventListener("click", () => check($checkbox, $btnForm));