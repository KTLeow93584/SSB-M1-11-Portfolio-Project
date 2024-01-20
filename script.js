function openTab(tabName) {
  const tabLinks = document.getElementsByClassName("tab-links");
  const tabContents = document.getElementsByClassName("tab-contents");
  
  for (const tab of tabLinks)
    tab.classList.remove("active-link");
  
  for (const content of tabContents)
    content.classList.remove("active-tab");

  event.currentTarget.classList.add("active-link");
  document.getElementById(tabName).classList.add("active-tab");
}

const sideMenu = document.getElementById("side-menu");

function closeMenu() {
  sideMenu.style.right = "-200px";
}

function openMenu() {
  sideMenu.style.right = "0px";
}

window.openTab = openTab;
window.closeMenu = closeMenu;
window.openMenu = openMenu;