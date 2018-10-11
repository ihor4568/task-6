import { MDCRipple } from "@material/ripple";
import { MDCMenu } from "@material/menu";

const buttonRipple = MDCRipple.attachTo(
  document.querySelector(".mdc-button-header")
);

const menu = new MDCMenu(document.querySelector(".mdc-menu"));

buttonRipple.listen("click", () => {
  menu.open = !menu.open;
});
