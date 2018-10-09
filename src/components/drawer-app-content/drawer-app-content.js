const listEl = document.querySelector('.mdc-drawer .mdc-list');
const mainContentEl = document.querySelector('.mdc-drawer-app-content');

listEl.addEventListener('click', (event) => {
  mainContentEl.querySelector('input, button').focus();
});

document.body.addEventListener('MDCDrawer:closed', () => {
  mainContentEl.querySelector('input, button').focus();
});
