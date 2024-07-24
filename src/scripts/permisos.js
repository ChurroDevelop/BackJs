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
  const regex = /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com\b$/;
  let $estado = true;
  inputs.forEach((e) => {
    e.forEach((element, index) => {
      let $span = element.nextElementSibling;
      if (element.value.trim() === "") {
        if (!$span) {
          $span = document.createElement("span");
          $span.textContent = "Campos vacios, ingrese sus datos";
          $span.classList.add("span__danger");
          element.closest("div").appendChild($span);
        }
        element.classList.remove("is__valid");
        element.classList.add("is__invalid");
        $estado = false;
      }
      else {
        if (index === 4) {
          if (regex.test(element.value)) {
            element.classList.remove("is__invalid");
            element.classList.add("is__valid");
          }
          else {
            if (!regex.test(element.value)) {
              element.classList.remove("is__valid");
              element.classList.add("is__invalid");
              $estado = false;
            }
          }
        }
        else {
          element.classList.remove("is__invalid");
          element.classList.add("is__valid");
          if ($span) {
            $span.remove();
          }
        }
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
      let $span = element.nextElementSibling;
      if (element.value.trim() === "") {
        console.log(element.value);
        element.classList.add("is__invalid");
        $estado = false;
        if (!$span) {
          $span = document.createElement("span");
          $span.textContent = "Select vacio, seleccione alguno";
          $span.classList.add("span__danger");
          element.closest("div").appendChild($span);
        }
      }
      else {
        element.classList.remove("is__invalid");
        element.classList.add("is__valid");
        if ($span) {
          $span.remove();
        }
      }
    })
  })
  return $estado;
}