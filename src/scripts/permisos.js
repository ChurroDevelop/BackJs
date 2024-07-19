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

// Exportar modulo para las validaciones de los inputs
export const validarInputs = (...inputs) => {
  let $estado = true;
  inputs.forEach((e) => {
    e.forEach((element) => {
      if (element.value.trim() === "") {
        console.log(element.value)
        element.classList.add("is__invalid");
        $estado = false;
      }
      else {
        element.classList.remove("is__invalid");
        element.classList.add("is__valid");
      }
    })
  })
  return $estado;
}

// Exportar modulo para las validaciones delos selects
export const validarSelects = (...selects) => {
  let $estado = true;
  selects.forEach((e) => {
    e.forEach((element) => {
      if (element.value.trim() === "") {
        console.log(element.value);
        element.classList.add("is__invalid");
        $estado = false;
      }
      else {
        element.classList.remove("is__invalid");
        element.classList.add("is__valid");
      }
    })
  })
  return $estado;
}