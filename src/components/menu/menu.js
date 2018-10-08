import { MDCMenu } from '@material/menu';

export default () => {
  const menu = new MDCMenu(document.querySelector('.mdc-menu'));
  menu.open = true;
};
