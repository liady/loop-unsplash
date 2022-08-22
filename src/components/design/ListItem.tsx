import styles from './ListItem.module.scss';
import cx from 'classnames';
import { IPartialImage } from '../../types';

export default function ListItem({
  label,
  timestamp,
  images,
  onClick,
  entityLabel,
}: {
  label: string;
  timestamp: number;
  images: IPartialImage[];
  onClick?: () => void;
  entityLabel?: string;
}) {
  const d = new Date(timestamp);
  const dateAsDayMonthYearString = d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });
  const timeAsHourMinuteString = d.toLocaleTimeString('en-GB', {
    hour: 'numeric',
    minute: 'numeric',
  });
  const timestampString = `${dateAsDayMonthYearString} ${timeAsHourMinuteString}`;
  return (
    <li className={styles.listItem}>
      <div className={styles.text} onClick={onClick}>
        <label className={styles.label}>
          {label} <span className={styles.entityLabel}>{entityLabel}</span>
        </label>
        <label className={styles.timestamp}>{timestampString}</label>
      </div>
      <Images images={images} />
    </li>
  );
}

function Images({ images }: { images: IPartialImage[] }) {
  if (images.length === 1) {
    return (
      <div className={styles.images}>
        <img src={images[0].urls.small} />;
      </div>
    );
  } else {
    return (
      <div className={cx(styles.images, styles.multiple)}>
        {images.slice(0, 4).map((image) => (
          <img key={image.id} src={image.urls.small} />
        ))}
      </div>
    );
  }
}
