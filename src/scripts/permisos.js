// Exportar modulo para que deje escribir letras
export const texto = (event, input) => {
  if (!/[A-Za-zàáâãéêíóôõúüñÑ\s]/.test(event.key)) {
    event.preventDefault();
  }
}

// Exportar modulo para que deje escribir numeros
export const numeros = (event, input) => {
  if (!/[0-9]/.test(event.key) || input.value.length === 10) {
    event.preventDefault();
  }
}

// Exportar modulo del checkbox
export const check = (checkBox, btn) => {
  if (checkBox.checked) {
    btn.removeAttribute("disabled");
    console.log("Esta listo para mandar");
  }
  else{
    btn.setAttribute("disabled", "");
    console.log("No esta listo para mandar");
  }
}

// Exportar modulo de las validaciones de formulario
export const validarCampos = (...inputs) => {
  let $estado = true;
  inputs.forEach((e) => {
    e.forEach((element) => {
      if (element.value === "") {
        console.log(element.value)
        element.classList.add("is__invalid");
        $estado = false;
      }
      else {
        console.log(element.value)
      }
    })
  })
  return $estado;
}