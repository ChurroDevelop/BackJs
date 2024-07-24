// Importar modulo para la agregarlos a la tabla
import peticion from "./module.js";

// Atrapar elementos del DOM
const $dom = document;
const $tabla = $dom.querySelector("#tablaBody");
const $fragmentTabla = $dom.createDocumentFragment();

const eliminarUsuario = async (userId) => {
  await peticion("users", userId, "DELETE", undefined);
}

const modificarUser = async (userId) => {
  let user = await peticion("users" , userId);
  localStorage.setItem("editarUser", JSON.stringify(user));
  window.location.href = "../../index.html";
}

// Recorrer la funcion y obtener los datos
peticion("users")
  .then((e) => {
    e.forEach((user) => {
      // Crear elementos para agregar a la tabla
      const $tr = $dom.createElement("tr");
      const $td1 = $dom.createElement("td");
      const $td2 = $dom.createElement("td");
      const $td3 = $dom.createElement("td");
      const $td4 = $dom.createElement("td");
      const $td5 = $dom.createElement("td");
      const $td6 = $dom.createElement("td");
      const $td7 = $dom.createElement("td");
      const $td8 = $dom.createElement("td");
      const $td9 = $dom.createElement("td");
      const $btnModificar = $dom.createElement("button");
      const $btnEliminar = $dom.createElement("button");
      const $enlace = $dom.createElement("a");

      // Agregar valores a esos elementos creados
      $td1.textContent = user.id;
      $td2.textContent = user.nombre;
      $td3.textContent = user.apellido;
      $td4.textContent = user.tipoDocumento;
      $td5.textContent = user.numDocumento;
      $td6.textContent = user.email;
      $td7.textContent = user.genero;
      $td8.textContent = user.telefono;

      // Agregar a las acciones una clase
      $td9.classList.add("acciones");
      
      // Agregar atributos y contenido
      $btnModificar.setAttribute("data-id", user.id);
      $btnModificar.setAttribute("id", "btnModificar");
      $enlace.textContent = "Editar";
      $btnModificar.appendChild($enlace);
      $btnEliminar.setAttribute("data-id", user.id);
      $btnEliminar.setAttribute("id", "btnDelete");
      $btnEliminar.textContent = "Eliminar";

      // Agregar los botones al la ultima columna
      $td9.appendChild($btnModificar);
      $td9.appendChild($btnEliminar);

      // Agregar todo a la fila
      $tr.appendChild($td1);
      $tr.appendChild($td2);
      $tr.appendChild($td3);
      $tr.appendChild($td4);
      $tr.appendChild($td5);
      $tr.appendChild($td6);
      $tr.appendChild($td7);
      $tr.appendChild($td8);
      $tr.appendChild($td9);
      $fragmentTabla.appendChild($tr);
    })
    $tabla.appendChild($fragmentTabla);

    const $btnModify = $dom.querySelectorAll("#btnModificar");
    $btnModify.forEach((btn) => {
      btn.addEventListener("click", () => modificarUser(btn.getAttribute("data-id")));
    })

    const $btnDelete = $dom.querySelectorAll("#btnDelete");
    $btnDelete.forEach((button) => {
      button.addEventListener("click", () => eliminarUsuario(button.getAttribute("data-id")));
    })
  })