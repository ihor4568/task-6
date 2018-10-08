import { MDCDrawer } from "@material/drawer";
const drawer = MDCDrawer.attachTo(document.querySelector(".mdc-drawer"));

import { MDCTopAppBar } from "@material/top-app-bar";
const topAppBar = MDCTopAppBar.attachTo(document.getElementById("app-bar"));
topAppBar.setScrollTarget(document.getElementById("main-content"));
topAppBar.listen("MDCTopAppBar:nav", () => {
  drawer.open = !drawer.open;
});

import { MDCSelect } from "@material/select";
const select = new MDCSelect(document.querySelector(".mdc-select"));
select.listen("change", () => {
  alert(
    `Selected option at index ${select.selectedIndex} with value "${
      select.value
    }"`
  );
});

import { MDCDialog } from "@material/dialog";
const dialog = new MDCDialog(document.querySelector(".mdc-dialog"));
const dialogButton = document.querySelector(".dialog-item");

dialogButton.addEventListener("click", () => {
  if (dialog.isOpen) {
    dialog.close();
  } else {
    dialog.open();
  }
});

import { MDCList } from "@material/list";
const list = new MDCList(document.querySelector(".mdc-dialog .mdc-list"));

dialog.listen("MDCDialog:opened", () => {
  list.layout();
});
