import cx from 'classnames';
import styles from './Button.module.scss';

export default function Button(props: IButtonProps) {
  const { label, onClick, active, secondary } = props;
  return (
    <button
      className={cx(styles.button, {
        [styles.active]: active,
        [styles.secondary]: secondary,
      })}
      onClick={() => active && onClick()}
    >
      {label}
    </button>
  );
}

interface IButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
  secondary?: boolean;
}
