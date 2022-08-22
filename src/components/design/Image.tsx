import cx from 'classnames';
import styles from './Image.module.scss';
import { IPartialImage } from '../../types';

export default function Image(props: IImageProps) {
  const { image, onClick, selected } = props;
  const hasOnClick = typeof onClick === 'function';
  return (
    <div
      className={cx(styles.main, {
        [styles.selected]: selected,
        [styles.hasOnClick]: hasOnClick,
      })}
    >
      <img
        className={styles.image}
        key={image.id}
        src={image.urls.regular}
        alt={image.alt_description || ''}
        onClick={() => onClick?.(selected ? null : image)}
      />
      <a
        className={styles.user}
        href={`https://unsplash.com/${image.user.username}`}
        target="_blank"
      >
        {image.user.name}
      </a>
    </div>
  );
}

interface IImageProps {
  image: IPartialImage;
  onClick?: (image: IPartialImage | null) => void;
  selected?: boolean;
}
