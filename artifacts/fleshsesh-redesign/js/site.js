(function () {
  const KEY = "fleshsesh-age-ok";
  const gate = document.getElementById("gate");
  const year = document.getElementById("y");
  const track = document.getElementById("track");
  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav");

  if (year) year.textContent = new Date().getFullYear();

  if (track) {
    const words = ["GENDER-FLUID", "TALENT", "LIVE", "ACADEMY", "ATELIER", "PERTH"];
    const row = words.concat(words, words, words);
    track.innerHTML = row.map(function (w) {
      return "<span>" + w + '<i class="dot"></i></span>';
    }).join("");
  }

  function openHouse() {
    if (!gate) return;
    gate.classList.add("hidden");
    document.body.classList.remove("locked");
    try { localStorage.setItem(KEY, "1"); } catch (e) {}
  }

  if (gate) {
    if (localStorage.getItem(KEY) === "1") openHouse();
    var enter = document.getElementById("enter");
    var exit = document.getElementById("exit");
    if (enter) enter.addEventListener("click", openHouse);
    if (exit) exit.addEventListener("click", function () {
      window.location.href = "https://www.google.com";
    });
  }

  if (burger && nav) {
    burger.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      burger.textContent = open ? "Close" : "Menu";
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("open");
        burger.textContent = "Menu";
      });
    });
  }
})();
