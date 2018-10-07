import {MDCDialog} from '@material/dialog';
const dialog = new MDCDialog(document.querySelector('.mdc-dialog'));

let dialogBtn = document.getElementById('dialog-btn'),
    dialogContent = document.getElementById('mdc-dialog-main-content'),
    dialogContainer = document.getElementById('mdc-dialog__container'),
    dialogClose = document.getElementById('mdc-dialog__scrim');

dialogBtn.addEventListener('click', () => {
  dialogContent.style.display = 'block';
  dialogContainer.style.opacity = 1;
})
dialogClose.addEventListener('click', () => {
  dialogContent.style.display = 'none';
  dialogContainer.style.opacity = .4;
})
