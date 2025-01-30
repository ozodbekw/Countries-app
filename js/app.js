const themeBtn = document.querySelector(".header__btn");
const body = document.body;
const modeFromLocal = localStorage.getItem("mode")
  ? localStorage.getItem("mode")
  : null;

if (modeFromLocal) {
  body.classList.add("dark-mode");
}

themeBtn.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  modeFromLocal
    ? localStorage.setItem("mode", "")
    : localStorage.setItem("mode", "dark");
});
