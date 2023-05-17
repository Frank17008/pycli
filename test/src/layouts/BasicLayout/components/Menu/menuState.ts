import { createGlobalState } from 'react-hooks-global-state';

const { menuIconEnum } = constants;
export const { useGlobalState, getGlobalState, setGlobalState } = createGlobalState({
  menuList: menuIconEnum,
  activeMenu: {},
});
