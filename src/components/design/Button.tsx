import cx from 'classnames';
import styles from './Button.module.scss';

export default function Button(props: IButtonProps) {
  const { label, onClick, active, secondary, className, icon } = props;
  return (
    <button
      className={cx(styles.button, className, {
        [styles.active]: active,
        [styles.secondary]: secondary,
      })}
      onClick={() => active && onClick()}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {label}
    </button>
  );
}

interface IButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
  secondary?: boolean;
  className?: string;
  icon?: React.ReactNode;
}
