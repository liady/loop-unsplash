import { observer } from 'mobx-react-lite';
import siteState from '../stores/SiteState';
import styles from './Hero.module.scss';

export default observer(function Hero() {
  const currentImage = siteState.selectedImage;
  const shareToTwitter = () => {
    if (currentImage) {
      const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        'Check out this cool photo'
      )}&url=${currentImage.urls.regular}`;
      window.open(url, '_blank');
    }
  };
  return currentImage ? (
    <div className={styles.main}>
      <img
        src={currentImage.urls.regular}
        alt={currentImage.alt_description || ''}
        onClick={shareToTwitter}
      />
    </div>
  ) : null;
});
