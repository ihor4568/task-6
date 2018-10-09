import { MDCTextField } from "@material/textfield";
import "./index.scss";

const textFields = document.getElementsByClassName("mdc-text-field");
for (var i = 0; i < textFields.length; i++) {
  new MDCTextField(textFields[i]);
}
