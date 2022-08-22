import styles from './Navigation.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  faBookmark,
} from '@fortawesome/free-solid-svg-icons';
import cx from 'classnames';

export default function Navigation(props: INavigationProps) {
  return (
    <nav className={styles.navigation}>
      <NavigationItem
        label="History"
        icon={<FontAwesomeIcon icon={faBookmark} />}
        isCurrent={props.currentScreen === Screen.History}
        onClick={() => props.onScreenChange(Screen.History)}
      />
      <NavigationItem
        label="Search"
        icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
        isCurrent={props.currentScreen === Screen.Search}
        onClick={() => props.onScreenChange(Screen.Search)}
      />
    </nav>
  );
}

function NavigationItem(props: INavigationItemProps) {
  return (
    <div
      className={cx(styles.navigationItem, {
        [styles.isCurrent]: props.isCurrent,
      })}
      onClick={props.onClick}
    >
      <div className={styles.icon}>{props.icon}</div>
      <div className={styles.label}>{props.label}</div>
    </div>
  );
}

export enum Screen {
  History,
  Search,
}

interface INavigationProps {
  currentScreen: Screen;
  onScreenChange: (screen: Screen) => void;
}

interface INavigationItemProps {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  isCurrent: boolean;
}
