import { useEffect, useRef } from 'react';
import styles from './Modal.module.scss';
import cx from 'classnames';

interface IModalProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  onClose?: () => void;
}

export function Modal(props: IModalProps) {
  const { title, icon, children, onClose } = props;
  const draggableRef = useDraggable();
  return (
    <div className={styles.main} ref={draggableRef}>
      <div className={cx(styles.header, 'draggable-header')}>
        {icon && <div className={styles.icon}>{icon}</div>}
        <div className={styles.title}>{title}</div>
        <div className={styles.close} onClick={onClose}></div>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}

declare global {
  interface Window {
    $: any;
  }
}

function useDraggable() {
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (modalRef.current) {
      window.$(modalRef.current).draggable({
        handle: '.draggable-header',
        containment: 'window',
        scroll: false,
        classes: {
          'ui-draggable-dragging': styles.dragging,
        },
      });
    }
  }, [modalRef.current]);
  return modalRef;
}
