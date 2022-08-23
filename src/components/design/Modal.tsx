import { useEffect, useRef } from 'react';
import styles from './Modal.module.scss';
import cx from 'classnames';

interface IModalProps extends IModalHeaderProps {
  children: React.ReactNode;
}

interface IModalHeaderProps {
  title: string;
  icon?: React.ReactNode;
  onClose?: () => void;
  className?: string;
}

export function Modal(props: IModalProps) {
  const { title, icon, children, onClose } = props;
  const { draggableRef, draggableHandleClass } = useDraggable();
  return (
    <div className={styles.main} ref={draggableRef}>
      <ModalHeader
        title={title}
        icon={icon}
        onClose={onClose}
        className={draggableHandleClass}
      />
      <div className={styles.content}>{children}</div>
    </div>
  );
}

export function ModalHeader(props: IModalHeaderProps) {
  const { icon, title, onClose, className } = props;
  return (
    <div className={cx(styles.header, className)}>
      {icon && <div className={styles.icon}>{icon}</div>}
      <div className={styles.title}>{title}</div>
      <div className={styles.close} onClick={onClose}></div>
    </div>
  );
}

declare global {
  interface Window {
    $: any;
  }
}

function useDraggable() {
  const DRAGGABLE_HANDLE_CLASS = 'draggable-header';
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (modalRef.current) {
      // Used jQuery draggable for time saving, though in production a proper D&D mechanism should be used.
      window.$(modalRef.current).draggable({
        handle: `.${DRAGGABLE_HANDLE_CLASS}`,
        containment: 'window',
        scroll: false,
        classes: {
          'ui-draggable-dragging': styles.dragging,
        },
      });
    }
  }, [modalRef.current]);
  return {
    draggableRef: modalRef,
    draggableHandleClass: DRAGGABLE_HANDLE_CLASS,
  };
}
