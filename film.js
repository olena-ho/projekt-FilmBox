import { filmy } from "./filmyData.js";

const selectedFilmId = location.hash.slice(1);

const selectedFilm = filmy.find((film) => film.id === selectedFilmId);

const premiereDate = dayjs(selectedFilm.premiera).format("D.M.YYYY");

const daysDiffFromPremiere = dayjs(selectedFilm.premiera).diff(dayjs(), "days");

const premiereDateText =
  daysDiffFromPremiere > 0
    ? `je za ${daysDiffFromPremiere} dní`
    : `bylo před ${Math.abs(daysDiffFromPremiere)} dny`;

const filmDetailCard = document.querySelector("#detail-filmu");

filmDetailCard.innerHTML = `
  <div class="row g-0">
    <div class="col-md-5">
      <img
        src=${selectedFilm.plakat.url}
        alt="plakát"
        class="img-fluid rounded-start"
        width=${selectedFilm.plakat.sirka}
        height=${selectedFilm.plakat.vyska}
      />
    </div>
    <div class="col-md-7">
      <div class="film-details__body">
        <h5 class="film-details__title">${selectedFilm.nazev}</h5>
        <p class="card-text">${selectedFilm.popis}</p>
        <p class="card-text">
          <small class="text-muted" id="premiera"
            >Premiéra <strong>${premiereDate}</strong>, což ${premiereDateText}.</small
          >
        </p>
        <h6>Hodnocení</h6>
        <div class="stars">
          <button
            class="far fa-star button-star"
            data-mdb-toggle="tooltip"
            title="Nic moc"
          >
            1
          </button>
          <button
            class="far fa-star button-star"
            data-mdb-toggle="tooltip"
            title="Ucházející"
          >
            2
          </button>
          <button
            class="far fa-star button-star"
            data-mdb-toggle="tooltip"
            title="Dobrý"
          >
            3
          </button>
          <button
            class="far fa-star button-star"
            data-mdb-toggle="tooltip"
            title="Skvělý"
          >
            4
          </button>
          <button
            class="far fa-star button-star"
            data-mdb-toggle="tooltip"
            title="Úžasný"
          >
            5
          </button>
        </div>

        <h6 class="mt-4">Poznámka</h6>
        <form id="note-form">
          <div class="row">
            <div class="col-md-6 col-lg-7 col-xl-8 mb-2">
              <div class="form-outline">
                <textarea
                  class="form-control"
                  id="message-input"
                  rows="4"
                ></textarea>
                <label class="form-label" for="message-input"
                  >Text poznámky</label
                >
              </div>
            </div>
            <div class="col-md-6 col-lg-5 col-xl-4">
              <div class="form-check d-flex justify-content-center mb-2">
                <input
                  class="form-check-input me-2 mb-2"
                  type="checkbox"
                  value=""
                  id="terms-checkbox"
                />
                <label class="form-check-label" for="terms-checkbox">
                  Souhlasím se všeobecnými podmínky užívání.
                </label>
              </div>
              <button type="submit" class="btn btn-primary btn-block">
                Uložit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>`;

const stars = document.querySelectorAll(".button-star");
let currentRating = 0;

const updateStars = (rating) => {
  stars.forEach((star, index) => {
    if (index < rating) {
      star.classList.remove("far");
      star.classList.add("fas");
    } else {
      star.classList.remove("fas");
      star.classList.add("far");
    }
  })
};

const hoverStars = (e) => {
  const hoveredRating = Number(e.target.textContent);
  updateStars(hoveredRating);
};

const setClickedRating = (e) => {
  currentRating = Number(e.target.textContent);
  updateStars(currentRating);
};

const resetToCurrentRating = () => {
  updateStars(currentRating);
};

stars.forEach((star) => {
  star.addEventListener("mouseenter", hoverStars);
  star.addEventListener("click", setClickedRating);
  star.addEventListener("mouseleave", resetToCurrentRating);
})

const noteForm = document.querySelector("#note-form");


const submitFeedback = (e) => {
  e.preventDefault();
  const inputElement = document.querySelector("#message-input");
  const message = inputElement.value;
  const termsCheckbox = document.querySelector("#terms-checkbox");

  if (message === "") {
    inputElement.classList.add("is-invalid");
    return;
  }
  
  if (!termsCheckbox.checked) {
    termsCheckbox.classList.add("is-invalid");
    return;
  }

  noteForm.innerHTML = `
  <p class="card-text">
    ${message}
  </p>`;
};

noteForm.addEventListener("submit", submitFeedback);
