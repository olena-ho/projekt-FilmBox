import { filmy } from "./filmyData.js";

const filmList = document.querySelector("#seznam-filmu");

for (let film of filmy) {
  filmList.innerHTML += `
    <div class="card">
    <img
      src=${film.plakat.url}
      class="card-img-top"
      alt="plakát"
    />
    <div class="card-body">
      <div class="card-text"> 
      <h5 class="card-title">${film.nazev}</h5>
      <p class="card-text">${film.ochutnavka}</p>
      </div>
      <a href="film.html#${film.id}" class="btn btn-primary">Přehrát</a>
    </div>
  </div>
  `;
}
