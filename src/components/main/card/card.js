import { MDCRipple } from "@material/ripple";
import { MDCTabBar } from "@material/tab-bar";

const firstCard = document.querySelector(".mdc-card-first");
const secondCard = document.querySelector(".mdc-card-second");
const buttonCardOne = MDCTabBar.attachTo(
  document.querySelector(".mdc-tab-first")
);
const buttonCardTwo = MDCTabBar.attachTo(
  document.querySelector(".mdc-tab-second")
);

buttonCardOne.listen("click", () => {
  firstCard.classList.remove("mdc-card-hidden");
  secondCard.classList.add("mdc-card-hidden");
});

buttonCardTwo.listen("click", () => {
  firstCard.classList.add("mdc-card-hidden");
  secondCard.classList.remove("mdc-card-hidden");
});
