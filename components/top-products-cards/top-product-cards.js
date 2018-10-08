import { MDCMenu } from "@material/menu";
const menu = new MDCMenu(document.querySelector(".mdc-menu"));
const menuButton = document.querySelector(".menu-button");

menuButton.addEventListener("click", () => {
  if (menu.open) {
    menu.open = false;
    return;
  } else {
    menu.open = true;
  }
});
