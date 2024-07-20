// Exportar funcion para obtener los documentos cargados
export const tipoDocs = async () => {
  let request = await fetch(`http://localhost:3000/documentos`);
  let response = await request.json();
  return response;
};

// Exportar funcion para obtener los tipos de generos cargados
export const generos = async () => {
  let request = await fetch(`http://localhost:3000/generos`);
  let response = await request.json();
  return response;
};

// Exportar funcion para visualizar todos los usuarios
export const reedUsers = async () => {
  let request = await fetch(`http://localhost:3000/users`);
  let response = await request.json();
  return response;
};

// Exportar funcion para visualizar un usuario en especifico
export const leerUser = async (userId) => {
  let request = await fetch(`http://localhost:3000/users/${userId}`);
  let response = await request.json();
  return response;
}

// Exportar funcion para crear el usuario
export const createUser = async (dataUser) => {
  let request = await fetch(`http://localhost:3000/users`, {
    method: "POST",
    body: JSON.stringify(dataUser),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
};

// Exportar funcion para modificar un usuario
export const modifyUser = async (userId, objectUser) => {
  let request = await fetch(`http://localhost:3000/users/${userId}`, {
    method: "PUT",
    body: JSON.stringify(objectUser),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  });
  let response = await request.json();
  return response;
}

// Exportar funcion para eliminar un usuario
export const deleteUser = async (userId) => {
  let request = await fetch(`http://localhost:3000/users/${userId}`, {
    method: "DELETE"
  });
}