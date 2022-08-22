import { History } from './History';
import Search from './Search';
import styles from './Unsplash.module.scss';
import Navigation, { Screen } from './Navigation';
import unsplashState from '../../stores/UnsplashState';
import { observer } from 'mobx-react-lite';

const ScreenComponents = {
  [Screen.History]: History,
  [Screen.Search]: Search,
};

export default observer(function () {
  const currentScreen = unsplashState.currentTab;
  const CurrentScreenComponent = ScreenComponents[currentScreen];
  return (
    <div className={styles.main}>
      <Navigation
        currentScreen={currentScreen}
        onScreenChange={(screen) => unsplashState.setCurrentTab(screen)}
      />
      <CurrentScreenComponent />
    </div>
  );
});
