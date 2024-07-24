const URL = `http://localhost:3000`;

const peticion = async (endPoint, userId, method, dataUser) => {
  userId = userId || undefined;
  method = method || undefined;
  dataUser = dataUser || undefined;
  let request; 
  let response;
  if (userId && !method) {
    request = await fetch(`${URL}/${endPoint}/${userId}`);
    response = await request.json();
  }
  else if (method && !userId){
    request = await fetch(`${URL}/${endPoint}`, {
      method: `${method}`,
      body: JSON.stringify(dataUser),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
  }
  else if (method && userId) {
    request = await fetch(`${URL}/${endPoint}/${userId}`, {
      method: `${method}`,
      body: JSON.stringify(dataUser),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
  }
  else if (userId && method === "DELETE") {
    let request = await fetch(`${URL}/${endPoint}/${userId}`, {
      method: `${method}`
    });
  }
  else {
    request = await fetch(`${URL}/${endPoint}`);
    response = await request.json();
    console.log("No existe nada en dataUser");
  }
  return response;
}

export default peticion