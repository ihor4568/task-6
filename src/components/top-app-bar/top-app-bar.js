import { MDCTopAppBar } from '@material/top-app-bar/index';

export default () => {
  const topAppBarElement = document.querySelector('.mdc-top-app-bar');
  const topAppBar = new MDCTopAppBar(topAppBarElement);
};
