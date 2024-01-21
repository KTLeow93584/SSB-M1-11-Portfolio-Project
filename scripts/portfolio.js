// =================================
const projects = [
  // ------
  {
    idPrefix: "work-project-",
    name: "Simple Board Games (Personal Project)",
    description: "A combination of mini-games (Tic-tac-toe, Connect 4 and Reversi). This project's goal is to develop an AI that's unbeatable.",
    imageSrc: "images/work-1.png",
    url: "https://projectkazcade.itch.io/simple-board-games"
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
    name: "Carriage For Her (Discontinued)",
    description: "A ride sharing platform exclusively catered for women drivers and passengers.",
    imageSrc: "images/work-3.png",
    url: "https://appadvice.com/app/carriage-for-her-driver-app/1433325302"
  }
  // ------
];

const basicPreviewLimit = 3;
let showMore = true;

const workGroup = document.getElementById("portfolio-work-group");
const showButton = document.getElementById("portfolio-work-button");
let projectHTMLElements = [];
// =================================
// TODO: Smooth Transition between "Show More" and "Show Less".
export function updatePortfolioList(refreshList = false) {
  showMore = !showMore;
  
  // Debug
  //console.log("Called: " + refreshList);

  if (refreshList) {
    // Reset the parent element.
    workGroup.innerHTML = "";
    projectHTMLElements = [];
    
    // Show elements based on "showMore" flag.
    // True = Show All.
    // False = Show only limited amount (Capped by "basicPreviewLimit" variable).
    let htmlComposition = "";

    for (let i = 0; i < projects.length; ++i) {
      const prefix = projects[i].idPrefix + i.toString();
      
      htmlComposition += `
        <div id="${prefix}" class="work">
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
  }

  // Debug
  //console.log("Size: " + projectHTMLElements.length);
  
  for (let i = 0; i < projects.length; ++i) {
    // Add to list after HTML has been updated.
    if (refreshList)
      projectHTMLElements.push(document.getElementById(projects[i].idPrefix + i.toString()));
    
    if (!showMore && i >= basicPreviewLimit) {
      if (!projectHTMLElements[i].classList.contains("hidden"))
        projectHTMLElements[i].classList.add("hidden");
    }
    else {
      if (projectHTMLElements[i].classList.contains("hidden"))
        projectHTMLElements[i].classList.remove("hidden");
    }
  }

  if (projects.length <= basicPreviewLimit) {
    if (!showButton.classList.contains("hidden"))
      showButton.classList.add("hidden");
    
    if (showButton.classList.contains("btn"))
      showButton.classList.remove("btn");
  }
  else
    showButton.textContent = showMore ? "Show Less" : "Show More";
}