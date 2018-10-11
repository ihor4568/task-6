import { MDCDialog } from "@material/dialog";
import { MDCRipple } from "@material/ripple";

const dialog = new MDCDialog(document.querySelector(".mdc-dialog"));
console.log(dialog);

const buttonDialog = MDCRipple.attachTo(
  document.querySelector(".mdc-button-dialog")
);
console.log(buttonDialog);

buttonDialog.listen("click", () => {
  dialog.open();
});
