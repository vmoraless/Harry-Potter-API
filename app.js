const app = document.getElementById("app");
const API_URL = "https://hp-api.onrender.com/api/characters";

window.addEventListener("hashchange", router);
window.addEventListener("load", router);

function router() {
  const hash = window.location.hash;
  if (hash === "#/personajes") {
    mostrarPersonajes();
  } else if (hash === "#/favoritos") {
    mostrarFavoritos();
  } else {
    mostrarInicio();
  }
}

function mostrarInicio() {
  app.innerHTML = `
    <h2>Bienvenido al mundo mágico 🪄</h2>
    <p>Explorá los personajes del universo de Harry Potter.</p>
    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Hogwartscrest.png" 
         alt="Hogwarts" width="200">
  `;
}

async function mostrarPersonajes() {
  app.innerHTML = "<h2>Cargando personajes...</h2>";
  const res = await fetch(API_URL);
  const data = await res.json();

  app.innerHTML = "";
  data.slice(0, 10).forEach((p) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${p.name}</h3>
      <p>${p.house || "Sin casa"}</p>
    `;
    app.appendChild(card);
  });
}

function mostrarFavoritos() {
  app.innerHTML = "<h2>Favoritos </h2>";
}
