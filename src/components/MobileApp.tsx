import { faCameraRetro } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ModalHeader } from './design/Modal';
import Hero from './Hero';
import styles from './MobileApp.module.scss';
import Unsplash from './unsplash/Unsplash';

export default function MobileApp() {
  return (
    <div className={styles.main}>
      <ModalHeader
        title="Unsplash"
        icon={<FontAwesomeIcon icon={faCameraRetro} />}
      />
      <Unsplash />
      <Hero />
    </div>
  );
}
