const themeBtn = document.querySelector(".header__btn");
const body = document.body;
const countries = document.querySelector(".countries");
const loader = document.querySelector(".loader-container");
const modeFromLocal = localStorage.getItem("mode")
  ? localStorage.getItem("mode")
  : null;

if (modeFromLocal) {
  body.classList.add("dark-mode");
}

const changeLoader = (value) => {
  if (!value) {
    loader.style.display = "none";
  }
};

themeBtn.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  modeFromLocal
    ? localStorage.setItem("mode", "")
    : localStorage.setItem("mode", "dark");
});

// API

const API = "https://restcountries.com/v3.1/all";

const getData = async (resource) => {
  changeLoader(true);
  const request = await fetch(resource);

  const data = request.json();
  changeLoader(false);
  return data;
};

const updateUI = (resource) => {
  resource.forEach((country) => {
    let card = document.createElement("div");
    card.classList.add("country__card");
    let image = document.createElement("img");
    image.src = country.flags.png;
    image.classList.add("country__card-img");
    let countryText = document.createElement("div");
    countryText.classList.add("country__card-text");
    let countyrTitle = document.createElement("h3");
    countyrTitle.textContent = country.name.common;
    countyrTitle.classList.add("country__card-title");
    let countyrList = document.createElement("ul");
    countyrList.classList.add("country__card--list");
    let liPopulation = document.createElement("li");
    liPopulation.innerHTML = `Population: <span>${country.population}</span>`;
    liPopulation.classList.add("country__card--list-item");
    let liRegion = document.createElement("li");
    liRegion.innerHTML = `Region: <span>${country.region}</span>`;
    liRegion.classList.add("country__card--list-item");
    let liCapital = document.createElement("li");
    liCapital.innerHTML = `Capital: <span>${country.capital}</span>`;
    liCapital.classList.add("country__card--list-item");

    card.append(image, countryText);
    countryText.append(countyrTitle, countyrList);
    countyrList.append(liPopulation, liRegion, liCapital);
    countries.appendChild(card);
  });
};

getData(API)
  .then((data) => {
    // data.forEach((country) => {
    //   console.log(country);
    // });
    updateUI(data);
  })
  .catch((error) => {
    alert(error.message);
  });
