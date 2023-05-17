/* eslint-disable react-hooks/exhaustive-deps */
import styles from './index.module.scss';
import { useGlobalState } from './menuState';
import { useHistory } from 'ice';
import { useEffect } from 'react';

function Menu() {
  const [menuList] = useGlobalState('menuList');
  const [activeMenu, setActiveMenu] = useGlobalState<any>('activeMenu');

  const history = useHistory();
  useEffect(() => {
    const filterMenu = menuList.filter((menu) => menu.path === location.pathname);
    filterMenu.length > 0 && setActiveMenu(filterMenu[0]);
  }, [history.location]);

  const handleMenuClick = (data) => {
    setActiveMenu(data);
    history.push(data.path);
  };
  return (
    <div className={styles['menu-container']}>
      {menuList.map((menu) => (
        <span
          key={menu.name}
          className={`${styles.menu} ${styles[activeMenu.name === menu.name ? 'active-menu' : '']}`}
          onClick={() => handleMenuClick(menu)}
        >
          {menu.name}
        </span>
      ))}
    </div>
  );
}

export default Menu;
