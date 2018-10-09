import { MDCDrawer } from "@material/drawer";
import { MDCTopAppBar } from "@material/top-app-bar";
import "./index.scss";

const drawer = MDCDrawer.attachTo(document.querySelector(".mdc-drawer"));
const topAppBar = MDCTopAppBar.attachTo(document.getElementById("app-bar"));
topAppBar.setScrollTarget(document.getElementById("main-content"));
topAppBar.listen("MDCTopAppBar:nav", () => {
  drawer.open = !drawer.open;
});

const checkActiveTab = getTabChecker();
setInterval(checkActiveTab, 200);

function getTabChecker() {
  let prevTabName = "";

  function checkCurrentTab() {
    const currentTab = document.querySelector(".mdc-list-item--activated");
    const topBarTitle = document.querySelector(".mdc-top-app-bar__title");
    const currentTabName = currentTab.lastElementChild.innerText;

    topBarTitle.innerText = currentTabName;

    if (prevTabName !== currentTabName) {
      prevTabName = currentTabName;
      syncTabs(currentTabName);
    }
  }

  return checkCurrentTab;
}

function syncTabs(currentTabName) {
  if (currentTabName === "Customers") {
    hidePrevTabContent(".tab-mockup");
    renderCustomers();
    return;
  }

  hidePrevTabContent(".customer");
  renderMockup(currentTabName);
}

function hidePrevTabContent(tabClassName) {
  const content = document.querySelector(tabClassName);
  content.style.display = "none";
}

function renderCustomers() {
  const content = document.querySelector(".customer");
  content.style.display = "block";
}

function renderMockup(name) {
  const content = document.querySelector(".tab-mockup");
  content.innerHTML = `<h1 class="mdc-typography	mdc-typography--headline5 tab-mockup__title">${name}</h1>`;
  content.style.display = "block";
}
