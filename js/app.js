const themeBtn = document.querySelector(".header__btn");
const body = document.body;
const countries = document.querySelector(".countries");
const loader = document.querySelector(".loader");
const API = "https://restcountries.com/v3.1/all";

// Dark mode saqlash
const modeFromLocal = localStorage.getItem("mode");
if (modeFromLocal) {
  body.classList.add("dark-mode");
}

themeBtn.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("mode", "dark");
  } else {
    localStorage.removeItem("mode");
  }
});

// Loaderni o‘zgartirish
const changeLoader = (value) => {
  loader.style.display = value ? "grid" : "none";
};

// API orqali ma'lumot olish
const getData = async (resource) => {
  changeLoader(true);
  try {
    const request = await fetch(resource);
    if (!request.ok) {
      throw new Error("Something went wrong :(");
    }
    return await request.json();
  } finally {
    changeLoader(false);
  }
};

// Element yaratish funksiyasi
const createElement = (tag, className, innerHTML = "") => {
  const element = document.createElement(tag);
  if (className) element.classList.add(className);
  element.innerHTML = innerHTML;
  return element;
};

// UI yangilash
const updateUI = (resource) => {
  countries.innerHTML = ""; // Oldingi ma'lumotlarni tozalash
  resource.forEach((country) => {
    let card = createElement("div", "country__card");
    let image = createElement("img", "country__card-img");
    image.src = country.flags.png;

    let countryText = createElement("div", "country__card-text");
    let countyrTitle = createElement(
      "h3",
      "country__card-title",
      country.name.common
    );
    let countyrList = createElement("ul", "country__card--list");

    let liPopulation = createElement(
      "li",
      "country__card--list-item",
      `Population: <span>${country.population}</span>`
    );
    let liRegion = createElement(
      "li",
      "country__card--list-item",
      `Region: <span>${country.region}</span>`
    );
    let liCapital = createElement(
      "li",
      "country__card--list-item",
      `Capital: <span>${country.capital ? country.capital[0] : "N/A"}</span>`
    );

    countyrList.append(liPopulation, liRegion, liCapital);
    countryText.append(countyrTitle, countyrList);
    card.append(image, countryText);
    countries.appendChild(card);
  });
};

// Ma'lumot olish va UI yangilash
getData(API)
  .then(updateUI)
  .catch((error) => alert(error.message));
