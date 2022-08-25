import { observer } from 'mobx-react-lite';
import siteState from '../stores/SiteState';
import Button from './design/Button';
import styles from './Hero.module.scss';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default observer(function Hero() {
  const currentImage = siteState.selectedImage;
  const shareToTwitter = () => {
    if (currentImage) {
      const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        'Check out this cool photo'
      )}&url=${currentImage.links.html}`;
      window.open(url, '_blank');
    }
  };
  return currentImage ? (
    <div className={styles.main}>
      <Button
        className={styles.twitterShare}
        label="Share"
        onClick={shareToTwitter}
        active
        icon={<FontAwesomeIcon icon={faTwitter} />}
      />
      <img
        src={currentImage.urls.regular}
        alt={currentImage.alt_description || ''}
      />
    </div>
  ) : null;
});
