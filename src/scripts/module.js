// Exportar funcion para obtener los documentos cargados
export const tipoDocs = async () => {
  let request = await fetch(`http://localhost:3000/documentos`);
  let response = await request.json();
  return response;
}

// Exportar funcion para obtener los tipos de generos cargados
export const generos =  async () => {
  let request = await fetch(`http://localhost:3000/generos`);
  let response = await request.json();
  return response;
}

// Exportar funcion para crear el usuario
export const createUser = async (dataUser) => {
  let request = await fetch(`http://localhost:3000/users`, {
    method: "POST",
    body: JSON.stringify(dataUser),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
    .then((e) => {
      console.log(e)
    })
  ;
  let response = await request.json();
  console.log(response);
}