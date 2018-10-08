import { MDCRipple } from '@material/ripple/index';

export default () => {
  const foo = document.querySelector('.foo-button');
  const button = new MDCRipple(foo);
};
