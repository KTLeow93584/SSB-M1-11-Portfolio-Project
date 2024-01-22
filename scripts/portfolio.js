// =================================
const projects = [
  // ------
  {
    idPrefix: "work-project-",
    name: "Descent (Combat Prototype)",
    description: "A character-driven real time tactics game inspired by the South East Asian (SEA) lore.",
    imageSrc: "images/work-1.png",
    url: "https://kotakoren.itch.io/descent"
  },
  // ------
  {
    idPrefix: "work-project-",
    name: "Letters",
    description: "A casual rhythm storytelling game about a boy and a girl attempting to connect to each another from different parts of the world. (Lvl Up KL 2016 Game Jam Runner Up)",
    imageSrc: "images/work-2.png",
    url: "https://pixelfr0ggie.itch.io/letters"
  },
  // ------
  {
    idPrefix: "work-project-",
    name: "Carriage For Her (Discontinued)",
    description: "A ride sharing app made exclusively for women drivers and passengers.",
    imageSrc: "images/work-3.png",
    url: "https://appadvice.com/app/carriage-for-her-driver-app/1433325302"
  },
  {
    idPrefix: "work-project-",
    name: "Simple Board Games (Personal Project)",
    description: "A combination of mini-games (Tic-tac-toe, Connect 4 and Reversi). This project's goal is to develop an AI that's unbeatable.",
    imageSrc: "images/work-4.png",
    url: "https://projectkazcade.itch.io/simple-board-games"
  },
  {
    idPrefix: "work-project-",
    name: "Chess (Personal Project)",
    description: "A chess project using traditional BFS/DFS algorithms, aimed at trying to reach as high of an ELO possible.",
    imageSrc: "images/work-5.png",
    url: "https://projectkazcade.itch.io/chess"
  }
  // ------
];

const workGroup = document.getElementById("portfolio-work-group");
const workNextButton = document.getElementById("portfolio-work-button-next");
const workPreviousButton = document.getElementById("portfolio-work-button-previous");

let elementToFadeOut = "";
let elementToFadeIn = "";

let toFadeOutIndex = "";
let toFadeInIndex = "";
let currentPortfolioIndex = 0;

let fadeOutQuery = "";
let fadeInQuery = "";

let carouselTimerElement = null;
let fadeInClassName = "";
let fadeOutClassName = "";

let onSuccessfulCallback;
// =================================
export function updatePortfolioList() {
  // Debug
  //console.log("Window Dimensions: " + window.innerWidth + ", " + window.innerHeight);

  // Reset the parent element.
  workGroup.innerHTML = "";

  // Show elements based on "showMore" flag.
  // True = Show All.
  // False = Show only limited amount (Capped by "basicPreviewLimit" variable).
  let htmlComposition = "";

  for (let i = 0; i < projects.length; ++i) {
    const prefix = projects[i].idPrefix + i.toString();

    htmlComposition += `
      <div id="${prefix}" class="work ${i > 0 ? "hidden" : ""}">
        <img src="${projects[i].imageSrc}" alt="">
        <div class="layer">
          <h3>${projects[i].name}</h3>
          <p>${projects[i].description}</p>
          <a href="${projects[i].url}" target="_blank"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>
        </div>
      </div>
    `;
  }

  workGroup.innerHTML = htmlComposition;
  
  carouselTimerElement = setInterval(showNextPortfolio, 5000);
}

export function showNextPortfolio() {
  toFadeOutIndex = currentPortfolioIndex;
  toFadeInIndex = (currentPortfolioIndex + 1) >= projects.length ? 0 : currentPortfolioIndex + 1;

  onSuccessfulCallback = onSuccessfulTransitionAdd;
  
  fadeInClassName = "work-fade-in-right";
  fadeOutClassName = "work-fade-out-right";
  
  onSwitchElement();
}

export function showPreviousPortfolio() {
  toFadeOutIndex = currentPortfolioIndex;
  toFadeInIndex = (currentPortfolioIndex - 1) < 0 ? (projects.length - 1) : currentPortfolioIndex - 1;

  onSuccessfulCallback = onSuccessfulTransitionSubtract;

  fadeInClassName = "work-fade-in-left";
  fadeOutClassName = "work-fade-out-left";
  
  onSwitchElement();
}

function onSwitchElement() {
  if (carouselTimerElement !== null)
    clearInterval(carouselTimerElement);
  workNextButton.classList.add("pointer-interact-disabled");
  workPreviousButton.classList.add("pointer-interact-disabled");
  
  elementToFadeOut = document.getElementById(projects[toFadeOutIndex].idPrefix + toFadeOutIndex.toString());
  
  elementToFadeIn = document.getElementById(projects[toFadeInIndex].idPrefix + toFadeInIndex.toString());

  elementToFadeOut.classList.add("pointer-interact-disabled");
  elementToFadeIn.classList.add("pointer-interact-disabled");
  
  elementToFadeOut.classList.add(fadeOutClassName);
  fadeOutQuery = document.querySelector("." + fadeOutClassName);
  
  fadeOutQuery.addEventListener("animationend", onFadeOut);
}

function onFadeOut() {
  elementToFadeOut.classList.remove(fadeOutClassName);
  elementToFadeOut.classList.add("hidden");

  elementToFadeIn.classList.add(fadeInClassName);
  elementToFadeIn.classList.remove("hidden");
  fadeOutQuery.removeEventListener("animationend", onFadeOut);

  fadeInQuery = document.querySelector("." + fadeInClassName);
  fadeInQuery.addEventListener("animationend", onFadeIn);
}

function onFadeIn() {
  elementToFadeIn.classList.remove(fadeInClassName)

  if (onSuccessfulCallback !== null)
    onSuccessfulCallback();

  fadeInQuery.removeEventListener("animationend", onFadeIn);
}
// ================
function onSuccessfulTransitionAdd() {
  ++currentPortfolioIndex;
  if (currentPortfolioIndex >= projects.length)
    currentPortfolioIndex = 0;
  
  workNextButton.classList.remove("pointer-interact-disabled");
  workPreviousButton.classList.remove("pointer-interact-disabled");
  
  elementToFadeOut.classList.remove("pointer-interact-disabled");
  elementToFadeIn.classList.remove("pointer-interact-disabled");
  
  carouselTimerElement = setInterval(showNextPortfolio, 5000);
}

function onSuccessfulTransitionSubtract() {
  --currentPortfolioIndex;
  if (currentPortfolioIndex < 0)
    currentPortfolioIndex = projects.length - 1;
  
  workNextButton.classList.remove("pointer-interact-disabled");
  workPreviousButton.classList.remove("pointer-interact-disabled");
  
  elementToFadeOut.classList.remove("pointer-interact-disabled");
  elementToFadeIn.classList.remove("pointer-interact-disabled");

  carouselTimerElement = setInterval(showNextPortfolio, 5000);
}
// =================================