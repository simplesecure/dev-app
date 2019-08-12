import { getGlobal } from 'reactn';

export function openSideNav() {
  const instance = getGlobal().instance;
  instance.open();
}