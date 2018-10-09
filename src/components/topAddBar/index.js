import { MDCTopAppBar } from "@material/top-app-bar/index";
import "./index.scss";

const topAppBarElement = document.querySelector(".mdc-top-app-bar");
const topAppBar = new MDCTopAppBar(topAppBarElement);
console.log(topAppBar);
