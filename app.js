const app = document.getElementById("app");
const API_URL = "https://hp-api.onrender.com/api/characters";
let personajes = [];
let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

window.addEventListener("hashchange", router);
window.addEventListener("load", router);

function router() {
  const hash = window.location.hash;
  if (hash === "#/personajes") {
    mostrarPersonajes();
  } else if (hash.startsWith("#/detalle/")) {
    const id = hash.split("/")[2];
    mostrarDetalle(id);
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
  personajes = await res.json();

  app.innerHTML = "";
  personajes.slice(0, 20).forEach((p, i) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${p.image || "https://via.placeholder.com/200x250"}" alt="${
      p.name
    }">
      <h3>${p.name}</h3>
      <p>${p.house || "Sin casa"}</p>
      <button onclick="verDetalle(${i})">Ver más</button>
      <button onclick="toggleFavorito('${p.name}')">⭐</button>
    `;
    app.appendChild(card);
  });
}

function mostrarDetalle(id) {
  const p = personajes[id];
  app.innerHTML = `
    <h2>${p.name}</h2>
    <img src="${p.image || "https://via.placeholder.com/250"}" alt="${
    p.name
  }" width="200">
    <p><strong>Casa:</strong> ${p.house || "Sin casa"}</p>
    <p><strong>Actor:</strong> ${p.actor || "Desconocido"}</p>
    <p><strong>Es estudiante:</strong> ${p.hogwartsStudent ? "Sí" : "No"}</p>
    <button onclick="window.history.back()">Volver</button>
  `;
}

function mostrarFavoritos() {
  if (favoritos.length === 0) {
    app.innerHTML = "<h2>No hay favoritos guardados</h2>";
    return;
  }
  app.innerHTML = "<h2>Favoritos ⭐</h2>";
  favoritos.forEach((nombre) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<h3>${nombre}</h3>`;
    app.appendChild(card);
  });
}

function verDetalle(id) {
  window.location.hash = `#/detalle/${id}`;
}

function toggleFavorito(nombre) {
  if (favoritos.includes(nombre)) {
    favoritos = favoritos.filter((f) => f !== nombre);
  } else {
    favoritos.push(nombre);
  }
  localStorage.setItem("favoritos", JSON.stringify(favoritos));
  alert("Favoritos actualizados ⭐");
}
